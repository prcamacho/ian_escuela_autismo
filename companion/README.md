# Mi compañero: conversación con voz y pictos

Prototipo local para invitar a comunicarse mediante conversación, intereses y pictogramas. Pantalla tranquila, una línea que responde al audio y un botón **Quiero hablar**. Pac-Man es uno de los intereses iniciales para conversar.

## Abrir

Requiere Node 22.6 o posterior. La clave `OPENAI_API_KEY` va en el `.env` de la raíz, que ya está excluido de Git. Permisos de escritura para Live y Responses.

```sh
npm install
npm run companion:dev
```

Abrir <http://localhost:4180/companion/> o el inicio completo en <http://localhost:4180/>. Tocar **Quiero hablar** y permitir el micrófono inicia una sesión real, con consumo de API. Hace falta conexión a Internet. Se usa `gpt-live-1`, voz `marin`, y `gpt-5.6-terra` para gestionar opciones e interpretar intentos.

## Conversar

- La voz presenta una pregunta y dos o tres pictos. La persona puede elegir tocando o hablando.
- La voz reconoce la intención, modela una palabra, sonido o frase breve y espera. También puede seguir una iniciativa espontánea, completar frases o invitar a pedir algo.
- Un clic elige una opción; no cuenta como respuesta hablada. Los intentos se interpretan como reconocidos, aproximados o poco claros. Si cuesta, se simplifica a un sonido; tras dos intentos poco claros se ofrece cambiar.
- **Otra vez** permite repetir; **Otra cosa** cambia la propuesta.
- **Pausa** silencia micrófono y salida de audio. **Terminar** o pedir terminar solicita el cierre.

Frases cortas, una invitación a la vez y silencios sin insistencia. La conversación sigue los intereses y retoma elecciones dentro de la sesión; no tiene memoria persistente. Se aceptan gestos, sonidos y botones sin exigir pronunciación para comunicar necesidades. La interpretación del habla no es una evaluación clínica. Las transcripciones opcionales viven solo en memoria de la página.

## Android y servidor

La interfaz está fuera de `app/` para no aparecer en la web escolar. Gradle incorpora solo `companion/public` a la APK; el botón aparece únicamente con la activación privada de esa instalación. La Ulefone usa un puente nativo con credencial individual y la A8 permanece deshabilitada. Ver [mantenimiento de tablets](../docs/TABLETS_MANTENIMIENTO.md).

El servidor de desarrollo escucha en `127.0.0.1`. El servidor de Internet (`scripts/serve-companion-cloud.mjs`) publica solo la API autenticada y `/health`; se niega a arrancar sin una credencial válida. El empaquetador de Railway usa una lista de archivos permitidos, sin claves ni datos de la escuela. La contraseña adulta dentro de la app queda pendiente.

La clave queda en el servidor. Se validan origen, host, tamaño del pedido y token local; solo se permite una sesión simultánea. No hay reintentos automáticos de creación. Cada ronda tiene un máximo de tres minutos; la sesión se cierra al salir de la página, ocultarla, perder conexión o dejar de recibir latidos. Pausar el micrófono no detiene la facturación; terminar sí solicita el cierre. El cierre confirmado llega desde OpenAI; ante un fallo de red puede no conocerse el instante exacto de cierre.

No se guardan audios ni transcripciones en archivos, almacenamiento del navegador ni logs de esta app. Se envía `store: false`; esto no activa ZDR en la cuenta. La configuración de retención del proveedor queda pendiente de resolver antes de las pruebas de voz con Ian.

## Verificar

```sh
npm run verify:companion
npm run verify:pwa
```

Las pruebas automáticas usan un proveedor simulado y no consumen API: elecciones, intentos, aproximaciones, simplificación, turnos viejos, herramientas duplicadas, secretos inaccesibles, origen/token, sesiones simultáneas, cancelación durante conexión y cierre por falta de latidos.

Vista de prueba sin micrófono ni API: <http://localhost:4180/companion/?preview=1>. Permite iniciar, elegir pictos y simular los tres resultados. No reproduce voz ni verifica reconocimiento real.

El 6 de octubre de 2026 Pablo confirmó que escucha la voz real desde la Ulefone conectada al servicio de Railway. La precisión al interpretar intentos requiere seguir probando de forma acompañada: correspondencia entre pregunta y pictos, elección por voz y por toque, turnos y pausas, aproximaciones, cierre e indicador de micrófono.

Referencias: [WebRTC](https://developers.openai.com/api/docs/guides/voice-webrtc), [herramientas](https://developers.openai.com/api/docs/guides/live-delegation), [control y cierre del servidor](https://developers.openai.com/api/docs/guides/voice-server-controls).
