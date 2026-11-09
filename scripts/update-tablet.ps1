param(
  [ValidateSet('a8', 'ulefone')][string]$Tablet = 'a8',
  [string]$Serial,
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"
$tablets = @{ a8 = 'R8MT100KBQD'; ulefone = '3109RH1010027680' }
if (!$Serial) { $Serial = $tablets[$Tablet] }
elseif ($Serial -notin $tablets.Values) { throw 'Numero de serie no registrado. No se instala en otra tablet.' }
else { $Tablet = ($tablets.Keys | Where-Object { $tablets[$_] -eq $Serial }) }

$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$sdkRoot = $env:ANDROID_HOME
if (!$sdkRoot) {
  $sdkRoot = Join-Path $env:LOCALAPPDATA "Android\Sdk"
}

$adbPath = Join-Path $sdkRoot "platform-tools\adb.exe"
$apkPath = Join-Path $projectRoot "android\app\build\outputs\apk\debug\app-debug.apk"
$buildScript = Join-Path $projectRoot "scripts\build-debug-apk.ps1"
$profilePath = $env:USERPROFILE
if (!$profilePath) {
  $profilePath = [Environment]::GetFolderPath("UserProfile")
}
$androidKeyPath = Join-Path $profilePath ".android\adbkey"
$packageName = "com.ian.escuela"
$deviceOwner = "$packageName/.KioskDeviceAdminReceiver"

if (!(Test-Path -LiteralPath $adbPath)) {
  throw "No encuentro ADB en $adbPath. Ejecuta primero scripts\setup-android-cli.ps1."
}

. (Join-Path $PSScriptRoot 'tablet-environment.ps1')
Assert-TabletLocalConnection

if (Test-Path -LiteralPath $androidKeyPath) {
  $env:ADB_VENDOR_KEYS = $androidKeyPath
}

Write-Host "Conectando con la tablet $Serial..."
function Invoke-TabletAdbDiagnostic {
  param([string]$AdbPath, [string[]]$AdbArguments)
  # ADB writes normal startup notices to stderr. In Windows PowerShell 5.1,
  # redirecting stderr under Stop can throw even when the native exit is zero.
  $ErrorActionPreference = 'Continue'
  $taskOutput = @(& $AdbPath @AdbArguments 2>&1)
  return [pscustomobject]@{ ExitCode = $LASTEXITCODE; Output = $taskOutput }
}
$serverQuery = Invoke-TabletAdbDiagnostic -AdbPath $adbPath -AdbArguments @('start-server')
$serverOutput = $serverQuery.Output -join [Environment]::NewLine
if ($serverQuery.ExitCode -ne 0) {
  throw "ADB no pudo iniciar su servidor local. Todavia no se consulto la tablet. No es un diagnostico de cable o autorizacion USB.`n$serverOutput"
}
$deviceQuery = Invoke-TabletAdbDiagnostic -AdbPath $adbPath -AdbArguments @('devices')
$deviceLines = $deviceQuery.Output
if ($deviceQuery.ExitCode -ne 0) {
  throw "ADB no pudo enumerar los dispositivos. No se puede afirmar que la tablet este desconectada o sin autorizar.`n$($deviceLines -join [Environment]::NewLine)"
}
$devicePattern = "^$([regex]::Escape($Serial))\s+device\b"
if (!($deviceLines | Select-String -Pattern $devicePattern)) {
  $deviceSummary = ($deviceLines -join [Environment]::NewLine).Trim()
  throw "La tablet no aparece autorizada como 'device'. Estado actual:`n$deviceSummary`nConecta el cable, desbloquea la pantalla y acepta siempre esta computadora."
}

$owners = (& $adbPath -s $Serial shell dpm list-owners 2>&1) -join [Environment]::NewLine
if ($LASTEXITCODE -ne 0 -or !$owners.Contains($deviceOwner)) {
  throw "No se encontro el Device Owner esperado ($deviceOwner). Se cancela para no arriesgar la configuracion de kiosco."
}

if (!$SkipBuild) {
  Write-Host "Compilando la version nueva..."
  & $buildScript
  Set-Location $projectRoot
}

if (!(Test-Path -LiteralPath $apkPath)) {
  throw "No encuentro la APK en $apkPath."
}

Write-Host "Instalando la actualizacion sin borrar datos ni Device Owner..."
$installOutput = (& $adbPath -s $Serial install -r $apkPath 2>&1) -join [Environment]::NewLine
if ($LASTEXITCODE -ne 0 -or !$installOutput.Contains("Success")) {
  throw "La instalacion no termino correctamente:`n$installOutput"
}

# A8 always remains disabled; Ulefone's activation survives an in-place update.
if ($Tablet -eq 'a8') {
  node (Join-Path $PSScriptRoot 'configure-companion-tablet.mjs') --tablet=a8
  if ($LASTEXITCODE -ne 0) { throw 'No pude verificar que el compañero quede apagado en la A8.' }
}

Write-Host "Reactivando el modo kiosco..."
$resumeOutput = (& $adbPath -s $Serial shell am start -W -f 0x18000000 -n "$packageName/.KioskRecoveryActivity" -a "$packageName.action.RESUME_KIOSK" 2>&1) -join [Environment]::NewLine
if ($LASTEXITCODE -ne 0) {
  throw "La APK se instalo, pero no pude reactivar el kiosco:`n$resumeOutput"
}

Start-Sleep -Seconds 2
$activityState = (& $adbPath -s $Serial shell dumpsys activity activities 2>&1) -join [Environment]::NewLine
$kioskLocked = $activityState.Contains("mLockTaskModeState=LOCKED")
$appVisible = $activityState -match '(topResumedActivity=|ResumedActivity:).*com\.ian\.escuela/\.MainActivity'

if (!$kioskLocked -or !$appVisible) {
  & $adbPath -s $Serial shell am start -n "$packageName/.MainActivity" | Out-Null
  Start-Sleep -Seconds 2
  $activityState = (& $adbPath -s $Serial shell dumpsys activity activities 2>&1) -join [Environment]::NewLine
  $kioskLocked = $activityState.Contains("mLockTaskModeState=LOCKED")
  $appVisible = $activityState -match '(topResumedActivity=|ResumedActivity:).*com\.ian\.escuela/\.MainActivity'
}

if (!$kioskLocked -or !$appVisible) {
  throw "La actualizacion se instalo, pero la verificacion final del kiosco fallo. Ejecuta el comando RESUME_KIOSK de docs\TABLET_KIOSCO.md."
}

Write-Host ""
Write-Host "Tablet actualizada. Ian Escuela esta al frente y el kiosco esta LOCKED." -ForegroundColor Green
