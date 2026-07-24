$ErrorActionPreference = "Stop"

$sdkRoot = Join-Path $env:LOCALAPPDATA "Android\Sdk"
$toolsRoot = Join-Path $sdkRoot "cmdline-tools"
$latestRoot = Join-Path $toolsRoot "latest"
$sdkManager = Join-Path $latestRoot "bin\sdkmanager.bat"
$zipUrl = "https://dl.google.com/android/repository/commandlinetools-win-14742923_latest.zip"
$zipPath = Join-Path $env:TEMP "android-commandlinetools.zip"
$extractRoot = Join-Path $env:TEMP "android-commandlinetools"

function Add-UserPathEntry {
  param([string] $PathEntry)

  $currentPath = [Environment]::GetEnvironmentVariable("Path", "User")
  $parts = @()
  if ($currentPath) {
    $parts = $currentPath.Split(";") | Where-Object { $_ }
  }

  if ($parts -notcontains $PathEntry) {
    $nextPath = ($parts + $PathEntry) -join ";"
    [Environment]::SetEnvironmentVariable("Path", $nextPath, "User")
  }
}

Write-Host "Preparando Android SDK en $sdkRoot"
New-Item -ItemType Directory -Force -Path $toolsRoot | Out-Null

if (!(Test-Path $sdkManager)) {
  Write-Host "Descargando Android command-line tools..."
  Invoke-WebRequest -Uri $zipUrl -OutFile $zipPath

  if (Test-Path $extractRoot) {
    Remove-Item -Recurse -Force $extractRoot
  }

  Expand-Archive -Path $zipPath -DestinationPath $extractRoot -Force

  if (Test-Path $latestRoot) {
    Remove-Item -Recurse -Force $latestRoot
  }

  New-Item -ItemType Directory -Force -Path $latestRoot | Out-Null
  Copy-Item -Path (Join-Path $extractRoot "cmdline-tools\*") -Destination $latestRoot -Recurse -Force
}

[Environment]::SetEnvironmentVariable("ANDROID_HOME", $sdkRoot, "User")
[Environment]::SetEnvironmentVariable("ANDROID_SDK_ROOT", $sdkRoot, "User")
$env:ANDROID_HOME = $sdkRoot
$env:ANDROID_SDK_ROOT = $sdkRoot

Add-UserPathEntry (Join-Path $latestRoot "bin")
Add-UserPathEntry (Join-Path $sdkRoot "platform-tools")
Add-UserPathEntry (Join-Path $sdkRoot "emulator")

Write-Host "Aceptando licencias del SDK..."
1..100 | ForEach-Object { "y" } | & $sdkManager --licenses

Write-Host "Instalando paquetes Android necesarios..."
& $sdkManager "platform-tools" "platforms;android-36" "build-tools;36.0.0"

Write-Host ""
Write-Host "Listo. Cerrar y abrir PowerShell para que tome el PATH actualizado."
Write-Host "ANDROID_HOME=$sdkRoot"
