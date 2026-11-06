# Videos completos de los cuentos

Implementación del 4 de noviembre de 2026. Cada uno de los siete cuentos incluye una pestaña **Video**, con un marco centrado de hasta 640 px y dos botones: **Reproducir** y **Pausar**. El video no comienza solo, no tiene avance manual, control de volumen, pantalla completa, Picture in Picture ni reproducción remota en la interfaz. Tocar el cuadro no modifica la reproducción.

Pausar, cambiar de pestaña, cuento o sección, ocultar la página o apagar la pantalla detiene el video y conserva su punto. Al volver no se reproduce solo. Si se toca Reproducir antes de cinco minutos sin reproducción, continúa desde ese punto. Al cumplirse cinco minutos, el siguiente comienzo manual es desde el principio. La espera no se muestra en la interfaz. Salir de una pestaña que ya estaba pausada no reinicia el reloj. El punto se guarda por cuento y sobrevive a una recarga o al cierre de la app; un video completado deja de estar a medias.

Los puntos usan exclusivamente `ian-story-video-progress-v1:<id>` y no modifican las lecturas ni las esperas de las locuciones. No se mezclan video y locución: la voz mantiene su bloqueo de cambios y la pestaña Video no inicia audios de escenas o apoyos.

El bloqueo de navegación durante una locución no impide detenerla al apagar la pantalla. La suspensión de la app cierra la voz como interrumpida, sin completar la escena ni reanudarla automáticamente al volver, y conserva los cinco minutos desde la interrupción. Los eventos web y el puente de pausa de Android usan la misma finalización. Esta corrección se verificó en la A8 el 6 de noviembre con la caché v179.

## Corrección del bloqueo en «Preparando el video»

La A8 mostró `PIPELINE_ERROR_DECODE`; el servicio de video registró `clear_instances(11)` y `OMX_ErrorInsufficientResources`. Los elementos anteriores se pausaban, pero mantenían sus fuentes y decodificadores. Además, la precarga con una búsqueda a cero iniciaba decodificadores aunque no se hubiera pulsado Reproducir.

Ahora la fuente queda en `data-src` y solo se carga después del toque y de aplicar el límite de volumen. Al salir se guarda el punto, se quita `src` y se llama a `load()` para descargar el reproductor. Se evita buscar cero si la posición ya es cero. Los clips de cinco segundos también descargan su fuente al salir o terminar. Los errores se recargan al reintentar y un comienzo que no avanza sale del estado de preparación después de doce segundos, liberando el volumen y habilitando el reintento.

La corrección pasó las pruebas de navegador con los siete MP4, también offline, 35 cambios de pestaña sin cargar decodificadores, descarga de elementos anteriores y recuperación después de un comienzo trabado. La APK con caché v177 se instaló sobre la A8; el actualizador confirmó el kiosco. La tablet se desconectó al llevársela Ian antes de la revisión final. Esa comprobación física se completó el 6 de noviembre con la caché v178, Wi-Fi apagado y toques reales: siete videos, 35 cambios sin precarga, descarga al salir, pausa/reanudación, apagado y regreso sin autoplay y reinicio después de cinco minutos.

## Volumen

En Android se usa el puente `StoryVolume` con `maxPercent: 60` y `restoreOnEnd: false` antes de reproducir. El techo se redondea hacia abajo al nivel disponible del dispositivo; por ejemplo, 9/15. La política conserva un volumen inferior y limita también los botones físicos. Pausar o salir silencia primero el elemento y después libera la sesión, conservando el volumen aplicado. Comenzar o reanudar vuelve a comprobar el techo antes de habilitar el sonido. Una reserva periódica mantiene el límite durante la carga del video. Una respuesta de un puente antiguo con techo del 70 % o que restaura el volumen al terminar impide iniciar el video.

La corrección del 6 de noviembre de 2026 evita que `end()` restaure un volumen anterior más alto mientras WebView todavía vacía una pequeña cola de audio al pausar. La preferencia de no restaurar también se guarda para la recuperación tras un cierre, y se aplica a errores, cancelaciones, salida y fin natural. El video queda silenciado hasta el próximo comienzo manual con el límite ya confirmado. La reserva y el observador sí se liberan al pausar: no se deja una sesión activa ni se mantiene el techo en segundo plano.

En la A8 se comenzó cada cuento con el volumen general en 15/15. Las mediciones alrededor de la pausa permanecieron constantes: 9/15 en seis cuentos y 8/15 en el entrenador tras bajar el volumen con el botón físico. Reanudar conservó esos niveles. Se comprobaron además los valores por defecto del puente para locuciones (70 % y restauración), los siete videos offline y la igualdad de todos los valores de almacenamiento anteriores y posteriores. Pasaron las nueve pruebas JUnit de la política de volumen y las regresiones de cuentos y PWA. Evidencias locales: `tmp/story-video-volume/`.

El valor por defecto del puente continúa siendo el 70 % para las locuciones que ya lo utilizan. Sus esperas, lecturas completas, límites de cambio de cuento y bloqueos no se modifican. En navegador se limita el volumen del reproductor a 0,6; esa interfaz no controla el volumen general del sistema operativo.

## Archivos y procedencia

Todos los videos son MP4 H.264/AAC de 640 × 360, guardados como `app/assets/stories/<id>/cuento-completo.mp4`. Se incluyen en la APK y en el precache PWA para funcionar sin conexión. Los siete suman 116 726 482 bytes.

| Cuento | Procedencia | Duración |
| --- | --- | --- |
| El último entrenador | Recuperado del [video enlazado por Argentina.gob.ar](https://www.argentina.gob.ar/educacion/historiasxleer/entrenador), [YouTube PdGUcue1Rk0](https://www.youtube.com/watch?v=PdGUcue1Rk0) | 9:56,89 |
| Carnaval en el zoo | `C:/Users/pablo/Desktop/libro2.mp4`, suministrado por la familia | 7:07,85 |
| Ratita Gris y Ratita Azul | `C:/Users/pablo/Desktop/libro3.mp4`, suministrado por la familia | 4:02,76 |
| Mocho y el espantapájaros | `C:/Users/pablo/Desktop/libro4.mp4`, suministrado por la familia | 12:28,29 |
| La vuelta al mundo | `C:/Users/pablo/Desktop/libro5.mp4`, suministrado por la familia | 6:42,54 |
| La casa del árbol | `C:/Users/pablo/Desktop/libro6.mp4`, suministrado por la familia | 5:29,21 |
| Una noche de muchos días | `C:/Users/pablo/Desktop/libro7.mp4`, suministrado por la familia | 5:54,22 |

Los originales de los cuentos 2 al 7 se copiaron sin recodificar ni modificar. Autoría, ilustración y edición permanecen en los créditos de cada cuento y en sus `SOURCES.md`.

## Verificación

- `node scripts/verify-stories.mjs`: conserva las reglas de los 70 audios existentes.
- `node scripts/verify-story-videos.mjs`: reproduce los siete MP4 en navegador y sin conexión; comprueba pausa/reanudación, ausencia de controles nativos, salida, ocultación, tres tamaños de pantalla, cancelación de comienzos pendientes, rechazo del puente antiguo y conservación de los datos escolares y las lecturas. Comprueba reanudación después de salir y recargar, frontera exacta de 4:59.999 / 5:00.000, salida de una pausa sin prolongarla y final natural sin un punto pendiente.
- Pruebas JUnit de `StoryVolumePolicy`: techo del 60 % para diferentes escalas, botones, cambios externos, restauración y conservación del límite anterior de las locuciones.
- `node scripts/verify-story-videos-device.mjs`: revisión real en la A8 existente, sin borrar lecturas ni esperas; conserva el almacenamiento y restaura el volumen previo. Verifica los siete archivos, botones físicos (9/15), pausa, salida, pantalla apagada, regreso sin autoplay, continuación y reinicio tras cinco minutos. Los puntos creados durante la prueba se retiran y los puntos previos de Ian se conservan. Cierra la conexión CDP al terminar.

Las evidencias locales y las huellas de los siete archivos están en `tmp/story-videos/`; el diagnóstico y la APK de la corrección están en `tmp/story-videos-fix/`. El precache actual corresponde a `ian-escuela-v177`. La corrección de apagado de `MainActivity` y su prueba `ScreenTimeoutGuardTest` se conservan.
