param(
  [Parameter(Mandatory=$true)][ValidateSet('a8', 'ulefone')][string]$Tablet,
  [Parameter(Mandatory=$true)][ValidateSet('status', 'pause', 'resume', 'settings')][string]$Action
)
$ErrorActionPreference = 'Stop'
$serials = @{ a8 = 'R8MT100KBQD'; ulefone = '3109RH1010027680' }
$serial = $serials[$Tablet]
$sdk = if ($env:ANDROID_HOME) { $env:ANDROID_HOME } else { Join-Path $env:LOCALAPPDATA 'Android\Sdk' }
$adb = Join-Path $sdk 'platform-tools\adb.exe'
$env:ADB_VENDOR_KEYS = Join-Path $env:USERPROFILE '.android\adbkey'
$state = (& $adb -s $serial get-state 2>&1) -join ''
if ($LASTEXITCODE -ne 0 -or $state.Trim() -ne 'device') { throw "Conecta y autoriza la tablet $Tablet ($serial)." }
$owner = (& $adb -s $serial shell dpm list-owners 2>&1) -join ''
if (!$owner.Contains('com.ian.escuela/.KioskDeviceAdminReceiver')) { throw 'La tablet no conserva el administrador esperado.' }
if ($Action -in @('pause','settings')) {
  & $adb -s $serial shell am start -W -f 0x18000000 -n com.ian.escuela/.KioskRecoveryActivity -a com.ian.escuela.action.PAUSE_KIOSK
  if ($LASTEXITCODE -ne 0) { throw 'No se pudo pausar el kiosco.' }
}
if ($Action -eq 'settings') { & $adb -s $serial shell am start -a android.settings.SETTINGS }
if ($Action -eq 'resume') {
  & $adb -s $serial shell am start -W -f 0x18000000 -n com.ian.escuela/.KioskRecoveryActivity -a com.ian.escuela.action.RESUME_KIOSK
  if ($LASTEXITCODE -ne 0) { throw 'No se pudo reactivar el kiosco.' }
}
$expected = if ($Action -in @('pause','settings')) { 'NONE' } elseif ($Action -eq 'resume') { 'LOCKED' } else { $null }
for ($attempt = 0; $attempt -lt 10; $attempt++) {
  $activity = (& $adb -s $serial shell dumpsys activity activities) -join [Environment]::NewLine
  if (!$expected -or $activity.Contains("mLockTaskModeState=$expected")) { break }
  Start-Sleep -Milliseconds 500
}
$activity -split "`n" | Select-String -Pattern 'mLockTaskModeState|topResumedActivity'
if ($expected -and !$activity.Contains("mLockTaskModeState=$expected")) { throw "No se confirmo el estado $expected en $Tablet." }
