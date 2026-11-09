# Mantenimiento de las dos tablets

Leer también [TABLET_KIOSCO.md](TABLET_KIOSCO.md). Las dos usan `com.ian.escuela`, la misma APK y la misma firma de esta PC.

| Equipo | Serie USB | Compañero de voz |
| --- | --- | --- |
| Ulefone Armor Pad Pro | `3109RH1010027680` | Activación individual desde esta PC |
| Samsung Galaxy Tab A8 | `R8MT100KBQD` | Desactivado; la actualización vuelve a comprobarlo |

## Seis expediciones de Escuela instaladas — 9 de noviembre de 2026

Se instalaron los cambios pendientes de la otra conversación: Detectives del porqué, La red de la vida, El viaje de los productos, Pizzería de las fracciones, Ready for the weather y El taller de los inventos. Hay una actividad nueva al principio de cada materia, cinco desafíos por partida y 60 variantes. Se conservaron los temas anteriores, ajustes personales, los 175 recursos de Cuentos y sus reglas actuales, incluidos descansos y esperas de videos.

Se comprobaron seis partidas completas y 30 respuestas mediante toques reales en la A8, repetición de animaciones, avance manual, ausencia de errores JavaScript y conservación del almacenamiento. La comprobación inicial tras instalar confirmó los datos escolares previos. Para continuar la revisión se tomó el estado actual de la tablet, sin reponer la copia previa. Todas las claves anteriores y posteriores a las partidas de prueba coinciden; las pruebas utilizaron almacenamiento separado en memoria.

La inspección visual detectó una regla de etiquetas que mostraba el numerador y el denominador juntos. Se corrigió la especificidad de `.se-order > .se-fraction`, conservando su tamaño en pantallas angostas, y se hizo que las expediciones se abran desde arriba. La lógica de las actividades no cambió. La versión final pasó otra revisión de las seis pantallas en la tablet, con fracciones verticales e instrucciones visibles.

Pasaron `verify-school-expeditions.mjs`, las regresiones modificadas de las actividades anteriores, las 70 locuciones y los 621 recursos PWA. El chequeo local previo confirmó disponibilidad con `require_escalated`; instalación mediante `update-tablet.ps1 -Tablet a8 -SkipBuild`, con Device Owner conservado, compañero deshabilitado, app al frente y kiosco `LOCKED`. Se verificaron 636 archivos web y coincidencia del SHA-256 compilado e instalado: `400E96798E0318DC545837FC9F341674F695C91B4EDF3F61DBE5ECC3265E2022`, caché v183. Copias de la raíz actualizadas. Evidencias: `tmp/expeditions-release/`. Quedó Escuela abierta y todas las conexiones de revisión cerradas.

## Descansos y dos minutos tras videos completos — 9 de noviembre de 2026

Los videos completos requieren dos minutos para iniciar el de otro cuento; los incompletos mantienen un minuto. El mismo video puede retomarse sin esa espera. Se muestra el contador de espera correspondiente.

Toda la sección Cuentos comparte 15 minutos de uso visible. Salir menos de cinco minutos conserva el uso acumulado; cinco minutos consecutivos fuera lo reinician. También se deja de acumular al bloquear u ocultar la app. Al agotarse el uso, voz y video se interrumpen y aparece **Descanso**, con cuenta regresiva de 15:00 a 00:00, actualizada cada segundo. Se bloquea Cuentos y se permiten las otras secciones. Un descanso activo persiste al cerrar o salir y no se cancela por pasar cinco minutos fuera. Al finalizar se habilita el acceso sin autoplay.

La clave nueva es `ian-story-usage-v1`, con uso, señal de actividad, salida y vencimiento del descanso. No se cambian los avances, esperas de locuciones ni los puntos de los videos. Pasaron las 70 locuciones, los siete videos reales y offline, la política de dos minutos, las fronteras exactas del descanso y de cinco minutos fuera, recarga y tres tamaños de pantalla. En la A8 se usó un contador de prueba aislado en 14:59 para observar la detención real de una locución y un video, salida a Mis apoyos, bloqueo al volver y habilitación sin autoplay. Los 120 segundos de espera después de un video completo sí se midieron en tiempo real. El reloj de Android se conservó y las huellas de todas las claves reales antes y después coinciden.

Actualización instalada sin borrar datos, compañero deshabilitado y kiosco `LOCKED` confirmados. La compilación auditada incluye 634 archivos web y caché v181. SHA-256: `4C1B90647158FFC843F0D4D9CE18B2FB9F5C08C4B6F51C52102A2AC59B19596E`. Copias de la raíz actualizadas. Evidencias: `tmp/story-breaks/`. Al terminar queda Mis apoyos, con las conexiones de prueba cerradas.

## Un minuto entre videos incompletos — 6 de noviembre de 2026

Los videos tienen una espera independiente de las locuciones: si el último video empezó y se deja incompleto, los otros seis requieren un minuto desde que se detuvo. El mismo video puede retomarse de inmediato. Terminarlo permite iniciar otro sin espera. Debajo de los botones se muestra `Espera: 59s`, contando hacia atrás, con Reproducir deshabilitado. Al vencer se habilita únicamente el comienzo manual. Recorrer cuentos o salir de un video ya pausado no reinicia el plazo, que sobrevive a la recarga y al cierre de la app.

La nueva clave es `ian-story-video-last-v1`, con cuento, instante y finalización. Se registra al empezar realmente, durante la reproducción, al pausar/salir y al llegar al final. La comprobación también se realiza en la función de inicio; no depende solo de la interfaz. Se conservan los cinco minutos de reanudación del mismo video y las restricciones de las locuciones. La caché es v180, con el contador revisado en 1098 × 686, 1024 × 600 y 390 × 844.

Se instaló en la A8 sin borrar datos; compañero deshabilitado y kiosco `LOCKED` confirmados. Pasaron los siete videos reales y offline, pausa/reanudación sin aumento de volumen, bloqueo/pantalla, puntos de reanudación y reinicio después de cinco minutos. Se comprobó un minuto real sin cambiar el reloj de Android: cartel 59s, otros videos deshabilitados, mismo video disponible, persistencia tras recargar, salida a Inicio durante la cuenta y habilitación manual al vencer. Terminar otro video permitió cambiar inmediatamente. La vista previa final depuró un marcador de video ya vencido; se repuso desde el registro previo y se dejó la biblioteca abierta. La comprobación separada del cierre confirmó que todos los valores reales de almacenamiento coinciden exactamente con los anteriores.

En navegador se verificaron los seis destinos bloqueados, 59 999 ms frente a 60 000 ms, ausencia de autoplay al habilitar, recarga, navegación sin reiniciar el plazo y cambio inmediato tras un final real. También pasaron las 70 locuciones y los 618 recursos PWA. Los 633 archivos web coinciden con la APK. SHA-256 compilado e instalado: `1001F95D1FDD9FD42F99FA639FBD43CFC91473202F5F92C38913EF62B25BDED6`. Copias de la raíz actualizadas. Evidencias: `tmp/story-video-change-wait/`. Conexiones de prueba cerradas al finalizar.

## Locuciones detenidas al bloquear — 6 de noviembre de 2026

El evento de ocultación llamaba a `stopStoryMedia()`, pero su protección contra cambios de sección retornaba cuando había una locución activa. El puente Android solo detenía los videos. Ahora `suspendStoryMedia()` finaliza primero la locución como interrumpida y después detiene los demás medios; se invoca desde `visibilitychange`, `pagehide` y `StoryVolumePlugin.handleOnPause()`. El audio se silencia antes de pausarlo y de liberar el volumen. Se impide iniciar una voz con la página oculta y se cancela un comienzo nativo que responda después del bloqueo. La navegación manual sigue bloqueada mientras suena la voz con la pantalla encendida.

La interrupción conserva los cinco minutos desde ese momento, cierra el registro pendiente y no añade la escena a las escuchadas completas. Encender la pantalla no reanuda la voz. Las 70 escenas y apoyos pasaron esta regresión local, además de los casos de inicio oculto y respuesta nativa tardía. En la A8 se reprodujo una voz de cada uno de los siete cuentos y ambos apoyos del entrenador, con toques y bloqueo físico: audio pausado y silenciado, posición sin avanzar detrás del bloqueo, controles liberados al regresar y repetición todavía bloqueada. Una prueba suprimió el aviso web de ocultación para comprobar la interrupción desde Android. La comprobación usa un almacenamiento de pruebas en memoria; no borra ni reemplaza las claves reales de Ian. Todos los valores reales antes y después coinciden.

Se instaló la caché v179 sin borrar datos; compañero deshabilitado, app al frente y kiosco `LOCKED` confirmados. Pasaron `verify-stories.mjs`, `verify-stories-device.mjs screen-lock`, los siete videos reales y offline en navegador, y los 618 recursos PWA. Los 633 archivos web coinciden con la APK; SHA-256 compilado e instalado: `2344E99A955F1B35AA59944AAEDAE8963099AA948A6480A8AD862BFB4561EC11`. Copias de la raíz actualizadas. Evidencias: `tmp/story-audio-screen-lock/`. Se cierran las conexiones de prueba al terminar.

## Salto de volumen al pausar videos — 6 de noviembre de 2026

El final de la sesión restauraba inmediatamente el volumen general anterior, que podía superar el 60 %, mientras WebView todavía vaciaba una cola de audio. Los videos ahora solicitan `restoreOnEnd: false`: al pausar, salir, terminar o fallar conservan el volumen aplicado. El elemento se silencia antes de `pause()` y solo habilita el sonido después de confirmar el techo al reproducir. La preferencia se conserva también en la recuperación tras un cierre. Las locuciones mantienen su límite y restauración por defecto.

Se instaló la caché v178 sobre la A8 sin borrar datos; compañero deshabilitado, app al frente y kiosco `LOCKED` confirmados. Los siete videos se probaron con Wi-Fi apagado y toques físicos, partiendo de 15/15 antes de cada cuento. Entre 34 y 38 muestras alrededor de cada pausa conservaron exactamente 9/15, o 8/15 al elegir un volumen menor con el botón físico. Reanudar mantuvo el nivel; los botones físicos siguieron limitados al 60 %. Pasaron también 35 cambios de pestaña sin precarga, salida con descarga de fuente, apagado/regreso sin reproducción automática y reinicio después de cinco minutos. Todos los valores de almacenamiento antes y después coincidieron. Queda completada la revisión física de la descarga de decodificadores que había quedado pendiente el 4 de noviembre.

Pasaron `verify-story-videos.mjs` (siete MP4 offline, silenciamiento antes de pausar, rechazo del puente anterior y reanudación), `verify-stories.mjs` (70 audios y esperas), `verify-pwa.mjs` (618 recursos) y las pruebas JUnit de Android, incluidas nueve de volumen. Los 633 archivos web coinciden byte a byte con la APK. SHA-256 compilado e instalado: `D1F5916E7BBF0EBAFAD0E5FF610AFABD5BF2EC38C79F4DF8EA255B168305B71E`. Copias locales de la raíz actualizadas. Evidencias en `tmp/story-video-volume/`; se cierran las conexiones CDP al terminar.

## Apagado automático reparado — 4 de noviembre de 2026

Se corrigió una bandera residual `FLAG_KEEP_SCREEN_ON` en la vista raíz de Android. La app conserva el plazo de tres minutos y retira únicamente las solicitudes heredadas cuando ninguna vista visible ni la ventana pide mantener la pantalla encendida. Las solicitudes vigentes durante la reproducción siguen funcionando. El historial guardado no contenía una orden permanente de pantalla encendida; se confirmó que conectar el depurador de WebView genera una solicitud temporal que debe liberarse al desconectar.

La regresión nativa `ScreenTimeoutGuardTest` falló en la versión anterior y pasó después de la corrección: reproduce la bandera retenida, la finalización de una solicitud de reproducción y una solicitud explícita de ventana. En la A8 se reprodujo el clip local de cinco segundos y, con toda conexión CDP cerrada, el apagado real ocurrió por `timeout` a los **180006 ms** desde la última actividad. Device Owner y kiosco `LOCKED` conservados; compañero deshabilitado. Los 141 valores de almacenamiento de la comprobación final permanecieron iguales. Un cambio anterior en el banco rotativo de una actividad se correspondió con uso concurrente y se conservó.

La APK de la corrección aislada conservó todos los recursos de la versión anterior y solo cambió el código nativo: SHA-256 `CDB7542B523CA6ECB8BD78FA09E37043B8CE160FC2FBB7FE6D2D5F3352404922`. El arreglo también se conserva al incorporar los videos de cuentos. Detalles de mantenimiento en `TABLET_KIOSCO.md`; evidencias locales en `tmp/screen-timeout/`, excluidas de Git.

## Corrección de «Preparando el video» — 4 de noviembre de 2026

Tras el aviso de Pablo se reprodujo el bloqueo en la A8. El archivo solicitado era local (`https://localhost/assets/stories/.../cuento-completo.mp4`), con metadatos y primeros segundos ya cargados. WebView tenía `PIPELINE_ERROR_DECODE`; el servicio de decodificación informó once instancias y recursos insuficientes. Se corrigió la liberación de los reproductores al salir y la carga anticipada al entrar: fuente diferida hasta Reproducir, guardado del punto antes de descargar el elemento, eliminación de `src` más `load()`, y eliminación de búsquedas redundantes a cero. Se incluyen los clips cortos. El reintento recarga un elemento con error y un inicio que no progresa deja de mostrar preparación después de doce segundos.

Pasaron `verify-story-videos.mjs`, incluidas reproducción de los siete archivos offline, 35 cambios de pestaña sin fuente, descarga de reproductores y recuperación de un comienzo que no responde; también `verify-stories.mjs` y los 618 recursos PWA. Se conservan los cinco minutos, el volumen al 60 %, los datos y la corrección de apagado.

La APK corregida se instaló con `update-tablet.ps1 -Tablet a8 -SkipBuild`: actualización, compañero deshabilitado, app al frente y kiosco `LOCKED` confirmados. Los 633 archivos web coinciden con la compilación. SHA-256 compilado: `417291B5C3E3572C9000D9C85D7C4314F822582E1EFFD0E2839FA5D753B77489`. La A8 se desconectó inmediatamente después: Pablo informó que Ian ya se la había llevado. Quedaron pendientes la lectura del hash instalado y la nueva prueba física con Wi-Fi apagado; no se dan por verificadas a partir de las pruebas de la versión anterior. Evidencias en `tmp/story-videos-fix/`.

## Videos completos en los siete cuentos — 4 de noviembre de 2026

Samsung A8 actualizada con una pestaña **Video** en cada cuento, un cuadro centrado y solo **Reproducir / Pausar**. Los siete MP4 se incluyen localmente y funcionan sin conexión. No hay barra de avance ni volumen, controles de pantalla completa, Picture in Picture o envío a otra pantalla. El primer video se recuperó del enlace de [Argentina.gob.ar](https://www.argentina.gob.ar/educacion/historiasxleer/entrenador); los otros seis son los originales entregados por la familia.

Al salir de la pestaña, cambiar de cuento o sección, ocultar la app o apagar la pantalla, el video se detiene y guarda su punto. Antes de cinco minutos sin reproducir continúa desde allí; al cumplirse cinco minutos, el siguiente inicio manual vuelve al principio. La espera no se muestra y no hay reproducción automática. El punto se conserva por cuento al recargar o cerrar la app. Salir de una pestaña ya pausada no prolonga esos cinco minutos.

El puente Android aplica un máximo real del **60 %** antes de iniciar o reanudar, también para los botones físicos; en la A8 corresponde a **9 de 15** niveles. Se conserva un volumen previo inferior y se libera la sesión al pausar o salir. Las locuciones mantienen sus reglas anteriores y no se mezclan con el video. Se conservan la corrección de apagado de `MainActivity` y `ScreenTimeoutGuardTest`.

Pasaron `verify-stories.mjs` (70 audios), `verify-story-videos.mjs` (siete videos reales, también offline, reanudación tras salir y recargar, frontera 4:59.999 / 5:00.000, cancelaciones y tres tamaños), `verify-pwa.mjs` (618 recursos) y las pruebas JUnit de volumen. En la A8 se probaron los siete videos, pausa/reanudación, cambio de pestaña, botones físicos, apagado y regreso sin autoplay, conservación del punto y reinicio tras cinco minutos. El almacenamiento anterior y posterior coincide exactamente; la revisión no borra lecturas ni esperas.

Instalación sobre la existente con `update-tablet.ps1 -Tablet a8 -SkipBuild`: Device Owner conservado, compañero deshabilitado, app al frente y kiosco `LOCKED`. Los **633 archivos** de `app/` coinciden con la APK; los siete videos suman 116 726 482 bytes. SHA-256 de la APK final: `83821D96A48892AA923A704E6DD3C70DC379142691DE87BA58C9D62757F09AC1`. Evidencias: `tmp/story-videos/`; detalles y fuentes en [CUENTOS_VIDEOS.md](CUENTOS_VIDEOS.md). Las conexiones CDP de la revisión quedan cerradas al terminar.

## Litros con Pac-Man instalados — 3 de noviembre de 2026

Samsung A8 actualizada con tres actividades en **Escuela → Tecnología**: **Llená un litro**, **Botellas que se juntan** y **¿Cabe más o menos?**, de cinco desafíos cada una. Incluyen una explicación repetible de medios y cuartos, trasvases vectoriales paso a paso, chorro, reflejos, gotas, burbujas y niveles enlazados. Pac-Man acompaña el recorrido. Los recipientes pequeños conservan en origen el agua que no cabe; las capacidades de los objetos cotidianos se indican expresamente. No hay audio, límite de tiempo ni avance automático. Se puede deshacer al completar y cambiar las respuestas antes de su única confirmación.

Pasaron `verify-capacity-lab.mjs` (600 partidas, migración y los 15 desafíos), las verificaciones de Tecnología y pesas, las otras catorce verificaciones locales y `verify-pwa.mjs` (610 recursos). En navegador se revisaron 1098 × 686, 1024 × 600 y 390 × 844, conservación del agua durante el movimiento, cuatro cuartos, cancelación al salir, movimiento reducido y recarga offline. Los 625 archivos de `app/` coinciden byte a byte con los incluidos en la APK.

Instalación sobre la existente con `update-tablet.ps1 -Tablet a8 -SkipBuild`, después de comprobar que no hubiese audio en curso. Device Owner conservado, compañero deshabilitado, app al frente y kiosco `LOCKED`. En la A8 se completaron los 15 desafíos con animaciones reales y se verificó el agua restante al medir recipientes pequeños. Sin excepciones; los datos de almacenamiento local y los temas anteriores coinciden con el registro previo a instalar. Primera explicación de **Llená un litro** abierta al finalizar.

Evidencias: `tmp/litres-review/browser-verified.json`, `a8-verified.json`, `a8-before.json`, `apk-verified.json` y capturas de las tres actividades. El SHA-256 instalado coincide con la APK revisada y con las copias de la raíz: `2104BB76290D0E047DE33E31220A262BF8D3B361CBE4AEA6CE90750B792AEEFE`.

## Cinco minutos en todos los audios de cuentos - 30 de octubre de 2026

Samsung A8 actualizada: los **70 audios de los siete cuentos** (56 escenas y 14 apoyos) tienen una espera persistente de **cinco minutos desde el inicio**, independiente por cuento y sección. Se corrigió la excepción de **Antes y ahora** y **La foto** de *El último entrenador*. La comprobación ya no depende de `cooldownAllPanels` en el contenido de cada libro: todos los apoyos válidos reciben su propia clave y el mismo límite común.

Se conserva el bloqueo de controles, cambios de sección y salidas durante la locución. Volver, reiniciar el cuento, cambiar de escena o recargar no permite repetir antes. Al vencer el tiempo se habilita el botón sin iniciar audio. Las esperas anteriores de dos minutos que todavía estén vigentes se trasladan a la versión nueva sumando tres minutos a su vencimiento original; no se reinicia una espera completa ni se reactivan las que ya vencieron. Los datos escolares y el avance mantienen sus claves.

Pasaron `verify-stories.mjs` y `verify-pwa.mjs` (604 recursos). La revisión recorre individualmente las 70 secciones: espera exacta de 300 000 ms, repetición bloqueada hasta 4:59.999, habilitación a 5:00.000, persistencia al volver y vaciar memoria, bloqueo durante la voz e independencia. Incluye migración única de esperas previas, fechas inválidas, fallos de audio y almacenamiento. En navegador se probaron los dos apoyos del entrenador con audio real y final natural, bloqueo, recarga offline, espera todavía activa después de dos minutos y habilitación a los cinco sin autoplay.

Compilación exitosa y 619 archivos de `app/` contrastados byte a byte con la APK. Instalación con `update-tablet.ps1 -Tablet a8 -SkipBuild`, esperando antes el final de cualquier locución: Device Owner conservado, compañero deshabilitado, app al frente y kiosco `LOCKED`. En la A8 se comprobaron los 70 identificadores de sección, la espera persistente de **Antes y ahora**, y dos reproducciones reales completas (**La foto** y una escena del séptimo cuento) con bloqueo y vencimiento a cinco minutos desde el inicio. La primera comprobación se interrumpió al apagarse la pantalla; se despertó la tablet y se completó la revisión respetando la espera ya iniciada, sin borrar límites. Sin excepciones durante la comprobación final. Datos escolares y los siete avances iguales al registro anterior a instalar.

Evidencias en `tmp/story-audio-5min/`: `browser-verified.json`, `a8-verified.json`, `a8-before.json`, capturas de ambos apoyos y `apk-verified.json`. Primera ayuda **Antes y ahora** abierta al finalizar. SHA-256 instalado y copia `Ian-Escuela-debug.apk`: `9B16A756318672669C0D52DA5E4717A831DFF7D418265C1A9EF961AEC5D80C47`.

## Séptimo cuento instalado - 29 de octubre de 2026

Samsung A8 actualizada con **Mis apoyos → Cuentos → Una noche de muchos días**, de Pilar Muñoz Lascano e ilustrado por Sol Cófreces. Se analizaron el PDF completo y el video de 5:54.22. Ocho escenas con ilustraciones originales y diez MP3 locales. Los apoyos **El dragón** y **El ruido** explican la fantasía, los ronquidos y las cintas azules como representación dibujada de la voz. Se conservan el refugio en la cueva, los relatos que duermen al dragón y el regreso con turnos para contar, sin trasladar esa responsabilidad a Ian.

Pasaron `verify-stories.mjs` y `verify-pwa.mjs` (604 recursos), incluidos los ocho límites y dos apoyos del séptimo libro, independencia entre los siete cuentos y persistencia. Revisión visual en 1098 × 686, 1024 × 600 y 390 × 844; audios reales, final natural, bloqueo de cambios, recarga offline con imágenes y audio, espera tras volver y habilitación sin autoplay. Los 619 archivos de `app/` coinciden byte a byte con la APK.

Se esperó el fin de la locución en curso antes de instalar con `update-tablet.ps1 -Tablet a8 -SkipBuild`. Device Owner conservado, compañero deshabilitado, app al frente y kiosco `LOCKED`. En la A8 se verificaron las ocho escenas y sus imágenes, los dos apoyos y tres locuciones reales: escena 3 y ambos apoyos. Los controles y cambios de sección/ruta permanecieron bloqueados hasta el final natural; después volvió la navegación y continuó la espera persistente. No hubo excepciones ni autoplay. Revisión final de imágenes cargadas en la primera escena, la mujer que cuenta y el apoyo de los ronquidos. Primera escena del séptimo libro abierta.

El hash de datos escolares coincide con el registro anterior a instalar. Los seis cuentos anteriores conservan sus claves de avance y los valores permanecieron intactos durante la prueba del séptimo. El avance del quinto cuento cambió entre el registro previo y el inicio de la prueba, mientras se utilizaba la tablet; se conservó su valor actual sin restaurar el anterior. Las diez esperas registradas antes de instalar ya habían vencido al verificarlas; ninguna espera vigente se borró o se acortó. Registro: `tmp/book7-analysis/a8-book7-verified.json`.

Materiales revisados visualmente en `output/pdf/`: resumen ilustrado de una A4 y **Mi rompecabezas de la aldea**, dos A4 con base tenue y cuatro piezas que coinciden en medidas con sus espacios. Impresión al 100 %. El adulto recorta y puede colocar tres piezas para que Ian comience por la que falta; las piezas pueden reforzarse con cartón fino y reutilizarse. Evidencias: `tmp/book7-analysis/browser-verified.json`, `a8-noche.png`, `a8-mujer.png`, `a8-ronquidos.png` y `apk-verified.json`.

SHA-256 instalado y copia `Ian-Escuela-debug.apk`: `8DACF8D3341CA712B7D98973A6632DF854004138A54D5B6BB91F3B2D2029F188`.

## Sexto cuento instalado - 29 de octubre de 2026

Samsung A8 actualizada con **Mis apoyos → Cuentos → La casa del árbol**, de Iris Rivera e ilustrado por Mónica Weiss. Se analizaron el PDF completo y el video. Ocho escenas con ilustraciones originales y diez audios locales. Los apoyos **Hoy y en el plan** y **El agua** distinguen el pino pequeño de la casa imaginada y explican el tanque que vacían los chicos. La casa sigue siendo un proyecto al final del cuento; no se presenta como construida ni se afirma que echar más agua haga crecer rápido al árbol.

Pasaron `verify-stories.mjs` y `verify-pwa.mjs` (583 recursos), incluidos los ocho límites y dos apoyos del sexto libro, independencia entre los seis cuentos y persistencia. Revisión visual en 1098 × 686, 1024 × 600 y 390 × 844; locución real, final natural, imágenes y audios tras recargar offline, espera al volver y habilitación sin autoplay. Los 596 archivos de `app/` coinciden byte a byte con la APK.

Instalación con `update-tablet.ps1 -Tablet a8 -SkipBuild`: Device Owner conservado, compañero deshabilitado, app al frente y kiosco `LOCKED`. En la A8 se verificaron las ocho escenas, los dos apoyos y tres locuciones reales. Todos los botones y cambios de sección/ruta permanecieron bloqueados hasta el final natural; después volvió la navegación y continuó la espera persistente de dos minutos. Sin reproducción automática ni excepciones durante la comprobación. Primera escena del sexto cuento abierta.

El hash de los datos escolares coincide con el registro anterior a la instalación. Los cinco cuentos anteriores conservan sus claves de avance y sus valores quedaron intactos durante la comprobación del sexto. Entre el registro anterior a instalar y la prueba final hubo cambios de avance en tres cuentos, junto con nuevas reproducciones observadas en la tablet; esos valores actuales se respetaron, sin restaurar los anteriores. La espera registrada antes de instalar ya había vencido al comprobarla y no se eliminó ninguna espera vigente. Detalle en `tmp/book6-analysis/a8-book6-verified.json`.

Materiales revisados visualmente en `output/pdf/`: resumen ilustrado de una A4 y **Dos paredes y un techo**, dos A4 con guía visual y base de colocación. Se utilizan dos cajas pequeñas de igual altura y un cartón apoyado sobre ambas, con espacio entre ellas. Ian puede comenzar colocando solamente el techo, con las cajas preparadas por el adulto. La distancia se ajusta a las cajas y al cartón disponibles. Evidencias adicionales: `tmp/book6-analysis/browser-verified.json`, `a8-casa.png` y `a8-plan.png`.

SHA-256 instalado y copia `Ian-Escuela-debug.apk`: `54C1275FE53931D42F0423A81BB703BBE1A37BBDB940A0075A8998E5C5D6383D`.

## Quinto cuento instalado - 29 de octubre de 2026

Samsung A8 actualizada con **Mis apoyos → Cuentos → La vuelta al mundo**, de Javier Villafañe e ilustrado por Estrellita Caracol. Ocho escenas con ilustraciones originales y diez audios locales. Los apoyos **El recorrido** y **La ayuda** explican la vuelta a una manzana de casas y la colaboración de la jirafa con la hormiga. El charco como río y la vuelta al mundo se presentan como parte del juego imaginativo, conservando el regreso a casa. El esquema del recorrido es una ilustración nueva del concepto, con un circuito cerrado.

Pasaron `verify-stories.mjs` y `verify-pwa.mjs` (561 recursos), incluidos los ocho límites y dos apoyos del quinto libro, la independencia entre los cinco cuentos y la persistencia. Revisión visual en 1098 × 686, 1024 × 600 y 390 × 844; locución real, final natural, recarga offline, espera tras volver y habilitación sin autoplay. Los 572 archivos de `app/` coinciden byte a byte con la APK.

Instalación con `update-tablet.ps1 -Tablet a8 -SkipBuild`: datos y Device Owner conservados, compañero deshabilitado, app al frente y kiosco `LOCKED`. En la A8 se verificaron las ocho escenas, las imágenes de los dos apoyos y tres locuciones reales. Todos los botones y cambios de sección/ruta quedaron bloqueados hasta terminar cada locución; después volvió la navegación y continuó la espera. El hash de datos escolares y los avances de los cuatro libros anteriores coinciden con el registro previo. Primera escena del quinto libro abierta, sin reproducción automática ni excepciones durante la comprobación.

Materiales revisados en `output/pdf/`: resumen de una A4 y **Mi molino de papel**, dos A4 con base, círculo de aspas y guía para unir con broche mariposa. El adulto prepara el material e Ian puede girar el borde con un dedo, siguiendo una aspa naranja. Se puede empezar con un solo movimiento. La guía aclara que esta maqueta se mueve con la mano. Imprimir al 100 %. Evidencias en `tmp/book5-analysis/`, incluidos `a8-book5-verified.json`, `a8-recorrido.png`, `a8-vuelta.png` y `browser-verified.json`.

SHA-256 instalado y copia `Ian-Escuela-debug.apk`: `355332B546A8BD38FF496A80270E988C728E47271576856E32A6F438D6DB5B3F`.

## Cuarto cuento instalado - 28 de octubre de 2026

Samsung A8 actualizada con **Mis apoyos → Cuentos → Mocho y el espantapájaros**, de Álvaro Yunque e ilustrado por María Jesús Álvarez. Ocho escenas con las ilustraciones originales, diez MP3 locales y apoyos **El muñeco** y **El sueño**. La persecución se identifica como una pesadilla desde el título y la primera frase de esa escena. Cada escena y apoyo conserva la espera de dos minutos desde el inicio y el bloqueo de cambios durante la voz.

Pasaron `verify-stories.mjs` y `verify-pwa.mjs` (540 recursos), incluidos los ocho límites y dos apoyos nuevos, independencia entre los cuatro libros, persistencia y conservación de datos. Revisión visual en 1098 × 686, 1024 × 600 y 390 × 844; audios reales, fin natural, recarga offline y habilitación sin autoplay. Los 549 archivos de `app/` coinciden byte a byte con la APK.

Instalación mediante `update-tablet.ps1 -Tablet a8 -SkipBuild`: Device Owner conservado, compañero deshabilitado, app al frente y kiosco `LOCKED`. En la A8 se comprobaron las ocho escenas, las imágenes de los dos apoyos y tres locuciones reales. Todos los botones y cambios de sección/ruta permanecieron bloqueados hasta terminar; después volvió la navegación y continuó la espera. El hash de los datos escolares y el avance de los tres cuentos anteriores coinciden con el registro previo. Primera escena del cuarto libro abierta, sin reproducción automática. Apareció el aviso de inicio de Capacitor ya observado anteriormente (`triggerEvent`); no hubo excepciones durante el recorrido verificado.

Materiales revisados en `output/pdf/`: resumen ilustrado de una A4 y **Mi espantapájaros de masa**, dos A4 con plantilla geométrica grande y guía visual. Se propone colocar una bolita y dos rollitos, comenzando por una sola pieza si resulta más cómodo. Evidencias: `tmp/book4-analysis/a8-book4-verified.json`, `a8-voice-locked.png`, `a8-mocho.png` y `browser-verified.json`.

SHA-256 instalado y copia `Ian-Escuela-debug.apk`: `580A6DC57D702DF7E3802091FA32364100FBF65CB5330BEFC97984A21B06D0EB`.

## Tercer cuento instalado - 28 de octubre de 2026

Samsung A8 actualizada con **Mis apoyos → Cuentos → Ratita Gris y Ratita Azul**, de Edith Vera e ilustrado por Eleonora Arroyo. Se analizaron el PDF completo y su video. Ocho escenas con ilustraciones originales, diez audios locales y apoyos **Las ratitas** y **El huevo**. Cada escena y apoyo mantienen los dos minutos de espera desde el inicio y el bloqueo de cambios hasta que termina la voz. Se conservan el primer y segundo cuento y sus claves de avance y espera.

Pasaron `verify-stories.mjs` y `verify-pwa.mjs` (519 recursos), incluidos los ocho límites y dos apoyos del tercer libro y la independencia entre los tres cuentos. Revisión de pantalla en 1098 × 686, 1024 × 600 y 390 × 844; voz real, final natural, bloqueo, persistencia tras recargar sin conexión, habilitación sin autoplay e imágenes locales. Los 526 archivos de `app/` coinciden byte a byte con la APK. El registro previo de datos y avance de la A8 está en `tmp/book3-analysis/a8-before-book3.json`.

Instalación completada con `scripts/update-tablet.ps1 -Tablet a8 -SkipBuild` tras reconectar la A8. Datos y Device Owner conservados, compañero deshabilitado, app al frente y kiosco `LOCKED`. La versión instalada coincide con el hash de la APK revisada. En la tablet se verificaron las ocho imágenes y la visibilidad del avance, ambos apoyos y tres locuciones reales: una escena y los dos apoyos. Durante las locuciones se rechazaron los cambios de sección, salida y nuevos renderizados; al terminar volvió la navegación y se mantuvo la espera. El hash de los datos escolares y el avance de los dos libros anteriores coinciden con el registro tomado inmediatamente antes de instalar. Primera escena del tercer cuento abierta, sin autoplay ni errores durante la comprobación. Evidencias: `tmp/book3-analysis/a8-book3-verified.json`, `a8-voice-locked.png` y `a8-ratitas.png`.

Materiales revisados visualmente en `output/pdf/`: resumen de una A4 y actividad **Llevo al pichón con su mamá**, con tablero y ficha móvil en dos A4 horizontales, para imprimir al 100 %. La ficha cabe en los tres lugares y la mamá permanece visible junto al lugar final. Evidencias y preparación: `tmp/book3-analysis/` y `tmp/pdfs/build-ratitas-materials.py`.

SHA-256 instalado y copia `Ian-Escuela-debug.apk`: `F5ED0E5977B9AE57337C27D91BEDF80CA7AFD333F5B75B61717585242F0877FF`.

## Segundo cuento y material para papel - 28 de octubre de 2026

Samsung A8 actualizada con **Mis apoyos → Cuentos → Carnaval en el zoo**, de Fabián Sevilla e ilustrado por Mariano Epelbaum. Ocho escenas con frases breves, ilustraciones originales y diez audios locales. Los apoyos **El disfraz** y **En el cuento** explican el mismo animal bajo su disfraz y la fantasía del hipopótamo volador. No se agregó un clip cuyo movimiento leve no aportaba una acción explicativa.

Cada escena y cada apoyo de este segundo libro permiten una locución cada dos minutos desde el inicio, con espera persistente e independiente por cuento y sección. Mientras habla, los botones y cambios de ruta permanecen bloqueados hasta el final o un error. No hay reproducción automática. Se conserva el primer libro con sus apoyos, su avance y sus límites existentes.

Pasaron `verify-stories.mjs` y `verify-pwa.mjs` (493 recursos offline), incluida la independencia entre libros, los ocho límites nuevos y ambos apoyos. Revisión visual en 1098 × 686, 1024 × 600 y 390 × 844; reproducción real, final natural, recarga sin conexión, persistencia y habilitación sin autoplay. Los 498 archivos de `app/` coinciden byte a byte con la APK. Instalación con `update-tablet.ps1 -Tablet a8 -SkipBuild`: Device Owner conservado, compañero deshabilitado, app al frente y kiosco `LOCKED`.

En la A8 se verificaron las ocho imágenes y la visibilidad del avance, los dos apoyos y tres locuciones reales (una escena y ambos apoyos). Durante esas locuciones todos los controles quedaron deshabilitados y los cambios directos de sección/ruta no interrumpieron el audio. Al finalizar volvió la navegación y continuó la espera. El hash de los datos escolares y el avance del primer libro coinciden con el registro tomado inmediatamente antes de actualizar. Primera escena del segundo cuento abierta, sin autoplay; ninguna excepción de ejecución en la prueba final.

Se generaron y revisaron visualmente dos PDFs: un resumen ilustrado de una A4 y **El teatro del león**, dos A4 con base y solapa de disfraz de medidas coincidentes. La actividad se imprime al 100 %. Están en `output/pdf/`; las evidencias de tablet, navegador y APK están en `tmp/book2-analysis/`.

SHA-256 instalado y copia `Ian-Escuela-debug.apk`: `95E9EB45FACF05C8B79BEB8FDA11440452169CBBCD027FA9028AA8BE788B6B00`.

## Cuento: espera de voz y bloqueo durante la locución — 28 de octubre de 2026

Samsung A8 actualizada con una espera de **dos minutos por cada una de las ocho escenas**, contada desde el inicio de la reproducción. La espera se conserva por cuento y escena al salir, reiniciar el cuento o cerrar la app. **Escuchar en m:ss** indica cuándo se puede repetir y no reproduce automáticamente al vencer. Un fallo antes de empezar permite reintentar; detener o cambiar de parte no reinicia el límite.

Mientras suena cualquier locución del cuento, incluidos los dos apoyos, todos los botones quedan deshabilitados. También se bloquean los cambios de ruta y los nuevos renderizados para evitar interrupciones desde otras acciones de la app. No se ofrece **Parar audio**. La navegación vuelve al terminar naturalmente la voz, o si el reproductor informa un error; la espera de la escena sigue vigente después de una reproducción iniciada.

Pasaron las quince verificaciones. Se probaron las ocho esperas independientes, los límites temporales exactos con reloj controlado, persistencia, almacenamiento no disponible, errores y liberación del bloqueo. En navegador se comprobó la finalización real del audio, el bloqueo de todos los botones, retorno del avance, recarga offline y habilitación automática sin reproducir al vencer. Los 475 archivos de `app/` coinciden con los de la APK.

Instalada con `update-tablet.ps1 -Tablet a8 -SkipBuild`. En la A8 se verificó una locución completa, bloqueo de todos los controles y de los intentos de navegación, finalización natural, retorno de la navegación y conservación del límite al salir y volver. Se respetaron las esperas ya generadas por el uso real. Datos escolares conservados, compañero deshabilitado y kiosco `LOCKED`. Sin excepciones durante la prueba directa. Primera escena abierta al terminar.

SHA-256 de la APK instalada igual al de la compilación verificada: `4AA4819C1D6ADB3ED8575D793E94D31E1C95A3F5F757D1D57D5FD77A0E0C9E8C`. Copia actualizada en `Ian-Escuela-debug.apk`. Evidencias: `tmp/book1-analysis/a8-voice-verified.json`, `a8-voice-locked.png` y `a8-voice-wait.png`.

## Cuento con menos controles — 28 de octubre de 2026

Samsung A8 actualizada a pedido de la familia: se quitó por completo la franja inferior con **Anterior**, **Pausa** y **Ayuda**, y se retiró **Repaso** del contenido y de la navegación. **Siguiente** está dentro del panel de texto. Las ayudas **Antes y ahora** y **La foto** conservan su retorno al cuento dentro del mismo panel. La última escena ofrece **Leer desde el principio**. Los créditos se muestran en la biblioteca.

Pasaron las quince verificaciones y la revisión en 1098 × 686, 1024 × 600 y 390 × 844; se mantuvo el funcionamiento offline de voz y video. Se contrastaron los 475 archivos de `app/` con la APK antes de instalar. Instalación con `update-tablet.ps1 -Tablet a8 -SkipBuild`, datos escolares conservados, compañero deshabilitado y kiosco `LOCKED`. En la A8 se comprobaron las ocho escenas, la ausencia de los controles retirados, la posición y accesibilidad de **Siguiente**, los dos apoyos y el retorno al inicio. Sin excepciones durante la comprobación directa.

La familia señaló que el movimiento del video es imperceptible. Se compararon fotogramas del recorte: el entrenador mantiene la misma postura mientras cambia el fondo. Esta actualización simplifica los controles; no agrega una animación nueva de los personajes.

SHA-256 de la APK instalada igual al de la compilación verificada: `BD9D2B33A471D389E2C83DB58F93C6C5BA9288D8E8AC77E49E5FB7F3DF991EE5`. Copia actualizada en `Ian-Escuela-debug.apk`. La primera escena quedó abierta. Evidencias: `tmp/book1-analysis/a8-simple-verified.json` y `a8-simple.png`.

## Primer cuento adaptado — 28 de octubre de 2026

Samsung A8 actualizada con **Mis apoyos → Cuentos → El último entrenador**. Incluye ocho escenas con las ilustraciones originales del PDF familiar, narración argentina a elección, **Antes y ahora**, **La foto**, repaso de tres preguntas sin puntajes y un clip silencioso de cinco segundos en la segunda escena. Avance manual, pausa, ayuda, retorno y lectura desde el principio. El último paso leído se conserva en una clave propia; no modifica los datos escolares. Recursos locales para uso sin conexión.

Pasaron las quince verificaciones de `scripts/verify-*.mjs`, incluidos los 472 recursos offline. Revisión visual y de interacción en 1098 × 686, 1024 × 600 y 390 × 844. Se comprobaron voz y video después de recargar sin conexión, reproducción parcial del MP4 desde el caché, interrupción de voz/video al salir o pausar, reintentos del repaso y movimiento reducido. Los 475 archivos de `app/` coinciden byte a byte con los incluidos en la APK.

Instalación con `update-tablet.ps1 -Tablet a8 -SkipBuild`, sobre la instalación existente. En la A8 se verificaron las ocho escenas, los dos apoyos, pausa y retorno, las tres preguntas con reintentos, voz y video. Los datos escolares coinciden con el estado registrado antes de actualizar; Device Owner, compañero deshabilitado y kiosco `LOCKED` conservados. DevTools mostró el aviso anterior de Capacitor (`triggerEvent` al inicio) y ninguna excepción nueva durante la prueba final. La primera escena quedó abierta, sin reproducción automática.

SHA-256 de la APK instalada igual al de la compilación verificada: `6DEE7F28FEC0D7A6B050D3573582DEF6EE052D321EEF6CBE7C55E473FFCE9864`. Copia actualizada en `Ian-Escuela-debug.apk`. Evidencias y comprobaciones locales: `tmp/book1-analysis/`.

## Cambio de practicantes en la parroquia — 28 de octubre de 2026

Samsung A8 actualizada con **El cambio**, la cuarta sección dentro de las seis partes de **Mis apoyos → Visita a la parroquia**. Representa un grupo de practicantes compartiendo una actividad, su despedida y la llegada de otro grupo. La foto de la parroquia permanece visible como referencia. Avance manual, repetición y mensajes **Chau**, **Necesito un momento** y **¿Qué hacemos ahora?**; mostrar un mensaje y volver conserva el paso. El repaso diferencia el cambio de grupo del final de la visita, que explica el adulto.

Verificadas las seis partes, los tres pasos del cambio, cinco mensajes generales en cada parte, ayudas contextuales, límites, salida, retorno, reinicio y los 447 recursos offline. Revisión visual e interacción en 1098 × 686 y 1024 × 600; apoyos y navegación también accesibles en 390 × 844. APK contrastada con los archivos finales antes de instalar. Instalación con `update-tablet.ps1 -Tablet a8 -SkipBuild`: app al frente, Device Owner conservado, compañero deshabilitado y kiosco `LOCKED`. SHA-256 de la APK instalada igual al de la compilación verificada: `D3DA321E59817886730EADC5B47CC4927C8FB48EA08C29E4DA34A1A18D60293A`.

## Memoria con amigos — 28 de octubre de 2026

Samsung A8 actualizada con **Mis apoyos → Memoria con amigos**. Incluye los seis personajes inspirados en la imagen de referencia, de pie, con partidas de 2, 4 y 6 parejas. Tarjetas grandes, mezcla nueva en cada partida, aciertos visibles, ayuda para mirar las cartas, pausa y movimiento reducido. Las parejas distintas permanecen visibles hasta tocar **Seguir buscando**. Sin audio, reloj ni penalizaciones; recursos incluidos para uso sin conexión.

Verificados 360 mazos, partidas completas y controles de ayuda, pausa, navegación, doble toque y reinicio. Pasaron las verificaciones de actividades existentes y los 447 recursos offline. Revisión en navegador con teclado, mouse y formatos horizontal, vertical y pantalla pequeña. Los 448 archivos de `app/` coinciden byte a byte con los empaquetados en la APK.

Instalación con `update-tablet.ps1 -Tablet a8 -SkipBuild`, sobre la instalación existente, conservando datos y Device Owner. Compañero deshabilitado, app al frente y kiosco `LOCKED` confirmados. La APK instalada coincide con la compilación verificada: SHA-256 `B2F2B49398B47301643405F66350A3C781870BB38C8BC70557C34BB08F5A294C`. La comprobación en la tablet fue de instalación, coincidencia de APK y estado del kiosco; las partidas se probaron previamente en navegador. Copia actualizada en `Ian-Escuela-debug.apk`.

## Visita a la parroquia — 26 de octubre de 2026

Samsung A8 actualizada con **Mis apoyos → Visita a la parroquia** para anticipar el encuentro con profesores de Educación Física de la UCASAL en la Medalla Milagrosa. Incluye foto real de la fachada, exploración de detalles, recorrido visual, tarjetas sobre los profesores, cuatro mensajes para el acompañante y repaso final. Explica que las actividades concretas se conocerán allí. Recursos locales, avance manual y funcionamiento sin conexión.

Instalación con `update-tablet.ps1 -Tablet a8 -SkipBuild`, conservando datos y Device Owner. Compañero deshabilitado, app al frente y kiosco `LOCKED` confirmados. El SHA-256 de la APK instalada coincide con la compilación verificada: `FBC02CAC0D216C5004DD4A0816A4F9647EF23A1E2639A4862C120748417CED3A`. La navegación y el diseño se comprobaron previamente en navegador; esta actualización se verificó en la tablet mediante instalación, coincidencia de APK y estado del kiosco.

## Nuevos mundos de Pac-Man — 26 de octubre de 2026

Samsung A8 actualizada con una aventura nueva al principio de cada materia: **El portal de los opuestos**, **Expedición animal**, **Los amigos del barrio**, **El tren de los números**, **Pac-Man in action** y **La fábrica de las cerezas**. Cada una genera cinco desafíos, con bancos rotativos, controles grandes, respuestas editables antes de comprobar, confirmación única, explicaciones y avance manual. Animaciones breves y silenciosas: Pac-Man come puntos y una cereza, los animales llegan a su ambiente y hay festejos específicos de cada materia. Se respeta movimiento reducido.

Pasaron las once verificaciones de actividades y recursos offline, incluidas 480 partidas nuevas y seis recorridos completos. Revisión visual e interacción en 1097 × 686, 1024 × 600 y 390 × 844, sin errores de JavaScript ni desbordes horizontales. Los controles de ambas resoluciones de tablet quedan dentro de la pantalla. Los 441 archivos de `app/` coinciden byte a byte con los empaquetados en la APK; el caché incluye 440 recursos.

Instalación con `update-tablet.ps1 -Tablet a8 -SkipBuild`: app al frente, Device Owner conservado, compañero deshabilitado y kiosco `LOCKED`. Comprobación directa en el WebView de la A8 (1098 × 686): treinta desafíos, con aciertos y errores en las seis aventuras, y conservación de ajustes y todos los temas anteriores. Se dejó abierta **Escuela**. El SHA-256 de la APK instalada coincide con la compilación verificada: `3e9d497f2b27cda5c5a995c2e11c0416c72a8d459001278d42b117319e0cfb9c`.

## Campo en Ciencias Sociales — 25 de octubre de 2026

Samsung A8 actualizada con **El campo: las vacas y sus cuidados**, primero en Ciencias Sociales. Incluye tres estaciones y diez pasos con las fotos aportadas por la familia: reconocer la llanura, señalar pasto y agua, relacionar alimentación y cuidados, y pegar dos vacas y una persona sobre el campo. Pac-Man acompaña el recorrido; no hay sonidos ni reloj. Avance manual, respuestas editables antes de comprobar y reintentos con explicación, conservando el primer intento.

Verificados el recorrido completo, respuestas incorrectas, doble toque, uso único de figuras, colocación táctil y por teclado, migración sin duplicados ni pérdida de temas y todos los controles en 1097 × 686, 1024 × 600 y 390 × 844. Pasaron las nueve verificaciones anteriores y los 438 recursos offline. Los 439 archivos de `app/` coinciden con los empaquetados en la APK. Instalación con `update-tablet.ps1 -Tablet a8 -SkipBuild`: app al frente, datos y Device Owner conservados, compañero deshabilitado y kiosco `LOCKED`. SHA-256 de la APK instalada igual a la compilación verificada: `96f6389c76ecece87635c04bd7844826cd363988452bcf74e306db2ca955452c`.

## Pesas en Tecnología — 26 de octubre de 2026

Samsung A8 actualizada con **Completá un kilo**, **La balanza de Pac-Man** y **Los pedidos de Pac-Man**, junto al taller de peso que ya estaba en Tecnología. Son tres actividades de cinco desafíos cada una. Se conservan los tamaños de cada pesa entre referencias, objetivos, selecciones y platos: 1 kg, 76 × 96 px; 1/2 kg, 61 × 77 px; 1/4 kg, 47 × 60 px. Se aceptan combinaciones alternativas correctas. Pac-Man come puntos, las pesas caen al agregarlas y los platos se inclinan después de comprobar, sin escalar las pesas ni reproducir sonido.

Pasaron la nueva verificación de pesas (300 partidas y combinaciones alternativas) y las doce verificaciones anteriores, incluidos 445 recursos offline. Revisión visual y de interacción en 1097 × 686, 1024 × 600 y 390 × 844; medidas de todas las pesas verificadas, botones de avance dentro de las pantallas de tablet y movimiento reducido comprobado. Los 446 archivos de `app/` coinciden con los empaquetados en la APK.

Instalada con `update-tablet.ps1 -Tablet a8 -SkipBuild`. Prueba directa en la A8 de los quince desafíos, con aciertos y errores, sin errores nuevos durante el recorrido. DevTools reprodujo un aviso anterior al inicio de la prueba del puente de Capacitor (`triggerEvent` antes de estar disponible); no volvió a aparecer durante los ejercicios. Se conservaron ajustes, todos los temas anteriores, Device Owner, compañero desactivado y kiosco `LOCKED`. La app quedó abierta en **Completá un kilo**, lista para empezar. El SHA-256 de la APK instalada coincide con el de la compilación verificada: `068f41fbee88cfae0bfafaf245487026110077ac05190e7b3fed0078ea30797d`. Copia de la APK actualizada en `Ian-Escuela-debug.apk`. Evidencias locales: `tmp/weight-review/`.

## Cómo actualizar

Desde la carpeta del proyecto, conectar la tablet correspondiente y ejecutar:

```powershell
npm run tablet:update:ulefone
npm run tablet:update:a8
```

Ejecutar solamente la línea del equipo conectado. Cada comando verifica su serie y Device Owner, incorpora los ejercicios de `app/`, compila, instala con `-r` y verifica kiosco `LOCKED`. Para usar la APK ya compilada, agregar `-- -SkipBuild`. No desinstalar ni borrar los datos de la app.

## Mantenimiento adulto

```powershell
npm run tablet:maintenance -- -Tablet ulefone -Action status
npm run tablet:maintenance -- -Tablet ulefone -Action settings
npm run tablet:maintenance -- -Tablet ulefone -Action resume
```

`settings` pausa el kiosco y abre Ajustes; permite gestionar Wi-Fi, SIM y datos. `resume` lo reactiva. Usar `a8` en lugar de `ulefone` para la Samsung. La actividad de recuperación exige el permiso de Android `DUMP`, disponible para la computadora autorizada; otra app común no puede abrirla.

No hay PIN de salida dentro de la app. Se conserva el acceso adulto desde la PC por USB. Debe estar autorizada con «Permitir siempre desde esta computadora». No revocar esa autorización ni borrar las llaves.

## Llaves y recuperación

Originales: `C:\Users\pablo\.android\adbkey`, `adbkey.pub` y `debug.keystore`.

Respaldo del 6 de octubre de 2026: `C:\Users\pablo\Documents\Ian Escuela - Recuperacion\2026-10-06`.

- `llaves-cifradas.json`: contiene las tres llaves cifradas con AES-256-GCM; la creación comprueba que se pueden descifrar correctamente.
- `CLAVE-DE-RECUPERACION.txt`: clave para abrir ese respaldo. Guardarla también en un gestor de contraseñas, separada de la copia externa del respaldo.
- `restaurar-llaves.mjs`: recupera los archivos en una carpeta elegida, nunca sobrescribe los existentes.
- `huellas.json`: permite comprobar que las llaves no cambiaron.

La carpeta está restringida al usuario de esta PC y SYSTEM. La contraseña del respaldo no es una contraseña del kiosco. El respaldo no contiene la clave de OpenAI. La firma debug actual debe preservarse para seguir actualizando la A8 y la Ulefone.

## Activación del compañero

La APK trae la interfaz, pero la activación y credencial se guardan por instalación en el directorio privado `no_backup`. No se incluyen en la APK ni se copian mediante el respaldo automático de Android. El puente nativo mantiene la credencial fuera de JavaScript y de localStorage. Sin activación, no aparece el botón y se rechazan las llamadas de voz.

`scripts/configure-companion-tablet.mjs --tablet=ulefone --endpoint=https://DOMINIO` provisiona solamente la serie registrada de la Ulefone. Requiere kiosco configurado. Para la A8, `--tablet=a8` siempre deshabilita el compañero. Las actualizaciones sobre la instalación existente conservan la activación de la Ulefone.

La credencial del servidor se guarda localmente en `.companion-device.json`, excluido de Git. La clave de OpenAI queda en `.env` local o en las variables del servicio de Railway; nunca en Android.

## Servicio de voz

El proyecto de Railway «Ian Compañero Voz» aloja solamente la API, sin publicar la app escolar. Se prepara mediante `npm run companion:cloud:prepare`, que copia únicamente una lista explícita de archivos a `.companion-deploy`. Esa carpeta excluye claves y datos escolares. Variables requeridas: `OPENAI_API_KEY` y `COMPANION_DEVICE_TOKEN`.

Servicio: `voz`. URL: `https://voz-production-30a8.up.railway.app`.
Panel: <https://railway.com/project/090df0f8-fe0f-42a9-953b-5d01fb59692e/service/a289ffff-ab95-40be-a5a3-1d3e9119cb3f>.
La credencial y clave de OpenAI ya se cargaron en `production`. La APK se comunica con este servicio por HTTPS; no necesita el servidor local ni el túnel USB.

Para desplegar una actualización del servidor desde esta PC autenticada, después de preparar la carpeta:

```powershell
npx --yes @railway/cli up .companion-deploy --path-as-root --no-gitignore --service voz --environment production --project 090df0f8-fe0f-42a9-953b-5d01fb59692e --detach
```

El argumento debe seguir apuntando exclusivamente a `.companion-deploy`, nunca a la raíz que contiene `.env`. Revisar que termine en `SUCCESS` y que `/health` responda 200. Si cambia la credencial del servidor, volver a provisionar la Ulefone.

El servicio requiere la credencial de la Ulefone, limita a una sesión simultánea, no reintenta automáticamente una creación y cierra por límite de tres minutos o pérdida de latidos. El endpoint `/health` es público y no crea sesiones. Abrir la app o consultar su configuración no consume una sesión de OpenAI; pulsar «Quiero hablar» sí.

La Ulefone necesita Internet para la voz, tanto por Wi-Fi como por datos. Los ejercicios y recursos locales siguen funcionando sin Internet. El modo kiosco no desactiva las conexiones.

## Actualización del 7 de octubre de 2026

Samsung A8 actualizada con Tecnología y sus cuatro talleres independientes de peso, instrumentos, unidades y regla. Se conservaron los datos y Device Owner; la verificación final confirmó Ian Escuela al frente y kiosco `LOCKED`. Compañero de voz deshabilitado. Probados 600 tableros, la migración de materias y el bloqueo de respuestas; revisión visual a 1097 × 686 (resolución lógica de la A8 con densidad 280) y en pantalla angosta. El actualizador ahora reconoce también `ResumedActivity:` al comprobar la actividad al frente.

## Actualización del 13 de octubre de 2026

Samsung A8 actualizada con las cinco actividades del club de las misiones en Lengua: escenas de acciones, reparación de oraciones, palabras sueltas, selección de ingredientes y secuencias de preparación. Aparecen primero en Lengua también en instalaciones anteriores. Sin sonidos ni voces; respuestas editables antes de confirmar y bloqueadas después. Bancos rotativos de 12 escenas, 8 recetas y 6 secuencias. Verificadas 600 partidas y los cinco recorridos con respuestas correctas e incorrectas, migración sin pérdida de temas, fichas repetidas y ausencia de reproducción de audio. Revisión visual a 1097 × 686 y 390 × 844. APK compilada y recursos contrastados con los originales antes de instalar. Instalación sobre la existente; datos y Device Owner conservados, compañero deshabilitado y kiosco `LOCKED` confirmado por el actualizador.

## Actualización del 15 de octubre de 2026

Samsung A8 actualizada con una actividad de Pac-Man nueva en cada una de las seis materias. Cada actividad genera cinco desafíos: sujeto y predicado, materiales, secuencias de sonidos escritos, multiplicación, vocabulario de útiles en inglés y medición de un puente. Respuestas editables antes de comprobar, una sola confirmación por desafío, explicaciones y festejos animados al acertar. Se verificaron 360 partidas generadas y los seis recorridos completos, además de migración, doble toque y conservación de los ejercicios anteriores. Revisión visual en 1097 × 686; compilación e instalación sobre la existente completadas, app al frente y kiosco `LOCKED` confirmados. La captura adicional de la tablet no se ejecutó por un fallo del servicio de revisión automática de permisos; no afectó la instalación.

## Familia en Inglés — 15 de octubre de 2026

La Samsung A8 recibió tres actividades al principio de Inglés: árbol de Ian, reconocimiento de ocho palabras y singular/plural. Incluyen diez fotos familiares originales y ocho audios locales con Elena (`es-AR-ElenaNeural`, -12%), la voz de los atajos. Las repeticiones comparten los límites progresivos de Me comunico por palabra, incluso entre actividades y después de salir.

Verificadas 200 partidas generadas, cuatro recorridos correctos/incorrectos, migración, doble toque, pausas, persistencia, reloj y errores de reproducción. También pasaron las verificaciones existentes de Me comunico, Pac-Man, Lengua y Tecnología y los 429 recursos PWA. Revisión visual en 1097 × 686 y 390 × 844, incluida reproducción local. Los 23 archivos relevantes de la APK se contrastaron con los originales (diez fotos y ocho MP3 incluidos). Instalación sobre la existente con `update-tablet.ps1 -Tablet a8 -SkipBuild`: app al frente, kiosco `LOCKED`, Device Owner conservado y compañero deshabilitado. El SHA-256 de la APK instalada coincide con la compilación verificada.

Corrección posterior del mismo día: el abuelo es materno y se movió a la rama de mamá, junto a la abuela materna. Camilo y Aimar quedaron debajo de papá; Iara y María debajo de mamá; Ian continúa al centro. Se actualizó la A8 con esa distribución, se verificaron las actividades de familia y los recursos offline, y el actualizador confirmó la app al frente y kiosco `LOCKED`.

## Tierra con Pac-Man — 19 de octubre de 2026

Samsung A8 actualizada con **La Tierra: donde vivimos** en Ciencias Naturales. Sin fotos personales: escena ilustrada del suelo y la superficie, alejamiento animado, apertura y cierre del modelo, exploración de tres grandes capas y subdivisión del núcleo en externo e interno. Incluye seis desafíos con ubicaciones, nombres y diagramas en otros colores; avance manual, respuesta editable hasta comprobar y regreso a la exploración sin perder el desafío. Animaciones finitas con GSAP, cancelables al salir y compatibles con movimiento reducido. Se verificaron el recorrido completo, 720 desafíos generados, migración, ayudas, bloqueo y doble toque; pasaron las verificaciones existentes de Familia, Lengua, Tecnología, Escuela y los 431 recursos PWA. Revisión visual en 1097 × 686 y 390 × 844, incluida la posición del marcador después de animarse y la separación de los botones circulares. APK compilada e instalada sobre la existente con el actualizador; datos y Device Owner conservados, compañero deshabilitado, app al frente y kiosco `LOCKED` confirmados.

Corrección posterior de **La Tierra**: la explicación al comprobar ya no agranda la tarjeta ni desplaza el avance. Se reserva espacio para la devolución, el modelo se adapta a la altura disponible y la navegación ocupa una fila fija. Verificados los seis errores en 1097 × 686 y los seis aciertos en 1024 × 600, midiendo la posición del botón antes y después. Todos los modelos conservan color, degradados y texturas de agua, vegetación, roca y metal; casas y escuela incorporan detalles de ladrillos y tejas. Se retiraron los diagramas grises de la práctica. Se compiló e instaló la actualización en la A8 conservando datos y Device Owner, con la app al frente y el kiosco `LOCKED`.

## Nuevas aventuras de Pac-Man — 20 de octubre de 2026

Samsung A8 actualizada con una actividad nueva por materia, con cinco desafíos cada una: **La fábrica de palabras** (sílabas), **El jardín de Pac-Man** (partes y funciones de la planta), **Una vuelta por el barrio** (lugares y servicios), **La merienda de los fantasmas** (reparto en partes iguales), **Where is Pac-Man?** (posiciones en inglés) y **Programá a Pac-Man** (secuencias de instrucciones). Las respuestas se editan antes de comprobar; el avance es manual y las escenas tienen animaciones breves compatibles con movimiento reducido.

Verificadas 90 partidas generadas, los 30 desafíos completos y las pruebas de las actividades anteriores; 433 recursos offline disponibles. APK compilada con la firma existente; los 11 archivos principales se contrastaron con el contenido de `app/` antes de instalar. Actualización mediante `update-tablet.ps1 -Tablet a8 -SkipBuild`, conservando datos y Device Owner. App al frente, compañero deshabilitado y kiosco `LOCKED` confirmados. La APK instalada coincide con la compilación verificada: SHA-256 `D56AD9CA569706B37817526B5E0BA67A09DBEA245CF790FB75A1AEEA6ECC97EA`.

## Comprobaciones del 6 de octubre de 2026

- A8 actualizada con la misma APK verificada y los ejercicios nuevos, conservando los datos y Device Owner. Compañero explícitamente desactivado (`enabled: false`) y sin credencial de voz en la tablet; app al frente y kiosco `LOCKED`.
- Ulefone instalada y registrada como Device Owner sin restablecer ni borrar datos.
- Kiosco `LOCKED`, Ian Escuela como HOME y actividad al frente; brillo `178/255`, apagado `180000 ms`.
- Pausa comprobada en `NONE`; reanudación comprobada en `LOCKED`.
- Reinicio completo: volvió sola a Ian Escuela y conservó kiosco y activación de voz. Esperar a que Android termine de abrir HOME después de `sys.boot_completed`; ese indicador aparece unos segundos antes que la app.
- Servicio real: `/health` responde 200, configuración sin credencial 401, configuración autorizada 200 con voz disponible y límite de 180 segundos.
- Clave con acceso a los modelos configurados. Esta consulta no genera audio.
- 23 pruebas automáticas simuladas; PWA con 402 recursos; verificación de los dos recorridos de Pac-Man Lengua y 200 partidas generadas.
- APK con los diez recursos públicos del compañero, sin `.env`, llaves de ADB ni firma privada empaquetadas.
- Pablo confirmó desde la Ulefone que se escucha la voz real después de tocar «Mi compañero» → «Quiero hablar». Esta prueba sí consumió API. La precisión al interpretar los intentos y la estrategia de conversación todavía se ajustan mediante uso acompañado.
