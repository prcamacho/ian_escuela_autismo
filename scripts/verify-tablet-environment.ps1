$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'tablet-environment.ps1')

function Assert-Check([bool]$Condition, [string]$Message) {
  if (!$Condition) { throw $Message }
}

# Validate the actual session, without invoking ADB or touching a tablet.
$taskDiagnosis = Test-TabletLocalConnection
Assert-Check ($taskDiagnosis.Ready -is [bool]) 'El diagnostico debe declarar si esta listo.'
Assert-Check ($taskDiagnosis.Kind -in @('ready','local-access-denied','local-connection-failed')) 'Clase de diagnostico desconocida.'
if ($taskDiagnosis.Ready) {
  Assert-Check ($taskDiagnosis.Kind -eq 'ready') 'Una conexion disponible no debe declararse bloqueada.'
} elseif ($taskDiagnosis.Kind -eq 'local-access-denied') {
  Assert-Check ($taskDiagnosis.SocketError -eq 10013) 'Solo acceso denegado debe clasificarse como permiso de sockets.'
}

# Verify that the guard permits a usable environment and preserves the specific
# failure when the environment denies access. Restore the real probe afterwards.
$taskOriginalProbe = ${function:Test-TabletLocalConnection}
try {
  function Test-TabletLocalConnection { [pscustomobject]@{ Ready = $true; Kind = 'ready'; Detail = 'available' } }
  Assert-TabletLocalConnection
  function Test-TabletLocalConnection { [pscustomobject]@{ Ready = $false; Kind = 'local-access-denied'; Detail = 'SESSION_BLOCKED_BEFORE_ADB' } }
  $taskBlocked = $false
  try { Assert-TabletLocalConnection } catch {
    $taskBlocked = $true
    Assert-Check ($_.Exception.Data['IanTabletFailure'] -eq 'local-access-denied') 'Se perdio la causa del bloqueo.'
    Assert-Check ($_.Exception.Message -eq 'SESSION_BLOCKED_BEFORE_ADB') 'El bloqueo no debe convertirse en un error de USB.'
  }
  Assert-Check $taskBlocked 'El actualizador debe detenerse si la conexion local esta bloqueada.'
} finally {
  Set-Item Function:Test-TabletLocalConnection -Value $taskOriginalProbe
}

$taskUpdatePath = Join-Path $PSScriptRoot 'update-tablet.ps1'
$taskTokens = $null
$taskParseErrors = $null
$taskAst = [System.Management.Automation.Language.Parser]::ParseFile($taskUpdatePath, [ref]$taskTokens, [ref]$taskParseErrors)
Assert-Check ($taskParseErrors.Count -eq 0) 'El actualizador tiene errores de sintaxis.'
$taskNativeHelper = $taskAst.Find({ param($node) $node -is [System.Management.Automation.Language.FunctionDefinitionAst] -and $node.Name -eq 'Invoke-TabletAdbDiagnostic' }, $true)
Assert-Check ($null -ne $taskNativeHelper) 'Falta el lector de resultados de ADB.'
. ([scriptblock]::Create($taskNativeHelper.Extent.Text))

# Run the actual native-output helper with a harmless PowerShell subprocess.
# ADB normally writes startup notices to stderr even when it succeeds.
$taskPowerShell = Join-Path $env:WINDIR 'System32\WindowsPowerShell\v1.0\powershell.exe'
$taskSuccess = Invoke-TabletAdbDiagnostic -AdbPath $taskPowerShell -AdbArguments @('-NoProfile','-NonInteractive','-Command',"[Console]::Error.WriteLine('startup-notice'); [Console]::WriteLine('device-ok'); exit 0")
Assert-Check ($taskSuccess.ExitCode -eq 0) 'Un aviso en stderr no debe convertir un exito nativo en un fallo.'
Assert-Check (($taskSuccess.Output -join ' ') -match 'startup-notice') 'El aviso debe conservarse para diagnostico.'
Assert-Check (($taskSuccess.Output -join ' ') -match 'device-ok') 'Se perdio la salida normal.'
$taskFailure = Invoke-TabletAdbDiagnostic -AdbPath $taskPowerShell -AdbArguments @('-NoProfile','-NonInteractive','-Command',"[Console]::Error.WriteLine('server-failed'); exit 7")
Assert-Check ($taskFailure.ExitCode -eq 7) 'Debe conservarse un fallo nativo real.'
Assert-Check (($taskFailure.Output -join ' ') -match 'server-failed') 'Debe conservarse la causa del fallo nativo.'

Write-Output ('Tablet: diagnostico real ' + $taskDiagnosis.Kind + '; guardia, causa del bloqueo y salidas nativas correctas. No se uso ADB ni se modifico una tablet.')
