# Ian Escuela

Aplicacion escolar adaptable para tablet Android. Esta version esta pensada para Ian: inicio simple, apoyo visual, materias fijas, ejercicios tactiles, evaluacion en vivo sin registro y una pantalla inmersiva de comunicacion con pictogramas ARASAAC offline.

## Estado actual

Esto es codigo listo para probar como app web local/PWA y como proyecto Android con Capacitor. En esta carpeta queda el APK debug generado: `Ian-Escuela-debug.apk`.

Para generar un APK hacen falta herramientas Android en esta PC. No es obligatorio usar Android Studio como app de escritorio: se puede compilar solo con comandos usando Android command-line tools.

- Node.js y npm.
- Android SDK command-line tools, o Android Studio si se prefiere el camino visual.
- JDK/Java.
- Dependencias de Capacitor.

La carpeta ya trae `package.json` y `capacitor.config.json` preparados para convertir la carpeta `app` en APK.

## Estructura

```text
Ian Escuela App/
  app/
    index.html           Pantalla principal
    styles.css           Diseno responsive para tablet
    app.js               Logica, datos, ejercicios y comunicador
    manifest.json        Configuracion instalable/PWA
    service-worker.js    Cache offline cuando se sirve por http
    icon.svg             Icono de la app
  docs/
    APK.md               Pasos para generar APK
    CONTENIDO.md         Como cargar materias, temas y ejercicios
    TABLET_KIOSCO.md     Estado y mantenimiento de la Tab A8 en modo kiosco
  scripts/
    setup-android-cli.ps1 Instala/prepara SDK Android por comandos
    build-debug-apk.ps1   Genera APK debug por comandos
    update-tablet.ps1     Compila, instala y reactiva el kiosco en una orden
  capacitor.config.json  Configuracion para Android con Capacitor
  package.json           Scripts y dependencias para compilar
```

## Probar ahora en esta PC

Opcion simple:

1. Abrir `app/index.html` con doble clic.
2. Probar inicio, Escuela, Me Comunico, temas y ejercicios.

Opcion recomendada para simular mejor una app:

```powershell
cd "$env:USERPROFILE\Desktop\Ian Escuela App"
python -m http.server 4173 -d app
```

Despues abrir:

```text
http://localhost:4173
```

Si Python no esta instalado, se puede abrir el HTML con doble clic igual.

## Probar en la tablet Samsung

1. Conectar la PC y la tablet a la misma red WiFi.
2. En la PC, desde esta carpeta, ejecutar:

```powershell
python -m http.server 4173 -d app
```

3. Ver la IP de la PC:

```powershell
ipconfig
```

4. En la tablet abrir Chrome e ingresar:

```text
http://IP-DE-LA-PC:4173
```

Ejemplo:

```text
http://192.168.1.50:4173
```

5. En Chrome, usar "Agregar a pantalla principal" para que quede como acceso tipo app.

## Que ya hace

- Inicio limpio con "Hola, Ian" y dos tarjetas lado a lado: Escuela y Me comunico.
- Materias fijas: Lengua, Cs Naturales, Cs Sociales, Matematicas e Inglés.
- Temas dentro de cada materia.
- Ejercicios de eleccion tactil.
- Me Comunico inmersivo, sin encabezado ni scroll, con pictogramas ARASAAC offline.
- Mensajes rapidos anclados arriba: SI, NO, hambre, enojo, saludo, despedida, agua, bano y ayuda.
- Armado de frase con iniciadores y pictos relacionados, sin voz por parlante.
- Modo practicar.
- Modo evaluar en vivo, sin guardar resultados por ahora.
- Contenido y configuracion mantenidos desde codigo para evitar distracciones.
- Funcionamiento sin internet cuando se usa como PWA servida por HTTP.
- APK debug generado para instalar y probar en Android.

## Siguiente paso

El APK debug queda en `Ian-Escuela-debug.apk`. Para regenerarlo despues de nuevos cambios, ejecutar los pasos de `docs/APK.md`.

Si se va a modificar o mantener la tablet dedicada a Ian, leer primero `docs/TABLET_KIOSCO.md`.

Con la tablet conectada y autorizada, la actualización completa se hace desde la raíz del proyecto con:

```powershell
npm run tablet:update
```
