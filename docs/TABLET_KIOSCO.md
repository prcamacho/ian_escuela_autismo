# Tablet de Ian: Device Owner y modo kiosco

Este documento conserva el contexto operativo de la Samsung Tab A8 dedicada a Ian Escuela. Leerlo antes de modificar la capa Android o dar instrucciones para actualizar la tablet.

Para distinguir A8 y Ulefone, activar el compañero y ubicar el respaldo cifrado de llaves, leer también [TABLETS_MANTENIMIENTO.md](TABLETS_MANTENIMIENTO.md). Los comandos de este documento sin serie explícita solo deben usarse con una tablet conectada; preferir los nuevos comandos por nombre.

## Permisos de la sesion: comprobar antes de insistir

El 9 de noviembre de 2026 una actualizacion de Cuentos se instalo y verifico en la A8 desde otro chat. Su registro de autorizaciones muestra solicitudes `sandbox_permissions: "require_escalated"` aprobadas. En esta conversacion los intentos normales fallaron al crear la conexion local de ADB, y una prueba independiente de TCP local recibio acceso denegado. La solicitud equivalente fuera del entorno restringido fue rechazada con `sandbox_approval: false`. No se encontraron cambios en los scripts de actualizacion que explicaran la diferencia; no se atribuye a un cambio hecho por el usuario.

Antes de diagnosticar el cable o la autorizacion USB, ejecutar `npm run tablet:check`. No usa ADB ni consulta o modifica la tablet. Comprueba una conexion TCP temporal dentro de la PC y espera como maximo dos segundos por esa conexion. Devuelve JSON y codigo 0 si la conexion funciona o codigo 2 si falla. Que funcione solo habilita el siguiente diagnostico: no confirma que haya una tablet conectada.

El actualizador incluye esta comprobacion y distingue fallo de conexion local, fallo de arranque del servidor ADB, fallo al enumerar dispositivos y una enumeracion correcta sin la tablet autorizada. Un fallo local no debe producir instrucciones de cambiar cable o aceptar un permiso en la tablet.

Verificacion: `npm run verify:tablet`. Comprueba el diagnostico real de la sesion, la detencion ante acceso denegado y la lectura de salidas nativas en Windows PowerShell 5.1. Los avisos de arranque en stderr no se consideran errores si el proceso termina con codigo cero. Las pruebas no usan ADB ni modifican la tablet.

La autorizacion del usuario para actualizar la app y la politica efectiva de ejecucion son cosas diferentes. Si la politica permite solicitar ejecucion autorizada fuera del sandbox, usar esa via para la operacion concreta. Si la prohibe, comunicar el bloqueo una sola vez: repetir ADB o pedir nuevamente permiso al usuario no cambia esa politica. No editar archivos de configuracion ni usar otras herramientas para eludirla. Las instrucciones permanentes para futuros chats estan en `AGENTS.md`.

## Estado actual

- Dispositivo: Samsung Galaxy Tab A8.
- Paquete Android: `com.ian.escuela`.
- La app está registrada como **Device Owner** con el receptor `com.ian.escuela/.KioskDeviceAdminReceiver`.
- La app usa **Lock Task Mode** (kiosco): bloquea Inicio, Recientes, notificaciones y el menú normal del botón lateral.
- Ian Escuela es la pantalla principal (HOME) persistente y se intenta iniciar después de cada arranque.
- Pantalla: orientación horizontal, navegación/barra de estado ocultas en modo kiosco.
- Ajustes aplicados al abrir la app: brillo manual al 70% (`178/255`) y apagado de pantalla tras 3 minutos (`180000 ms`).
- La app retira solicitudes residuales de pantalla encendida cuando ninguna vista visible ni la ventana de la app las necesita; conserva las solicitudes vigentes durante la reproducción.
- La app funciona sin internet. No intentar forzar modo avión desde el código: Samsung rechaza que un Device Owner modifique `airplane_mode_on` y esa llamada hace que la app se cierre.

## Corrección del apagado automático — 4 de noviembre de 2026

La A8 conservaba los `180000 ms` y tenía desactivado `stay_on_while_plugged_in`, pero su ventana mantenía `FLAG_KEEP_SCREEN_ON`. Se leyó el proceso: los atributos propios de `Window` no tenían esa bandera (`0x81810100`), mientras que los parámetros de la vista raíz y `ViewRootImpl.mClientWindowLayoutFlags` sí (`0x81810180`). Ninguna vista visible pedía mantener la pantalla encendida y el contador de `PowerSaveBlocker` de WebView estaba en cero. La bandera había quedado retenida después de una solicitud temporal.

Se confirmó un disparador durante el diagnóstico: conectar el depurador CDP de WebView activa una solicitud de pantalla encendida incluso antes de reproducir un video; al cerrar la conexión debe liberarse. El historial Git guardado no contiene una orden permanente de mantener la pantalla encendida; el commit de kiosco `fa95d9e` ya configuraba tres minutos.

`MainActivity.releaseStaleScreenOnFlag()` comprueba los parámetros públicos de la vista raíz antes de dibujar, al reanudar y al recuperar el foco. Si encuentra la bandera residual, sin solicitud explícita de `Window` ni de ninguna vista visible, vuelve a enviar los atributos limpios con `Window.clearFlags()`. Solo se aplica con Device Owner y kiosco activo. No usa reflexión, temporizadores de apagado ni bloqueos forzados; permite que Android aplique el plazo de inactividad. El observador se retira al destruir la actividad.

La prueba `ScreenTimeoutGuardTest` reproduce el estado retenido mediante `WindowManager.updateViewLayout`: falló en la APK anterior y pasó con la corrección. También comprueba que una solicitud visible durante la reproducción y una solicitud explícita de ventana se conserven, y que al liberarlas vuelva a permitirse el apagado. Debe ejecutarse seleccionando esa clase en una tablet de prueba enrolada, con la pantalla encendida.

En la A8 se probó el clip local de cinco segundos, se cerraron todas las conexiones de depuración y se observó un apagado real con motivo `timeout` a los **180006 ms** desde la última actividad. Se conservaron Device Owner, kiosco `LOCKED`, compañero deshabilitado y los datos escolares de la comprobación. Evidencias locales en `tmp/screen-timeout/`, excluidas de Git. Para medir el apagado, cerrar CDP antes de empezar y consultar solo `dumpsys power`; conectar nuevamente el depurador puede mantener la pantalla encendida o reiniciar la inactividad.

## Archivos Android relevantes

- `android/app/src/main/java/com/ian/escuela/MainActivity.java`: configura Device Owner, Lock Task, brillo, apagado, HOME e inmersivo.
- `android/app/src/main/java/com/ian/escuela/KioskDeviceAdminReceiver.java`: receptor de administración.
- `android/app/src/main/java/com/ian/escuela/KioskBootReceiver.java`: vuelve a abrir la app luego del arranque.
- `android/app/src/main/java/com/ian/escuela/KioskRecoveryActivity.java`: mantenimiento adulto por ADB.
- `android/app/src/main/res/xml/kiosk_device_admin.xml`: políticas declaradas para Device Admin.
- `android/app/src/main/AndroidManifest.xml`: registra actividades, receptores y permiso de arranque.

## Generar la APK

Desde la raíz del proyecto:

```powershell
node "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run android:sync
cd android
.\gradlew.bat assembleDebug
```

La APK queda en:

```text
android\app\build\outputs\apk\debug\app-debug.apk
```

`android:sync` incorpora los cambios de `app/` (HTML, CSS, JavaScript y recursos) al proyecto Android antes de compilar. No sobrescribe los archivos Java de kiosco.

## Actualizar la tablet sin perder Device Owner

### Camino habitual: una sola orden

Esta PC ya quedó autorizada de forma permanente por la tablet. Conectarla por USB y, desde la raíz del proyecto, ejecutar:

```powershell
npm run tablet:update
```

El script `scripts/update-tablet.ps1` verifica que sea la tablet de Ian y que conserve Device Owner, sincroniza y compila la app, instala con `adb install -r`, reactiva el kiosco y comprueba que termine en estado `LOCKED`. No hace falta salir manualmente de la app.

Para reinstalar una APK que ya fue compilada, sin volver a compilar:

```powershell
npm run tablet:update -- -SkipBuild
```

No borrar estos dos archivos de esta PC ni regenerarlos:

- `C:\Users\pablo\.android\adbkey`: autorización ADB aceptada por la tablet.
- `C:\Users\pablo\.android\debug.keystore`: firma que permite actualizar la app sin desinstalarla.

El modo seguro queda solamente como recuperación excepcional si cambia la computadora, se borra `adbkey` o se revoca manualmente la autorización USB.

### Camino manual

Con la tablet conectada por USB, depuración USB autorizada y PowerShell abierto dentro de `platform-tools`:

```powershell
.\adb.exe devices
.\adb.exe install -r "C:\Users\pablo\Desktop\Proyectos\Ian Escuela App\android\app\build\outputs\apk\debug\app-debug.apk"
.\adb.exe shell am start -n com.ian.escuela/.MainActivity
```

La instalación debe responder `Success`. **No desinstalar** `com.ian.escuela`: para conservar Device Owner hay que actualizar sobre la instalación existente (`install -r`) y firmar con la misma clave. En este proyecto se está usando la firma debug de esta PC; no cambiar de equipo/keystore sin preservar la clave de firma.

### Si ADB muestra `unauthorized` y el kiosco tapa el permiso

No borrar ni regenerar `C:\Users\pablo\.android\adbkey`. Iniciar el servidor indicándole explícitamente la clave que ya fue autorizada por la tablet:

```powershell
$env:ADB_VENDOR_KEYS='C:\Users\pablo\.android\adbkey'
adb kill-server
adb start-server
adb devices -l
```

La Tab A8 debe aparecer como `device`, no como `unauthorized`. Si la clave es la misma pero Samsung igualmente no muestra el diálogo, reiniciar temporalmente en modo seguro, aceptar **Permitir siempre desde esta computadora** y reiniciar normalmente. No quitar Device Owner ni desinstalar la app.

## Comandos adultos de mantenimiento

### Pausar el kiosco

Deja Device Owner activo pero detiene temporalmente Lock Task:

La versión actual también retira temporalmente el paquete de la lista de aplicaciones bloqueadas. Esto permite pausar en la Ulefone, donde `stopLockTask()` desde la actividad de mantenimiento por sí solo dejaba la tarea principal bloqueada. Reanudar repone la lista y activa nuevamente el kiosco.

```powershell
.\adb.exe shell am start -n com.ian.escuela/.KioskRecoveryActivity -a com.ian.escuela.action.PAUSE_KIOSK
```

Mientras está pausado, la app puede seguir figurando como pantalla HOME. Para abrir Ajustes durante el mantenimiento:

```powershell
.\adb.exe shell am start -a android.settings.SETTINGS
```

### Reanudar el kiosco

```powershell
.\adb.exe shell am start -W -f 0x18000000 -n com.ian.escuela/.KioskRecoveryActivity -a com.ian.escuela.action.RESUME_KIOSK
```

Las banderas crean una tarea de mantenimiento separada. Esto evita que Samsung entregue la orden a la instancia HOME anterior de `MainActivity` y deje guardado `paused=true`. La actividad de recuperación activa Lock Task directamente y luego vuelve a Ian Escuela. Si la app no queda al frente, ejecutar además:

```powershell
.\adb.exe shell am start -n com.ian.escuela/.MainActivity
```

Para verificar el resultado:

```powershell
.\adb.exe shell dumpsys activity activities | Select-String -Pattern "mLockTaskModeState|topResumedActivity"
```

El estado esperado es `mLockTaskModeState=LOCKED` y `com.ian.escuela/.MainActivity` como actividad reanudada.

En la A8 también puede aparecer como `ResumedActivity:` en lugar de `topResumedActivity=`. Desde el 7 de octubre de 2026, el actualizador reconoce ambos formatos; antes podía informar un fallo de verificación aunque la instalación estuviera correcta y el kiosco siguiera bloqueado.

### Reiniciar desde la PC

```powershell
.\adb.exe reboot
```

Un reinicio forzado en la tablet se hace con botón lateral + Volumen abajo durante unos 7–10 segundos. Debe volver a Ian Escuela después de arrancar.

## Recuperación y límites

- Pausar kiosco **no** quita Device Owner.
- Para quitar Device Owner de forma segura o recuperar el control si ADB no está disponible, se requiere un restablecimiento de fábrica; borra la tablet y se debe enrolar de nuevo.
- Recovery de la Tab A8: conectarla por USB a una PC, apagar/reiniciar forzado y mantener Volumen arriba + botón lateral hasta el logo Samsung. Usar Recovery solo como emergencia.
- Mantener una PC/cable con ADB autorizado. Si se restablece la tablet, será necesario configurar todo nuevamente y volver a ejecutar `dpm set-device-owner` durante la configuración inicial.

## Si Ian Escuela se cierra

Primero obtener el error real por ADB:

```powershell
.\adb.exe logcat -d -v brief | Select-String -Pattern "FATAL EXCEPTION|com.ian.escuela|MainActivity|KioskRecoveryActivity" -Context 3,8
```

No agregar políticas de Android sin probarlas en esta Tab A8. Caso conocido: `DevicePolicyManager.setGlobalSetting(..., Settings.Global.AIRPLANE_MODE_ON, "1")` produce `SecurityException` en este equipo y hace caer `MainActivity`.

## Mantenimiento de este documento

Actualizar este archivo cuando cambie cualquiera de estos puntos:

- comportamiento del kiosco o los comandos ADB;
- receptores/actividades nativas Android;
- ajustes de brillo, pantalla, conectividad o arranque;
- ubicación, firma o método de compilación de la APK;
- un error real y su solución.

En un chat nuevo, indicar: “Leé `docs/TABLET_KIOSCO.md` antes de tocar la APK o la tablet”.
