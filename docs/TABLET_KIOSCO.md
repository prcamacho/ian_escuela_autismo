# Tablet de Ian: Device Owner y modo kiosco

Este documento conserva el contexto operativo de la Samsung Tab A8 dedicada a Ian Escuela. Leerlo antes de modificar la capa Android o dar instrucciones para actualizar la tablet.

## Estado actual

- Dispositivo: Samsung Galaxy Tab A8.
- Paquete Android: `com.ian.escuela`.
- La app está registrada como **Device Owner** con el receptor `com.ian.escuela/.KioskDeviceAdminReceiver`.
- La app usa **Lock Task Mode** (kiosco): bloquea Inicio, Recientes, notificaciones y el menú normal del botón lateral.
- Ian Escuela es la pantalla principal (HOME) persistente y se intenta iniciar después de cada arranque.
- Pantalla: orientación horizontal, navegación/barra de estado ocultas en modo kiosco.
- Ajustes aplicados al abrir la app: brillo manual al 70% (`178/255`) y apagado de pantalla tras 3 minutos (`180000 ms`).
- La app funciona sin internet. No intentar forzar modo avión desde el código: Samsung rechaza que un Device Owner modifique `airplane_mode_on` y esa llamada hace que la app se cierre.

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

Con la tablet conectada por USB, depuración USB autorizada y PowerShell abierto dentro de `platform-tools`:

```powershell
.\adb.exe devices
.\adb.exe install -r "C:\Users\pablo\Desktop\Proyectos\Ian Escuela App\android\app\build\outputs\apk\debug\app-debug.apk"
.\adb.exe shell am start -n com.ian.escuela/.MainActivity
```

La instalación debe responder `Success`. **No desinstalar** `com.ian.escuela`: para conservar Device Owner hay que actualizar sobre la instalación existente (`install -r`) y firmar con la misma clave. En este proyecto se está usando la firma debug de esta PC; no cambiar de equipo/keystore sin preservar la clave de firma.

## Comandos adultos de mantenimiento

### Pausar el kiosco

Deja Device Owner activo pero detiene temporalmente Lock Task:

```powershell
.\adb.exe shell am start -n com.ian.escuela/.KioskRecoveryActivity -a com.ian.escuela.action.PAUSE_KIOSK
```

Mientras está pausado, la app puede seguir figurando como pantalla HOME. Para abrir Ajustes durante el mantenimiento:

```powershell
.\adb.exe shell am start -a android.settings.SETTINGS
```

### Reanudar el kiosco

```powershell
.\adb.exe shell am start -n com.ian.escuela/.KioskRecoveryActivity -a com.ian.escuela.action.RESUME_KIOSK
```

La actividad de recuperación intenta activar Lock Task directamente y luego vuelve a Ian Escuela. Si la app no queda al frente, ejecutar además:

```powershell
.\adb.exe shell am start -n com.ian.escuela/.MainActivity
```

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
