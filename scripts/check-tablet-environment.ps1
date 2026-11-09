$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'tablet-environment.ps1')
$taskDiagnosis = Test-TabletLocalConnection
$taskDiagnosis | ConvertTo-Json -Compress
if (!$taskDiagnosis.Ready) { exit 2 }
