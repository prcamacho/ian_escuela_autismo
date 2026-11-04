# Videos completos de los cuentos

Implementación del 4 de noviembre de 2026. Cada uno de los siete cuentos incluye una pestaña **Video**, con un marco centrado de hasta 640 px y dos botones: **Reproducir** y **Pausar**. El video no comienza solo, no tiene avance manual, control de volumen, pantalla completa, Picture in Picture ni reproducción remota en la interfaz. Tocar el cuadro no modifica la reproducción.

Pausar, cambiar de pestaña, cuento o sección, ocultar la página o apagar la pantalla detiene el video y conserva su punto. Al volver no se reproduce solo. Si se toca Reproducir antes de cinco minutos sin reproducción, continúa desde ese punto. Al cumplirse cinco minutos, el siguiente comienzo manual es desde el principio. La espera no se muestra en la interfaz. Salir de una pestaña que ya estaba pausada no reinicia el reloj. El punto se guarda por cuento y sobrevive a una recarga o al cierre de la app; un video completado deja de estar a medias.

Los puntos usan exclusivamente `ian-story-video-progress-v1:<id>` y no modifican las lecturas ni las esperas de las locuciones. No se mezclan video y locución: la voz mantiene su bloqueo de cambios y la pestaña Video no inicia audios de escenas o apoyos.

## Volumen

En Android se usa el puente `StoryVolume` con `maxPercent: 60` antes de reproducir. El techo se redondea hacia abajo al nivel disponible del dispositivo; por ejemplo, 9/15. La política conserva un volumen inferior y limita también los botones físicos. Pausar o salir libera la sesión; comenzar o reanudar vuelve a aplicar el techo antes de emitir sonido. Una reserva periódica mantiene el límite durante la carga del video. Una respuesta de un puente antiguo con techo del 70 % impide iniciar el video.

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

Las evidencias locales y las huellas de los siete archivos están en `tmp/story-videos/`. El precache corresponde a `ian-escuela-v176`. La corrección de apagado de `MainActivity` y su prueba `ScreenTimeoutGuardTest` se conservan.
