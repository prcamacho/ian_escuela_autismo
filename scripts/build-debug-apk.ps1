$ErrorActionPreference = "Stop"

$projectRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$npmCli = "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js"
$sdkRoot = $env:ANDROID_HOME
if (!$sdkRoot) {
  $sdkRoot = Join-Path $env:LOCALAPPDATA "Android\Sdk"
}

Set-Location $projectRoot

if (!(Get-Command node -ErrorAction SilentlyContinue)) {
  throw "No encuentro Node.js. Instala Node.js LTS antes de compilar."
}

if (!(Test-Path $npmCli)) {
  throw "No encuentro npm-cli.js en $npmCli. Reinstala Node.js LTS."
}

if (!(Test-Path "node_modules")) {
  Write-Host "Instalando dependencias npm..."
  node $npmCli install
  if ($LASTEXITCODE -ne 0) {
    throw "npm install fallo con codigo $LASTEXITCODE"
  }
}

$capCli = Join-Path $projectRoot "node_modules\@capacitor\cli\bin\capacitor"
if (!(Test-Path $capCli)) {
  throw "No encuentro Capacitor CLI. Revisa si npm install termino correctamente."
}

if (!(Test-Path "android")) {
  Write-Host "Creando proyecto Android con Capacitor..."
  node $capCli add android
  if ($LASTEXITCODE -ne 0) {
    throw "Capacitor add android fallo con codigo $LASTEXITCODE"
  }
} else {
  Write-Host "Sincronizando proyecto Android..."
  node $capCli sync android
  if ($LASTEXITCODE -ne 0) {
    throw "Capacitor sync android fallo con codigo $LASTEXITCODE"
  }
}

$env:ANDROID_HOME = $sdkRoot
$env:ANDROID_SDK_ROOT = $sdkRoot
$localProperties = Join-Path $projectRoot "android\local.properties"
$sdkForGradle = $sdkRoot.Replace("\", "/")
Set-Content -Path $localProperties -Value "sdk.dir=$sdkForGradle" -Encoding ASCII
Write-Host "Usando Android SDK: $sdkRoot"

Set-Location (Join-Path $projectRoot "android")
Write-Host "Compilando APK debug..."
.\gradlew.bat assembleDebug
if ($LASTEXITCODE -ne 0) {
  throw "Gradle fallo con codigo $LASTEXITCODE"
}

$apk = Join-Path $projectRoot "android\app\build\outputs\apk\debug\app-debug.apk"
Write-Host ""
Write-Host "APK generado:"
Write-Host $apk
