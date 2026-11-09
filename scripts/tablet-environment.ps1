# Only checks a short-lived TCP connection on this computer. No ADB, USB or
# Android settings are accessed. Compatible with Windows PowerShell 5.1.
function Test-TabletLocalConnection {
  $taskListener = $null
  $taskClient = $null
  try {
    $taskListener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, 0)
    $taskClient = [System.Net.Sockets.TcpClient]::new()
    $taskListener.Start()
    $taskEndpoint = $taskListener.LocalEndpoint
    $taskConnect = $taskClient.ConnectAsync([System.Net.IPAddress]::Loopback, $taskEndpoint.Port)
    if (!$taskConnect.Wait(2000)) {
      throw [System.TimeoutException]::new('La conexion local no respondio en dos segundos.')
    }
    return [pscustomobject]@{
      Ready = $true
      Kind = 'ready'
      Detail = 'La conexion local necesaria para ADB esta disponible. Falta consultar la tablet.'
      SocketError = $null
    }
  } catch {
    $taskCause = $_.Exception.GetBaseException()
    $taskDenied = $taskCause -is [System.Net.Sockets.SocketException] -and
      $taskCause.SocketErrorCode -eq [System.Net.Sockets.SocketError]::AccessDenied
    return [pscustomobject]@{
      Ready = $false
      Kind = $(if ($taskDenied) { 'local-access-denied' } else { 'local-connection-failed' })
      Detail = $(if ($taskDenied) {
        'El entorno deniega las conexiones locales que necesita ADB. No se consultaron USB ni la tablet. Revisar los permisos de ejecucion de la sesion; no diagnosticar un problema de cable o autorizacion USB.'
      } else {
        'No se pudo comprobar la conexion local necesaria para ADB. No se consultaron USB ni la tablet. Causa: ' + $taskCause.Message
      })
      SocketError = $(if ($taskCause -is [System.Net.Sockets.SocketException]) { [int]$taskCause.SocketErrorCode } else { $null })
    }
  } finally {
    if ($null -ne $taskClient) { $taskClient.Dispose() }
    if ($null -ne $taskListener) { $taskListener.Stop() }
  }
}

function Assert-TabletLocalConnection {
  $taskDiagnosis = Test-TabletLocalConnection
  if (!$taskDiagnosis.Ready) {
    $taskFailure = [System.InvalidOperationException]::new($taskDiagnosis.Detail)
    $taskFailure.Data['IanTabletFailure'] = $taskDiagnosis.Kind
    throw $taskFailure
  }
}
