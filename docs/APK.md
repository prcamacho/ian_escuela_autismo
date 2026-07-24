# Generar APK

Esta carpeta contiene el codigo de la app y puede generar un APK con las herramientas Android. En esta copia existe un APK debug generado previamente en la raiz (`Ian-Escuela-debug.apk`), pero despues de modificar la app conviene compilar uno nuevo.

No hace falta abrir Android Studio como aplicacion de escritorio si no queres. Android Studio simplifica la configuracion, pero Android tambien permite instalar el SDK y compilar APK desde PowerShell.

## 1. Requisitos

Instalar o tener en la PC:

- Node.js LTS.
- JDK/Java.
- Android SDK command-line tools.

Tambien hace falta conexion a internet la primera vez para descargar dependencias npm y Gradle.

## Camino A: solo comandos

Este es el camino sin abrir Android Studio.

### 1. Preparar Android SDK

Desde PowerShell, parado en la carpeta del proyecto:

```powershell
cd "$env:USERPROFILE\Desktop\Ian Escuela App"
.\scripts\setup-android-cli.ps1
```

Ese script descarga Android command-line tools, configura `ANDROID_HOME`, agrega herramientas al PATH del usuario e instala paquetes base del SDK.

Si PowerShell bloquea scripts locales, ejecutar una sola vez:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

### 2. Generar APK debug

```powershell
cd "$env:USERPROFILE\Desktop\Ian Escuela App"
.\scripts\build-debug-apk.ps1
```

El APK queda en:

```text
android\app\build\outputs\apk\debug\app-debug.apk
```

### 3. Instalar en la tablet por USB

En la Samsung A8:

1. Activar opciones de desarrollador.
2. Activar depuracion USB.
3. Conectar por USB y aceptar el permiso de depuracion.

Luego:

```powershell
adb devices
adb install -r android\app\build\outputs\apk\debug\app-debug.apk
```

## Camino B: con Android Studio

Este camino usa Android Studio para configurar SDK, abrir el proyecto Android y generar el APK visualmente.

### 1. Instalar dependencias

```powershell
cd "$env:USERPROFILE\Desktop\Ian Escuela App"
npm install
```

### 2. Crear proyecto Android

```powershell
npx cap add android
```

Si la carpeta `android` ya existe:

```powershell
npx cap sync android
```

### 3. Abrir en Android Studio

```powershell
npx cap open android
```

En Android Studio:

1. Esperar a que Gradle termine de sincronizar.
2. Conectar la Samsung A8 por USB con depuracion activada, o usar un emulador.
3. Presionar Run para probar.

### 4. Generar APK de prueba

Opcion desde Android Studio:

```text
Build > Build Bundle(s) / APK(s) > Build APK(s)
```

Opcion desde PowerShell:

```powershell
cd android
.\gradlew assembleDebug
```

El APK debug queda en:

```text
android\app\build\outputs\apk\debug\app-debug.apk
```

## APK firmado

Para instalar en varias tablets o publicar, conviene firmar la app con una clave propia. Eso se hace desde:

```text
Android Studio > Build > Generate Signed Bundle / APK
```

Para Play Store normalmente se sube un `.aab`, no un `.apk`.

## Nota importante

La version web ya sirve para validar si el flujo le resulta comodo a Ian. Conviene probar eso primero antes de cerrar el APK, porque ajustar botones, materias, consignas o tamanos es mas rapido en esta etapa.
