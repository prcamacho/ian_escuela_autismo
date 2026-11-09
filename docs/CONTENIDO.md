# Contenido educativo

## Escuela: expediciones para 9 años — 9 de noviembre de 2026

Una nueva actividad al principio de cada una de las seis materias, también en instalaciones existentes. Se conservan los temas personales y los ajustes. Cada partida tiene cinco desafíos distintos y los bancos rotan entre partidas: 60 variantes en total.

| Materia | Actividad | Aprendizaje y animación |
| --- | --- | --- |
| Lengua | Detectives del porqué | Diez relatos breves. Identificar causas, consecuencias o propósitos; después de comprobar, escenas de lluvia, viento, derrames, luz, deshielo y fútbol representan el relato. |
| Ciencias Naturales | La red de la vida | Ocho ejemplos de cadenas de tres eslabones. Ordenar alimento y consumidores; una señal recorre las flechas. Se aclara que son ejemplos simplificados y que existen otras relaciones. |
| Ciencias Sociales | El viaje de los productos | Ocho productos y cuatro etapas por circuito: materia prima, transformación y venta, con los trabajos y transportes que los conectan. El recorrido correcto se representa después de comprobar. |
| Matemáticas | Pizzería de las fracciones | Doce pedidos de medios, cuartos y octavos; se seleccionan y quitan porciones iguales sobre la pizza. Incluye equivalencias como 1/2 = 2/4 = 4/8. Las porciones se separan y vuelven a reunirse. |
| Inglés | Ready for the weather | Doce mensajes con clima, prenda y color. Elegir ambas características; el personaje muestra la elección antes de comprobar y la prenda del mensaje después, con traducción y animación. |
| Tecnología | El taller de los inventos | Diez necesidades de diseño. Elegir un material y observar impermeabilidad, absorción, transparencia, rigidez, plegado, elasticidad o reflexión en una prueba animada. |

Las respuestas se editan antes de **Comprobar**. Una vez confirmadas, quedan bloqueadas y se registra un único resultado en la sesión. El avance es manual y **Ver animación** repite la explicación sin modificar el resultado. No hay reloj, vidas ni audio. Las animaciones son finitas, se cancelan al salir y respetan movimiento reducido. Ilustraciones originales en SVG; no se requieren descargas ni servicios externos.

La selección es una adaptación para practicar con apoyos visuales a los 9 años, no una equivalencia rígida entre edad y nivel. Referencias consultadas el 9 de noviembre de 2026; los textos, actividades e ilustraciones son originales:

- [Ministerio de Educación: NAP, segundo ciclo](https://www.educ.ar/recursos/132576/nap-educacion-primaria-segundo-ciclo): comprensión narrativa, relaciones causales y resolución de problemas.
- [DGCyE: Interacciones entre seres vivos](https://continuemosestudiando.abc.gob.ar/contenido/interacciones-entre-seres-vivos/): relaciones alimentarias en cadena y en red.
- [Educ.ar: Un esfuerzo de producción](https://www.educ.ar/recursos/118053/un-esfuerzo-de-produccion): circuitos productivos y división del trabajo en primaria.
- [DGCyE: Estudiar fracciones I](https://continuemosestudiando.abc.gob.ar/contenido/4-estudiar-fracciones-i/): partes iguales, relación parte-todo y equivalencias.
- [British Council: Clothes, LearnEnglish Kids](https://learnenglishkids.britishcouncil.org/category/topics/clothes): vocabulario de prendas y apoyos visuales.
- [Educ.ar: Los materiales, clasificación y propiedades](https://www.educ.ar/recursos/90867/los-materiales-clasificacion-y-propiedades): relación entre propiedades y usos de los materiales.

Archivos: `app/school-expeditions.js` y `app/school-expeditions.css`. Incluidos en la caché offline. Verificación funcional: `npm run verify:school`; recursos offline: `npm run verify:pwa`. Instalados y revisados en la A8 el 9 de noviembre: seis partidas completas, 30 desafíos con toques reales y animaciones. La revisión visual final verificó las seis pantallas, las fracciones con numerador sobre denominador y el comienzo de cada actividad desde arriba. Los resultados de prueba se aislaron del almacenamiento real; datos de Ian conservados. Evidencias locales en `tmp/expeditions-release/`.

La app esta preparada para que los temas y ejercicios se mantengan desde el codigo. Por ahora no hay editor visible para Ian, asi la interfaz queda limpia y sin distracciones.

## Descubrimientos de Pac-Man — 2 de noviembre de 2026

Una nueva actividad al principio de cada una de las seis materias. Las instalaciones existentes conservan las actividades anteriores y reciben las tarjetas nuevas sin duplicados.

- **Lengua — El correo secreto:** interpretar dos pistas descriptivas, elegir el objeto y enviar un paquete. Diez cartas rotativas; el paquete viaja hasta un fantasma al acertar.
- **Ciencias Naturales — El laboratorio del agua:** decidir si el agua recibe o pierde calor y anticipar su estado final. Doce situaciones de fusión, congelación, evaporación y condensación. Las transformaciones se animan al comprobar; el vapor se representa con puntos y se explica que es invisible.
- **Ciencias Sociales — El museo del antes y ahora:** elegir un objeto de cada época que resuelva una necesidad común. Diez parejas de comunicación, iluminación, orientación y vida cotidiana. Los estantes tienen órdenes independientes; se aclara que los objetos antiguos también pueden seguir usándose.
- **Matemáticas — El espejo del laberinto:** completar la mitad reflejada de un mosaico de cuatro filas. Doce patrones, casillas que se pueden encender, apagar o borrar y un eje vertical. La guía de la solución aparece después de comprobar; también se consideran incorrectas las casillas encendidas de más.
- **Inglés — The weather machine:** interpretar dos pistas con sunny, cloudy, rainy, snowy o windy y day/night. Un selector giratorio cambia el clima de una ventana ilustrada; otros dos botones cambian el momento del día. Nueve combinaciones posibles, sin sol de noche.
- **Tecnología — La usina de las cerezas:** girar seis cables un cuarto de vuelta para cerrar un circuito de pila y lámpara. Doce configuraciones; un recorrido completo de ida y vuelta es necesario para encenderla. Se aceptan giros equivalentes de los cables rectos. La corriente se puede volver a ver después de acertar, sin cambiar el resultado.

Cada partida tiene cinco desafíos distintos, con bancos que rotan entre partidas. Las respuestas se editan libremente antes de comprobar; después quedan bloqueadas y se muestra una explicación. El avance es manual, sin reloj ni sonidos. Las animaciones son finitas, respetan movimiento reducido y no bloquean los controles. Todos los recursos son locales y están incluidos en la caché offline.

Implementación: `app/pacman-discoveries.js` y `app/pacman-discoveries.css`. Verificación funcional: `node scripts/verify-pacman-discoveries.mjs`; incluye migraciones, partidas completas y las 4096 orientaciones posibles de los cables móviles. La revisión visual cubre 1097 × 686, 1024 × 600 y 390 × 844 con interacción táctil y movimiento reducido.

## Nuevos mundos de Pac-Man — 26 de octubre de 2026

Se agrega una actividad nueva al principio de cada materia, conservando las anteriores y los ajustes de la instalación:

- **Lengua — El portal de los opuestos:** elegir antónimos a partir de una oración y una palabra destacada.
- **Ciencias Naturales — Expedición animal:** relacionar doce animales con seis ambientes ilustrados.
- **Ciencias Sociales — Los amigos del barrio:** reconocer quién realiza un trabajo a partir de una necesidad concreta.
- **Matemáticas — El tren de los números:** completar series que aumentan de 1, 2, 3, 5 o 10 en 10.
- **Inglés — Pac-Man in action:** relacionar jump, sleep, eat, read, run y drink con escenas y acciones.
- **Tecnología — La fábrica de las cerezas:** ordenar tres pasos de fabricación usando fichas que se pueden quitar y volver a colocar.

Cada aventura presenta cinco desafíos diferentes con bancos rotativos. Se permite cambiar la respuesta antes de **Comprobar**; después se conserva el resultado y se muestra una explicación. El avance es manual, sin reloj ni sonidos. Pac-Man come puntos y una cereza al acertar, con festejos propios por materia; las animaciones son breves, no bloquean los controles y respetan movimiento reducido.

Implementación: `app/pacman-worlds.js` y `app/pacman-worlds.css`, incluidos en los recursos offline. Verificación: `node scripts/verify-pacman-worlds.mjs`.

## Ciencias Sociales: el campo, las vacas y sus cuidados

La tarjeta **El campo: las vacas y sus cuidados** aparece en Ciencias Sociales después de la nueva aventura del barrio, también al actualizar instalaciones anteriores. Contiene tres estaciones y diez pasos, basados en la propuesta de la integradora y las tres imágenes aportadas por la familia:

- **El ambiente:** reconocer la llanura con ganado entre tres paisajes y señalar el pasto y el agua sobre la foto del campo.
- **Los cuidados:** relacionar la vaca con el pasto para comer, el agua para beber y la persona que cuida al ganado.
- **Mi campo:** elegir y pegar dos vacas y una persona sobre la tierra, y señalar el agua. Las vacas son intercambiables; cada figura se usa una sola vez. La ubicación se puede modificar antes de comprobar, tocando otra parte de la foto. El teclado también permite colocar las figuras.

Pac-Man señala la estación actual en un camino de tres paradas. No hay reloj ni sonidos. Las consignas se presentan de a una y el avance es manual. Al comprobar, la respuesta queda bloqueada; si hace falta, se ofrece una explicación y **Intentar otra vez**, conservando el primer intento en la sesión. El final muestra el campo armado y distingue los recursos naturales del trabajo de las personas. No se atribuye una ubicación provincial a las imágenes.

Las fotos originales se conservan en `app/assets/sociales/campo/`; las siluetas se presentan con contornos vectoriales. Todos los recursos están incluidos en la caché offline. Archivos: `app/social-farm.js` y `app/social-farm.css`. Verificación: `node scripts/verify-social-farm.mjs`.

## Tecnología: kilo, medio kilo y cuarto kilo — 26 de octubre de 2026

El contenido de peso ya estaba en **Tecnología**, en **El taller del peso**. Se mantienen ese taller y las demás actividades, y se agregan tres tarjetas junto a él:

- **Completá un kilo:** cinco desafíos para juntar medios, cuartos y combinaciones de ambos, incluyendo pesas iniciales que no se pueden quitar.
- **La balanza de Pac-Man:** cinco comparaciones de grupos de pesas, incluyendo equivalencias. Elegir el plato que pesa más, menos o indicar que pesan igual. La balanza se inclina después de comprobar.
- **Los pedidos de Pac-Man:** cinco pedidos de frutas, entre 3/4 kg y 2 kg. Se acepta cualquier combinación que sume el peso solicitado.

Los dibujos vectoriales siguen la forma y las proporciones de las láminas aportadas: cada pesa de 1 kg ocupa siempre 76 × 96 px; cada medio, 61 × 77 px; cada cuarto, 47 × 60 px. Se reutiliza el mismo dibujo en la referencia, el objetivo, los platos y las pesas para agregar o quitar, en todas las pantallas. Los grupos se acomodan sin encoger las pesas. Ninguna animación cambia su escala.

Cada respuesta se puede editar antes de **Comprobar**, se confirma una sola vez y luego muestra una explicación. El avance es manual. Pac-Man come puntos al acertar, las pesas entran con una caída breve y la balanza mueve sus platos según las sumas. Animaciones finitas y silenciosas, compatibles con movimiento reducido. Las tres actividades funcionan sin internet y se incorporan a instalaciones anteriores sin duplicar temas.

Archivos: `app/weight-lab.js` y `app/weight-lab.css`. Verificación: `node scripts/verify-weight-lab.mjs`.

## Materias fijas

Las materias son fijas y se cambian solamente editando el codigo:

- Lengua.
- Cs Naturales.
- Cs Sociales.
- Matematicas.
- Inglés.
- Tecnología.

## Temas

Cada tema tiene:

- Nombre.
- Descripcion corta.
- Ejercicios.

Ejemplos:

- Vocales.
- Silabas simples.
- Numeros 1 a 10.
- Cuerpo y cuidado.
- Lugares.

## Ejercicios

Cada ejercicio tiene:

- Consigna.
- Apoyo visual central.
- Opciones.
- Respuesta correcta.

Ejemplo:

```text
Consigna: Toca la letra A
Apoyo visual: A
Opciones: A, E, O, I
Respuesta correcta: A
```

## Evaluacion

En modo evaluacion la app muestra el resultado al terminar la actividad, pero no guarda registros por ahora. La idea actual es evaluar en vivo y dejar el registro historico para una version posterior.

## Escuela: seis nuevas aventuras de Pac-Man

Cada materia incorpora una tarjeta nueva al principio de su lista, con cinco desafíos por partida:

- **Lengua — La fábrica de palabras:** ordenar sílabas para nombrar un pictograma. Las sílabas repetidas, como las dos «na» de banana, son intercambiables; se pueden quitar fichas antes de comprobar.
- **Ciencias Naturales — El jardín de Pac-Man:** reconocer las funciones de raíces, tallo, hojas y flor. Después de comprobar, se destaca la parte correspondiente; al acertar, la planta y las gotas de agua se animan.
- **Ciencias Sociales — Una vuelta por el barrio:** interpretar una necesidad cotidiana y elegir escuela, biblioteca, panadería, hospital, plaza o cuartel de bomberos. Pac-Man recorre el mapa hacia el lugar correcto al acertar.
- **Matemáticas — La merienda de los fantasmas:** distribuir todos los puntos en partes iguales entre dos, tres o cuatro fantasmas. Los botones + y − permiten ajustar cada porción; solo se comprueba cuando se repartieron todos los puntos.
- **Inglés — Where is Pac-Man?:** leer frases con *on*, *under* y *next to* y elegir entre tres escenas de Pac-Man y una mesa. Las tres posiciones aparecen en cada partida y la traducción se muestra después de comprobar.
- **Tecnología — Programá a Pac-Man:** armar hasta ocho instrucciones de movimiento absoluto en un laberinto de 5 × 4 casillas. Se aceptan todos los caminos que terminan en la cereza sin chocar. El programa se anima al ejecutarlo y **Ver recorrido** permite repetirlo sin modificar el resultado.

Las respuestas se pueden editar antes de comprobar o ejecutar. Después quedan bloqueadas y se presenta una explicación; el avance es manual. Las animaciones son breves, no reproducen sonidos y respetan movimiento reducido. Los recursos se guardan en la caché offline; las instalaciones anteriores reciben las seis tarjetas sin duplicarlas. Archivos: `app/pacman-quests.js` y `app/pacman-quests.css`. Verificación: `node scripts/verify-pacman-quests.mjs`.

## Inglés

La materia Inglés incluye tres actividades visuales de vocabulario: colores, útiles escolares y números del 1 al 10. Cada inicio arma seis consignas desde un banco mayor y cambia la posición de las cuatro opciones.

Si Ian se equivoca, la respuesta correcta no se revela ni se eliminan opciones. La app avanza automáticamente a otra palabra y guarda la palabra fallada para reforzarla más adelante. Cuando quedan al menos dos consignas, puede volver a presentarla después de esas consignas con opciones reordenadas; en caso contrario queda priorizada para la próxima sesión.

Los audios siguen guardados en `app/assets/english/audio`, pero su reproducción y sus botones están temporalmente deshabilitados. Se pueden reactivar cambiando `VOICE_PLAYBACK_ENABLED` en `app/app.js` y regenerar con `scripts/generate-english-audio.py` usando `edge-tts`.

## Lengua: verbos con Pac-Man

- **Pac-Man come verbos:** ocho desafíos distintos por partida, elegidos de un banco de doce acciones cotidianas. Ian lee una oración y elige su verbo entre tres palabras de esa misma oración. Las otras opciones son un sustantivo y un adjetivo; la respuesta correcta cambia de posición.
- **Pac-Man viaja en el tiempo:** seis oraciones para completar, dos en pasado, dos en presente y dos en futuro. Los apoyos «Ayer / Hoy / Mañana» y «Ya pasó / Pasa ahora / Va a pasar» acompañan las tres formas del mismo verbo. Cada partida cambia los pares de verbo y tiempo y el orden de las opciones.

Cada acierto permite avanzar a mano y mueve a Pac-Man un punto en el recorrido. Los errores ofrecen una pista y permiten volver a intentar, sin quitar opciones. El final repasa las palabras trabajadas y permite jugar de nuevo o volver a Lengua. No hay límite de tiempo, vidas ni reproducción de audio. Las animaciones son breves y se desactivan con la preferencia de movimiento reducido; los recursos se incluyen en la caché offline.

Contenido y dibujos originales. Referencia para la progresión didáctica: [INTEF, El verbo, 2.º de primaria](https://descargas.intef.es/recursos_educativos/It_didac/Leng_Pri/2/07/El_verbo/index.html), que organiza el trabajo desde el concepto de verbo hacia presente, pasado y futuro. No se reproducen sus ejercicios.

## Lengua: club de las misiones

Las doce escenas tienen personajes articulados, objetos que acompañan la acción y movimientos breves que se pueden repetir con **Ver movimiento**, sin cambiar la respuesta. Las preparaciones incluyen ilustraciones propias y las fichas e ingredientes tienen transiciones visuales silenciosas.

Cinco actividades independientes basadas en los contenidos de la evaluación adaptada aportada por Pablo:

- **¿Qué está haciendo?**: seis escenas humanas de un banco de doce, con cuatro verbos de significado cercano. La imagen no trae una oración que revele el verbo.
- **Repará la oración**: seis escenas. Elegir la palabra que no corresponde y su reemplazo; hay que resolver ambas decisiones.
- **Palabras en el camino**: cinco oraciones construidas con palabras individuales, sin mayúsculas, colores gramaticales ni corrección por cada ficha. Los artículos repetidos son intercambiables.
- **La bolsa de ingredientes**: cuatro recetas de un banco de ocho. Leer instrucciones y seleccionar todos los alimentos necesarios entre otras alternativas culinarias plausibles, sin anunciar cuántos hay que elegir.
- **Primero, después, al final**: cuatro preparaciones de un banco de seis. Ordenar cuatro instrucciones con dependencias concretas; las fichas no traen números ni conectores que resuelvan el orden.

Se puede modificar la respuesta antes de **Comprobar**. La confirmación bloquea toda la respuesta, registra el primer intento y muestra una explicación; no elimina opciones ni permite encontrar la solución probando repetidamente. El avance es manual. Los bancos rotan entre partidas sin repetir escenas dentro de una misma sesión. No hay sonidos, voces, reloj ni vidas. Pac-Man acompaña el recorrido y las ilustraciones vectoriales incluyen movimientos breves que respetan movimiento reducido. Todos los recursos funcionan sin conexión. Verificación: `node scripts/verify-language-missions.mjs`.

## Lengua: actividades de PSP Sofía

La tarjeta "Armamos oraciones" contiene ocho oraciones cortas. Ian primero ordena tres fragmentos y después reconoce, de a un elemento por vez, el sujeto, el verbo y el predicado. El sujeto se marca en azul, el verbo en naranja y el predicado completo con un marco verde, dejando claro que el verbo forma parte del predicado.

La tarjeta "Milanesa con puré" presenta un texto instructivo de doce pasos. La preparación se divide visualmente en puré, milanesa y plato final. Cada instrucción se lee, se relaciona con una de tres escenas y, al acertar, se representa con una animación breve. Los pasos que requieren cuchillo o calor indican que debe realizarlos un adulto.

Las dos tarjetas muestran la identificación "Propuesta por PSP Sofía". Sus 27 audios en español siguen guardados en `app/assets/language/sofia/audio`, aunque ahora no se reproducen ni muestran botones de escucha. Pueden regenerarse con `scripts/generate-sofia-language-audio.py`.

## Ciencias Naturales: los plásticos

La actividad "Los plásticos" reúne tres juegos consecutivos de seis desafíos cada uno:

- Encontrar el objeto de plástico entre tres materiales claramente diferentes.
- Clasificar objetos como plástico, madera o metal.
- Observar propiedades con preguntas breves: si se dobla, si se ve a través y si absorbe agua.

Las ilustraciones son vectores guardados en el propio código para que funcionen sin internet. Se evitan objetos visualmente ambiguos. Al acertar, GSAP anima el objeto entrando en la caja de plástico, moviéndose hacia su material o mostrando la propiedad con dobleces, transparencias y gotas de agua. Una respuesta incorrecta muestra una pista corta y permite volver a intentar.

## Ciencias Naturales: la Tierra con Pac-Man

La actividad **La Tierra: donde vivimos** parte de una escena ilustrada de casas, escuela y suelo, sin necesitar fotos personales. Un alejamiento controlado con GSAP relaciona la escena con la superficie del planeta. Después se abre y cierra el mismo modelo para mostrar su interior. Se exploran corteza, manto y núcleo por separado; al conocer las tres grandes capas, el núcleo se divide en externo e interno. Los nombres y las explicaciones se presentan junto al resaltado de su ubicación.

La práctica tiene seis desafíos: ubicar una casa en la superficie, reconocer la corteza, localizar el manto, reconocer el núcleo en un corte circular a color, localizar el núcleo externo e identificar el interno en otro diagrama. Todos los dibujos conservan color y texturas: agua, vegetación, roca, minerales y metal, además de ladrillos y tejas en las construcciones. Las opciones y los números de los lugares cambian de orden. Se puede cambiar una elección hasta **Comprobar**; después se registra una sola respuesta y se explica su ubicación. El avance siempre es manual y **Volver a explorar** conserva el desafío y la respuesta. La práctica no guarda resultados históricos.

En tablet, la explicación tiene espacio reservado y el avance ocupa una fila fija. Acertar o equivocarse conserva el tamaño del modelo y la posición del botón; en pantallas de menor altura, el contenido de las opciones puede desplazarse dentro de su tarjeta.

Los dibujos son modelos simplificados, con la corteza ampliada para distinguirla; los colores del interior son convenciones. El manto se presenta como roca caliente, el núcleo externo como metal líquido y el interno como metal sólido. Los personajes de la escena inicial no están a escala. Referencia científica: [USGS, Inside the Earth](https://pubs.usgs.gov/gip/dynamic/inside.html). El recorrido es una propuesta para observar con Ian, no una intervención validada específicamente para él.

No hay audios, reloj, vidas ni movimiento continuo. Las transiciones usan GSAP, se cancelan al salir y se omiten con movimiento reducido. Los archivos nuevos se incluyen en la caché offline y la migración agrega el tema sin perder temas personales ni duplicarlo. Verificación: `node scripts/verify-earth-layers.mjs`.

## Mis apoyos

### Cuentos: pausas y volumen comunes

Desde el 2 de noviembre de 2026, los siete cuentos y sus apoyos comparten estas reglas. Repetir una escena o apoyo exige cinco minutos desde el **final** de su audio. Otra escena o apoyo del mismo cuento está disponible inmediatamente, salvo su propia espera pendiente. Para escuchar otro cuento hay que esperar dos minutos desde el último audio si el cuento anterior se completó, o cinco si quedó incompleto. Se toma el último cuento realmente escuchado; abrir libros, leer o tocar botones bloqueados no cambia ni reinicia los tiempos. Se cumple la espera que termine más tarde entre la del audio elegido y la del cambio de cuento. Durante la espera se puede navegar y leer; solo se bloquea Escuchar.

Una lectura se completa cuando terminaron las ocho locuciones de sus escenas; las ayudas son opcionales. El registro persiste entre visitas y es independiente de la página guardada. Saltar a la última escena no completa un cuento. Una nueva lectura de un cuento terminado reinicia ese registro, conservando las esperas. La locución interrumpida no completa su escena; los fallos antes de empezar permiten reintentar sin consumir una escucha. Los cierres conservan las esperas y no hay reproducción automática.

En Android, `StoryVolumePlugin` aplica un **máximo del 70 %**, redondeado hacia abajo al escalón disponible. Nunca sube un volumen inicial menor. Los botones físicos permiten bajar, silenciar y subir hasta el techo. También se corrigen los cambios externos de volumen durante la locución. Al finalizar o fallar se retira el límite: se restaura el nivel anterior si no hubo cambios manuales y, si los hubo, se respeta la elección. El límite se aplica antes de reproducir y se libera al cerrar la página; una señal periódica de reproducción evita que quede activo si la página deja de responder. El navegador solo limita el volumen de su reproductor. Comprobaciones: `node scripts/verify-stories.mjs` y pruebas Android `StoryVolumePolicyTest`.

### Cuentos: El último entrenador

**Mis apoyos → Cuentos → El último entrenador**, de Juan Sasturain, ilustrado por Cucho Cuño. La adaptación contiene ocho escenas con una o dos frases concretas y las ilustraciones originales obtenidas del PDF aportado por la familia. La escena leída se guarda aparte de los datos escolares y se puede retomar al volver a abrir el cuento. Al final está **Leer desde el principio**.

**Antes y ahora** muestra que el entrenador joven y el abuelo son la misma persona. **La foto** explica que el hombre aparece en la imagen, pero su nombre falta en el epígrafe. Estas ayudas conservan la escena del cuento al volver. Por pedido familiar se retiraron el repaso y la franja inferior con **Anterior**, **Pausa** y **Ayuda**. **Siguiente** está dentro del panel de lectura, junto al texto; en la última escena se ofrece **Leer desde el principio**. Los créditos están en la biblioteca.

Diez audios locales con la voz argentina `es-AR-ElenaNeural`, a velocidad reducida, leen el texto de las ocho escenas y los dos apoyos. Se generan desde `app/story-books.js` con `scripts/generate-story-audio.py` (edge-tts >= 7.3.1). La voz comienza solo al tocar **Escuchar** y no se superpone consigo misma. Durante cualquier locución del cuento se deshabilitan los botones y se bloquean los cambios de sección, la salida y los nuevos renderizados; no hay un control para interrumpirla. Al terminar se devuelve el control. Si ocurre un error de audio también se libera la pantalla. El texto siempre está disponible.

Cada una de las ocho escenas y los dos apoyos, **Antes y ahora** y **La foto**, tienen una espera de cinco minutos desde el final para repetir su locución. Se aplican también las pausas comunes de dos o cinco minutos para cambiar de cuento, detalladas arriba. **Escuchar en m:ss** muestra la espera restante; al vencer vuelve a estar disponible sin reproducirse automáticamente. Las esperas persisten al salir, reiniciar el cuento o cerrar la app. Si el audio no logra empezar, se permite reintentar.

En la segunda escena, **Ver movimiento** reproduce un recorte silencioso de cinco segundos del MP4 familiar, de 03:08 a 03:13. El movimiento del original es mínimo: cambia el fondo mientras el entrenador permanece en la misma postura. No se reproduce ni avanza automáticamente, y no se ofrece cuando el dispositivo pide movimiento reducido. Las imágenes, el clip y los audios están incluidos para uso sin conexión. El caché responde a las solicitudes parciales del reproductor de video.

El catálogo incorpora cada cuento por separado en `app/story-books.js`, después de analizar sus propios materiales. No se inventa una resolución del relato ni se representa como un hecho la remera con A de abuelo que imagina el narrador.

Archivos: `app/story-books.js`, `app/story-support.js`, `app/story-support.css`, `app/assets/stories/el-ultimo-entrenador/`. Verificación: `node scripts/verify-stories.mjs`.

### Cuentos: Carnaval en el zoo

**Mis apoyos → Cuentos → Carnaval en el zoo**, de Fabián Sevilla, ilustrado por Mariano Epelbaum. Se analizaron el PDF y el MP4 aportados por la familia. Ocho escenas con una o dos frases conservan el inicio, la fiesta de disfraces, los premios, la decisión de seguir disfrazados, la pérdida de visitantes y el cierre con el próximo Carnaval. La síntesis selecciona ejemplos y evita enumeraciones extensas, expresiones figuradas y una resolución inventada sobre el regreso de las visitas.

**El disfraz** muestra al mismo león sin disfraz y con plumas de búho. **En el cuento** explica que el hipopótamo volador es parte de la fantasía y que los hipopótamos reales no vuelan. Los apoyos se configuran por cuento; el segundo libro no muestra las ayudas del entrenador. El video coincide con el relato y tiene movimientos leves de las ilustraciones; este segundo libro usa las imágenes del PDF sin un botón de movimiento poco informativo.

Diez MP3 locales leen exactamente los textos visibles con la misma voz argentina y velocidad reducida del primer cuento. **Cada escena y cada uno de los dos apoyos nuevos** permiten repetir su audio cinco minutos después del final. También se aplican las pausas comunes para cambiar de cuento y el techo de volumen. Las esperas persisten al volver y nunca disparan audio automático. Mientras habla, se bloquean todos los cambios y salidas hasta el final o un error de audio. Se conservan el avance manual, la ubicación de **Siguiente**, la ausencia de franja inferior y repaso, y los datos escolares.

Material para papel en `output/pdf/`: resumen visual de una A4 y **El teatro del león**, dos A4 con una base y una solapa de disfraz de tamaño coincidente. El adulto prepara el material; Ian puede bajar el disfraz, mover el león para bailar y levantarlo. Puede empezar con un solo movimiento, con un ejemplo del acompañante. Es una propuesta para observar su respuesta, sin requerir lectura autónoma, repetición oral ni completar todos los pasos. Imprimir ambas hojas de la actividad al 100 %.

Archivos: `app/assets/stories/carnaval-en-el-zoo/`, `tmp/book2-analysis/` y `tmp/pdfs/build-carnaval-materials.py`. Verificación: `node scripts/verify-stories.mjs` y `node scripts/verify-pwa.mjs`.

### Cuentos: Ratita Gris y Ratita Azul

**Mis apoyos → Cuentos → Ratita Gris y Ratita Azul**, de Edith Vera, ilustrado por Eleonora Arroyo. Se analizaron el PDF de 36 páginas y el video de 4:02.76 aportados por la familia. Ocho escenas conservan la visita, el huevo como regalo, la charla, la canasta, la diferencia entre lo que cree Gris y lo que ve Azul, la partida de Gris, el nacimiento del pichón, la devolución a la gorriona y la flor del final. Se omiten enumeraciones y expresiones figuradas. La explicación del nacimiento y el contraste antes/después hacen explícito el giro del cuento.

**Las ratitas** identifica a las dos amigas por nombre, color y acción. **El huevo** muestra que el pichón estaba dentro del huevo y salió al romper la cáscara; no son dos regalos diferentes. Se conservan las ilustraciones originales sin texto superpuesto y se unen las dobles páginas necesarias para mostrar completos los personajes. El video coincide con el relato y usa transiciones de página; no se agregó un clip poco informativo.

Diez locuciones locales leen exactamente los textos visibles, con la misma voz argentina y velocidad reducida. Cada escena y apoyo tienen cinco minutos desde el final para repetir su audio, además de las pausas comunes para cambiar de cuento y el techo de volumen. Todos los botones, cambios y salidas permanecen bloqueados hasta el final de la locución o un error de audio. No hay reproducción automática, repaso ni franja inferior. El avance permanece junto al texto.

En `output/pdf/` están el resumen ilustrado de una A4 y **Llevo al pichón con su mamá**, dos A4 horizontales: un tablero canasta → camino → mamá y una ficha móvil. La gorriona adulta y el nido corresponden a las ilustraciones del inicio, no a los teros azules del final. El adulto prepara la ficha e Ian puede desplazarla o señalar su destino. Se puede comenzar con un solo movimiento, acompañado por una frase breve. La ficha no se pega al tablero. Imprimir al 100 %.

Archivos: `app/assets/stories/ratita-gris-y-ratita-azul/`, `tmp/book3-analysis/` y `tmp/pdfs/build-ratitas-materials.py`. Verificaciones: `node scripts/verify-stories.mjs` y `node scripts/verify-pwa.mjs`.

### Cuentos: Mocho y el espantapájaros

**Mis apoyos → Cuentos → Mocho y el espantapájaros**, de Álvaro Yunque, ilustrado por María Jesús Álvarez. Se analizaron el PDF completo y el video familiar de 12:28.29. Ocho escenas breves conservan el acompañamiento de Tula, la torta para su tía, las burlas y el sombrero, la visita y devolución del sombrero, la pesadilla, el despertar, el consuelo de la madre y el paso por el campo al día siguiente. La escena del espantapájaros que camina se llama **En el sueño de Mocho** y lo identifica como pesadilla desde su primera frase. El relato no presenta ese movimiento como un hecho real.

**El muñeco** explica qué es un espantapájaros. **El sueño** aclara que la persecución sucedió mientras Mocho dormía y que al despertar estaba en casa. Se omiten las generalizaciones sobre varones y mujeres, las comparaciones despectivas, las peleas y agresiones a perros, los cálculos de porciones y la explicación de la pesadilla por comer mucho. Se conserva la acción de molestar al espantapájaros y la conducta del final. Las ilustraciones proceden del PDF y se unieron dobles páginas para mantener completos los personajes; el video usa las mismas imágenes con transiciones.

Diez MP3 locales leen exactamente el texto visible con la voz argentina habitual y velocidad reducida. Se aplican las reglas comunes: cinco minutos desde el final para repetir cada escena o apoyo, pausas para cambiar de cuento y techo de volumen. Mientras habla se bloquean los cambios, la salida y los renderizados. No hay reproducción automática, repaso ni franja inferior; **Siguiente** permanece junto al texto y el cierre ofrece reiniciar la lectura. Los otros tres cuentos conservan sus datos.

Materiales de `output/pdf/`: resumen ilustrado de una A4 y **Mi espantapájaros de masa**, dos A4 con una plantilla grande y una guía visual. Una bolita y dos rollitos forman cabeza, cuerpo y brazos. Se usa masa o plastilina; el adulto puede preparar las formas e Ian colocar una sola pieza o señalar dónde va. La imagen del cuento sirve de referencia y la plantilla es un esquema de formas. Es una propuesta de construcción para probar acompañados.

Archivos: `app/assets/stories/mocho-y-el-espantapajaros/`, `tmp/book4-analysis/` y `tmp/pdfs/build-mocho-materials.py`. Verificaciones: `node scripts/verify-stories.mjs` y `node scripts/verify-pwa.mjs`.

### Cuentos: La vuelta al mundo

**Mis apoyos → Cuentos → La vuelta al mundo**, de Javier Villafañe, ilustrado por Estrellita Caracol. Se analizaron el PDF y el video familiar de 6:42.54. Ocho escenas conservan la salida en triciclo, las invitaciones a los animales, la fila, el charco, el molino quieto por falta de viento, la ayuda de la jirafa a la hormiga y el regreso. Se reducen las enumeraciones acumulativas. La adaptación explicita el juego de Santiago, el río imaginado al mirar el charco y el recorrido real alrededor de la manzana.

**El recorrido** explica una manzana como grupo de casas rodeado por calles y muestra un esquema cerrado que sale y vuelve al mismo lugar. Es una representación del concepto, sin calles concretas ni ubicación de Ian. **La ayuda** muestra de cerca a la hormiga sobre la cabeza de la jirafa y explica por qué así puede ver el molino. El resto de las ilustraciones se obtiene del PDF. El video usa las mismas imágenes con transiciones de página; no se incorpora un clip nuevo.

Diez MP3 locales leen los textos visibles con la voz argentina habitual y velocidad reducida. Se aplican las reglas comunes: cinco minutos desde el final para repetir cada escena o apoyo, pausas para cambiar de cuento y techo de volumen. Mientras habla se bloquean cambios, salidas y nuevos renderizados. Se conserva el avance manual junto al texto y la ausencia de repaso y controles inferiores. Los cuatro cuentos previos mantienen sus datos.

En `output/pdf/` están el resumen de una A4 y **Mi molino de papel**, dos A4 con base y círculo de aspas. Un adulto recorta y une ambas piezas con un broche mariposa, dejando libre el giro. Ian mueve el borde con un dedo y sigue una aspa naranja. La guía distingue el molino sin viento del cuento y la maqueta movida con la mano. Puede empezar con un solo movimiento o señalar para que lo haga el adulto. Imprimir la actividad al 100 %.

Archivos: `app/assets/stories/la-vuelta-al-mundo/`, `tmp/book5-analysis/` y `tmp/pdfs/build-vuelta-materials.py`. Verificaciones: `node scripts/verify-stories.mjs` y `node scripts/verify-pwa.mjs`.

### Cuentos: La casa del árbol

**Mis apoyos → Cuentos → La casa del árbol**, de Iris Rivera, ilustrado por Mónica Weiss. Se analizaron el PDF completo y el video familiar de 5:29.21. Ocho escenas conservan a Fernando en el rincón, el pino pequeño, sus tres amigos, los materiales y planos, el conflicto con la hermana, la casa imaginada y el riego que vacía el tanque. El cierre aclara que el pino sigue pequeño y la casa todavía no está construida. Las intenciones de los chicos se distinguen de los hechos; no se afirma que echar mucha agua haga crecer el árbol inmediatamente.

**Hoy y en el plan** compara el pino actual con la casa grande que imaginan. **El agua** explica para qué sirve el tanque y de dónde sacaron agua los chicos. Se omiten detalles secundarios, modismos y calificativos sobre la madre. El castigo y el enojo se narran como hechos del cuento. Las ilustraciones provienen del PDF y la casa terminada se identifica como una imaginación. El video usa las mismas imágenes y transiciones de página.

Diez MP3 locales leen exactamente el texto visible con la voz argentina y velocidad reducida habituales. Se aplican las reglas comunes: cinco minutos desde el final para repetir cada escena o apoyo, pausas para cambiar de cuento y techo de volumen. Se bloquean cambios, salida y renderizados mientras habla, hasta terminar o un error de audio. Se mantienen el avance manual junto al texto y las opciones simplificadas de lectura. Los cinco cuentos anteriores conservan sus datos.

En `output/pdf/` están el resumen ilustrado de una A4 y **Dos paredes y un techo**, dos A4 con guía visual y marcas de apoyo. Se juega con dos cajas pequeñas de la misma altura y un cartón que abarque ambas, dejando una entrada. El adulto prepara el espacio e Ian puede empezar colocando solo el techo, o señalar su lugar. El dibujo y las marcas son esquemas de una construcción de juego. Las ilustraciones del cuento sirven de referencia a lo que los personajes imaginan.

Archivos: `app/assets/stories/la-casa-del-arbol/`, `tmp/book6-analysis/` y `tmp/pdfs/build-casa-materials.py`. Verificaciones: `node scripts/verify-stories.mjs` y `node scripts/verify-pwa.mjs`.

### Cuentos: Una noche de muchos días

**Mis apoyos → Cuentos → Una noche de muchos días**, de Pilar Muñoz Lascano, ilustrado por Sol Cófreces. Se analizaron el PDF completo y el video familiar de 5:54.22. Ocho escenas con frases breves conservan la aldea, el dragón, la huida a la cueva, la espera, las historias, el ruido, el dragón dormido y el regreso. La fantasía se identifica desde el principio; los ronquidos explican el ruido y los dibujos de cintas azules representan la voz. Se simplifican metáforas y referencias a muertes posibles, sin inventar otra causa del desenlace.

Los apoyos **El dragón** y **El ruido** explican el personaje de fantasía y la causa del sonido. Diez audios locales coinciden con los textos. Ocho escenas y dos apoyos siguen las reglas comunes: cinco minutos desde el final para repetir su audio, pausas para cambiar de cuento, techo de volumen y bloqueo de navegación mientras habla. Se conservan el avance manual y los seis cuentos previos.

En `output/pdf/`: resumen ilustrado de una A4 y **Mi rompecabezas de la aldea**, dos A4 con tablero tenue y cuatro piezas de medidas coincidentes. Imprimir ambas al 100 %. El adulto recorta y puede colocar tres piezas para que Ian comience por la que falta. Las piezas pueden pegarse sobre cartón y reutilizarse.

Archivos: `app/assets/stories/una-noche-de-muchos-dias/`, `tmp/book7-analysis/` y `tmp/pdfs/build-noche-materials.py`. Verificaciones: `node scripts/verify-stories.mjs` y `node scripts/verify-pwa.mjs`.

### Visita a la parroquia Medalla Milagrosa

La tarjeta **Visita a la parroquia** aparece al principio de Mis apoyos. Anticipa el encuentro con profesores de Educación Física de la UCASAL, sin atribuirle actividades, materiales, horarios ni un regreso concreto que todavía no se confirmaron.

El apoyo tiene seis partes de avance manual y libre: explorar la fachada tocando entrada, torre y árbol; recorrer cinco paradas desde la escuela hasta el final de la visita; descubrir tres tarjetas sobre los profesores y las actividades; ensayar el cambio de un grupo de practicantes a otro; practicar mensajes para un acompañante; y repasar lo conocido. Cada elección conserva el avance al cambiar de parte. El final del recorrido explica que el adulto contará qué viene después.

**Ayuda, Pausa, Baño, No quiero y ¿Qué sigue?** están disponibles durante todo el recorrido. Cada botón muestra un mensaje grande con el pictograma conocido de Ian, para enseñárselo al adulto; volver conserva el paso anterior. No reproduce voz, no envía avisos ni representa una respuesta del adulto. La actividad no tiene calificaciones, límites de tiempo ni avance automático. Se puede salir y retomar durante la misma sesión o reiniciar con **Volver a jugar**.

La parte **El cambio** se agregó a partir de la devolución familiar del 28 de octubre de 2026: reconocer la foto ayudó a Ian, y la despedida de los practicantes para dar paso a otro grupo le resultó difícil. La foto permanece como referencia mientras se representan **un grupo comparte una actividad → se despide → llega otro grupo**. Ian controla el avance y puede volver un paso atrás o repetir. **Chau**, **Un momento** y **¿Qué sigue?** abren mensajes grandes; no aceleran el ensayo ni condicionan el avance. La llegada del grupo siguiente se presenta como parte del juego, sin prometer una cantidad de grupos, una duración, el regreso de los mismos profes ni la respuesta del acompañante. El adulto explica qué sigue en cada salida real. Las dos animaciones breves se omiten con movimiento reducido.

La fotografía real de la fachada se guarda localmente para funcionar sin conexión. Procedencia: [Arzobispado de Salta, Parroquia «Medalla Milagrosa»](https://arzobispadodesalta.org.ar/parroquia-medalla-milagrosa/), fotografía publicada en 2019 (`medalla1-1.jpg`); puede haber cambios en el aspecto actual del lugar. No se usan imágenes inventadas del interior ni de los profesores.

Archivos: `app/parish-visit.js`, `app/parish-visit.css` y `app/assets/supports/parish/medalla1-1.jpg`. Verificación: `node scripts/verify-parish-visit.mjs`.

### Turnos

- La pantalla principal incorpora "Mis apoyos" como tercera sección.
- El turnero permite escribir cualquier cantidad de nombres, sin fotos ni perfiles obligatorios.
- Cada participante recibe una inicial y un color estable dentro de la actividad.
- La vista activa diferencia "Ahora", "Después" y "Esperan", con avance cíclico por vueltas.
- Incluye "Terminé", "No quiero", "Atrás", "Pausa", incorporación de participantes y finalización manual.
- Los nombres se presentan de forma visual y los grupos pueden guardarse para reutilizarlos. No usa voz sintética, porque la tablet sólo reproduce de forma confiable los audios incluidos como archivos.

### Números

- El modo "Mostrar" permite elegir números del 0 al 5, del 0 al 10 o del 0 al 20.
- Cada número se presenta en grande, escrito con letras y representado con una cantidad de puntos.
- El modo "Contar" incorpora botones grandes para sumar o restar de a uno, con un máximo de 20.
- Cada valor conserva su audio en español dentro de la aplicación, con la reproducción temporalmente deshabilitada.

### Colores

- El modo "Mostrar" contiene rojo, azul, amarillo, verde, naranja, violeta, rosa, celeste, marrón, gris, blanco y negro.
- Al tocar un color, la presentación ocupa todo el panel y muestra su nombre con contraste alto.
- El modo "Elegir" selecciona un color al azar sin repetir inmediatamente el anterior.
- Cada color conserva su audio en español dentro de la aplicación, con la reproducción temporalmente deshabilitada.

### Tablas con audio limitado

- Incluye las tablas del 1 al 10, con las diez operaciones de cada tabla.
- Permite practicar una tabla puntual o mezclar las 100 operaciones; el orden siempre se arma al azar y evita repetir inmediatamente la misma operación.
- Cada operación muestra el resultado, grupos de puntos y la suma reiterada para relacionar la cuenta con una representación visual.
- "Otra operación" permanece disponible en todo momento, incluso durante la espera del audio.
- El audio sólo se reproduce al tocar el botón y existe un límite global de una reproducción cada 10 segundos. La cuenta regresiva persiste aunque se cambie de operación, se salga del apoyo o se recargue la app.
- La primera escucha de cada operación es libre. Para volver a escuchar la misma operación, Ian debe escribir su resultado con el teclado numérico; cada repetición requiere volver a escribirlo y también respeta la espera de 10 segundos. Si cambia de operación, puede escuchar la nueva cuando termine esa espera.
- Las 100 grabaciones se guardan en `app/assets/supports/audio/multiplication` para funcionar sin conexión. Se regeneran con `scripts/generate-multiplication-audio.py`.
- Durante cada locución se aplica el mismo techo de volumen que en Cuentos: máximo del 70 %, redondeado hacia abajo al escalón Android disponible, con libertad para bajar y subir dentro de ese techo. Al terminar, salir, cambiar de operación o fallar el audio se libera el límite; se recupera el volumen anterior salvo que se haya elegido otro manualmente. Se conservan la espera de diez segundos y el requisito de responder para repetir.

## Matemáticas: círculo y circunferencia

La actividad "¿Círculo o circunferencia?" comienza con una comparación visual de alto contraste: círculo significa "borde + interior" y circunferencia significa "solo borde". Después mezcla diez desafíos tomados de un banco de 48 situaciones.

Los desafíos tienen cuatro formatos:

- Clasificar una figura geométrica con distintos tamaños, colores y posiciones.
- Observar una parte rosa señalada en un objeto cotidiano, por ejemplo la superficie de una galletita o el borde de un plato.
- Transformar una figura eligiendo si hay que pintar o borrar el interior.
- Aplicar la definición para encontrar la figura correcta entre un círculo, una circunferencia, un arco abierto y un óvalo.

La sesión base contiene tres clasificaciones, tres objetos señalados, dos transformaciones y dos búsquedas por definición. También queda equilibrada entre círculo y circunferencia. Al responder, todas las opciones se bloquean y solamente se marca la elección realizada; no se puede probar de nuevo ni eliminar opciones. Si hay un error, la app explica la regla después del bloqueo y vuelve a evaluar el mismo tipo de razonamiento varias pantallas después con una situación diferente. El formato fallado también queda priorizado para la próxima sesión.

## Matemáticas: ángulos con Pac-Man

La actividad "Ángulos con Pac-Man" reúne cuatro juegos consecutivos: seis desafíos para reconocer, dos para comparar, ocho para construir y seis para usar giros.

- Reconocer ángulos agudos, rectos, obtusos y llanos en bocas de distintos tamaños y orientaciones.
- Comparar visualmente las aberturas de 25° y 85° para elegir cuál se abre más o menos.
- Construir ángulos de 25° a 180° abriendo la boca con un control táctil, incluidos 25° y 85°.
- Interpretar giros de 45°, 90°, 135°, 180°, 270° y 360° dentro de un pequeño laberinto.

Cada pantalla usa una consigna corta, tres opciones como máximo y una referencia visual de 90°. Una respuesta equivocada muestra una pista breve y permite volver a intentar sin avanzar. Al acertar, tres fantasmitas pequeños se ubican delante de la boca y Pac-Man avanza en esa misma dirección para comerlos. Las animaciones y recorridos se realizan con GSAP y respetan la preferencia del sistema para reducir movimiento.

## Matemáticas: nuevas actividades de geometría

Las siguientes propuestas aparecen como cuatro tarjetas separadas dentro de Matemáticas. Cada una se inicia y termina de manera independiente:

- "Cruces del laberinto": seis pares de rectas para clasificar como paralelas, perpendiculares u oblicuas, más dos giros táctiles a 90° y 45°.
- "¿Quién rueda?": seis cuerpos geométricos para decidir si ruedan suavemente. La esfera, el cilindro apoyado sobre su lado y el cono apoyado sobre su lado ruedan; el cubo, la pirámide y el prisma rectangular no ruedan suavemente.
- "Explorá el cubo": identificar una cara, una arista y un vértice; contar sus 6 caras, 12 aristas y 8 vértices; reconocer que todas sus aristas son iguales. Las aristas ocultas se dibujan punteadas.
- "Armá el cubo": cuatro desarrollos planos. En cada uno se elige dónde agregar la sexta cara y después se toca "Plegar el cubo" para ver el cuerpo armado.

Todas usan dibujos vectoriales incluidos en el código, opciones grandes para tocar y pistas breves si hay un error. Los cuerpos que ruedan se animan al acertar, y las animaciones se desactivan cuando el sistema pide reducir movimiento.

## Tecnología: el laboratorio de Pac-Man

### Litros con Pac-Man

Tres actividades basadas en las fichas de litros, medios litros, cuartos y capacidad. Se encuentran en **Escuela → Tecnología**; cada una tiene cinco desafíos y una explicación que se puede repetir. Las demostraciones no cuentan como respuestas. No hay audio, límite de tiempo ni avance automático.

- **Llená un litro:** verter medios y cuartos, completar cantidades iniciales y combinar ambas medidas. Se puede deshacer el último paso. La jarra tiene marcas de 1/4, 1/2, 3/4 y 1 L; si la medida elegida no entra se conserva el agua y se permite cambiarla.
- **Botellas que se juntan:** sumar botellas de un litro y medios litros. Se puede resolver mirando las botellas o reunir su agua, de a una, en un depósito graduado de seis litros. La cantidad de botellas es distinta de la cantidad de litros; las botellas volcadas quedan atenuadas y señaladas.
- **¿Cabe más o menos?:** comparar la capacidad indicada de vasos, mamaderas, baldes, regaderas, jarras y una botella con un litro. Al medir, un recipiente pequeño se llena y el resto permanece en la jarra de origen; uno grande conserva lugar libre y la botella de un litro se llena justo. Las ilustraciones cotidianas aclaran su carácter ilustrativo para no deducir la capacidad del tamaño del dibujo.

Las animaciones vectoriales locales duran unos cuatro segundos por trasvase: la jarra se inclina, sale un chorro con reflejo, baja el nivel de origen, sube el de destino y aparecen gotas y burbujas. La pérdida y la ganancia corresponden a la misma cantidad, expresada internamente en cuartos de litro enteros. Pac-Man acompaña y señala el desafío actual. Durante cada trasvase se deshabilitan las acciones del desafío y se mantiene disponible la salida; al salir se cancela la animación. La preferencia de movimiento reducido muestra directamente los estados finales.

Las respuestas son editables antes de comprobar. Cada desafío admite una sola confirmación y conserva en la sesión si se usó el apoyo visual. Los tres temas se incorporan a las instalaciones existentes mediante la normalización habitual, sin duplicados ni cambios en los temas personalizados. Código: `app/capacity-lab.js` y `app/capacity-lab.css`. Verificación: `node scripts/verify-capacity-lab.mjs`.

### Peso y longitud

Cuatro talleres independientes inspirados en las fichas de peso y longitud aportadas por Pablo. Cada taller presenta tres mesas en un solo tablero: Ian decide el orden, elige y puede cambiar sus respuestas antes de tocar «Comprobar tablero». No hay audio, cuenta regresiva ni avance automático. Una vez confirmado, todas las respuestas quedan bloqueadas, se cuenta el primer intento y aparece una explicación por mesa. Después puede volver a los talleres o pedir otro tablero.

- **El taller del peso:** comparar objetos cotidianos y leer balanzas para reconocer «pesa más», «pesa menos» y «pesan igual». Los platos y las explicaciones corresponden a la misma comparación. Los dibujos cotidianos aclaran que no están a escala real.
- **La herramienta justa:** elegir entre balanza, regla y cinta métrica según la tarea. Las consignas distinguen el borde rígido para medir y trazar de la flexibilidad necesaria para rodear un objeto. Las opciones cambian de lugar y no se eliminan instrumentos al usarlos.
- **Medidas con cubitos:** contar unidades iguales colocadas sin huecos, con una fila de referencia. Las longitudes y los objetos varían y se elige entre 1 y 10.
- **La regla de Pac-Man:** leer centímetros en una regla de 0 a 10. Una mesa comienza en 2 para trabajar la diferencia entre la marca final y la longitud. Los extremos del objeto y las guías comparten las mismas coordenadas.

Ilustraciones vectoriales propias, recursos offline y animaciones breves con GSAP que respetan movimiento reducido. La materia se incorpora automáticamente a las instalaciones existentes sin borrar las otras materias ni temas personalizados. Verificación: `node scripts/verify-technology.mjs`.

## Escuela: seis nuevas misiones de Pac-Man

Cada materia incorpora una tarjeta nueva, al principio de su lista, con cinco desafíos por partida:

- **Lengua — Mensajes del laberinto:** identificar el sujeto y el predicado completo de una oración. Las opciones incluyen fragmentos plausibles y siguen disponibles para ambos casilleros.
- **Cs Naturales — El depósito de Pac-Man:** clasificar tres objetos por su material, con materiales repetidos y confirmación conjunta.
- **Cs Sociales — La ruta de los sonidos:** construir un recorrido de tres objetos a partir de sus onomatopeyas escritas. Se pueden repetir objetos; usarlos no los quita del banco.
- **Matemáticas — Energía para el laberinto:** multiplicar grupos iguales de puntos y escribir el total con un teclado numérico, sin resultados para elegir.
- **Inglés — La mochila de Pac-Man:** combinar tres pistas de vocabulario conocido: número, color y útil. Se confirma el pedido completo.
- **Tecnología — El puente a medida:** leer una regla con un comienzo distinto de cero y escribir la distancia entre las orillas, sin confundirla con la marca final.

Todas permiten editar antes de **Comprobar**, bloquean la respuesta completa después y explican el resultado. No hay reintentos sobre la misma consigna ni pistas de acierto por cada selección. Las partidas rotan su banco, no repiten consignas dentro de un recorrido y no tienen reloj, vidas ni audio. Un acierto anima a Pac-Man recorriendo el laberinto, comiendo puntos y una cereza, con felicitación visual. Los movimientos son breves y respetan movimiento reducido. Los recursos están incluidos para uso sin conexión y la migración agrega una tarjeta por materia sin duplicarla al abrir nuevamente.

Verificación: `node scripts/verify-school-arcade.mjs`.

## Me Comunico

La pantalla inicial tambien tiene una tarjeta "Me Comunico" con un comunicador visual inmersivo por pictogramas ARASAAC.

La pantalla permite:

- Señalar un mensaje rápido y verlo inmediatamente en pantalla completa: Sí, No, tengo hambre, estoy enojado, hola, adiós, no quiero, necesito ir al baño y necesito ayuda.
- Armar una frase eligiendo un iniciador y un picto relacionado.
- Usar los iniciadores "Yo quiero", "Me duele", "Me siento" y "Yo tengo". El acceso rápido "No quiero" también permite cambiar entre "quiero" y "no quiero" cuando ya se eligió algo.
- Mostrar pictos relacionados con cada iniciador, con opciones y textos ajustados para formar frases naturales, como "Me duele la cabeza" o "Me siento con miedo".
- Quitar un picto tocandolo dentro de la frase.
- Limpiar toda la frase con un unico boton.

Los nueve mensajes rápidos usan audios guardados dentro de la app con la misma voz española de otros apoyos. Se regeneran con `scripts/generate-communication-audio.py`. El mensaje visual aparece siempre de inmediato; si un audio todavía está en espera, el mensaje se muestra sin voz. Cada picto tiene una espera progresiva propia desde el final del audio: 2, 5, 10, 30 y luego 60 segundos para las siguientes reproducciones. Tras cinco minutos sin reproducir ese picto, su secuencia vuelve a comenzar. La espera persiste al salir o recargar la app; los toques durante la espera no avanzan el nivel. Hay una pausa general de dos segundos después de cualquier audio y Tablas conserva además su límite de diez segundos. Los mensajes armados con iniciadores y el texto libre siguen siendo visuales.

Los pictogramas estan guardados dentro de `app/assets/pictos`, asi que la app puede funcionar sin internet. Los pictogramas son de ARASAAC: Sergio Palao / ARASAAC - Gobierno de Aragon, licencia CC BY-NC-SA 4.0.

Dos alimentos especificos usan fotografias de Wikimedia Commons porque no habia un pictograma unico que representara claramente la preparacion completa:

- `sandwich-milanesa.jpg`: fotografia de Horacio Cambeiro, [Sandwich de milanesa](https://commons.wikimedia.org/wiki/File:Sandwich_de_milanesa.jpg), licencia CC BY-SA 4.0. La copia incluida fue redimensionada por Wikimedia.
- `sandwich-salame-queso.jpg`: fotografia de Simplus Menegati, [Sanduiche de salame e queijo](https://commons.wikimedia.org/wiki/File:Sandu%C3%ADche_de_salame_e_queijo_no_Bairro_dos_Fran%C3%A7as,_Ortigueira,_Paran%C3%A1.1.jpg), licencia CC BY-SA 4.0. La copia incluida fue redimensionada por Wikimedia.

## Recomendacion de uso

Primero conviene cargar pocos ejercicios por tema, probarlos con Ian y ajustar el nivel. Despues se pueden agregar mas temas desde el codigo y, cuando la app avance, sumar registro de progreso.
## Mi familia en Inglés

Las tres actividades personales están en `app/english-family.js` y se agregan al principio de Inglés también al actualizar instalaciones existentes, conservando los demás temas y ajustes.

- **My family · Mi árbol:** diez fotos, incluidas las de Ian. Abuela paterna → papá; abuelo y abuela maternos → mamá; Camilo y Aimar debajo de papá, Ian al centro, Iara y María debajo de mamá. Tocar una foto muestra su palabra; el botón Escuchar reproduce el audio. Los grupos Camilo + Aimar e Iara + María presentan los plurales.
- **¿Quién es? · Mi familia:** ocho rondas, una por palabra, con tres opciones visuales y orden variable. Una foto para singular; dos fotos distintas para plural.
- **Uno o varios · Mi familia:** cuatro rondas con sister/sisters y brother/brothers. Se puede cambiar la selección antes de Comprobar; después queda bloqueada y se muestra la traducción. No se avanza automáticamente.

Vocabulario: grandmother (abuela), grandfather (abuelo), mother (mamá), father (papá), sister (hermana), sisters (hermanas), brother (hermano), brothers (hermanos).

Fotos originales en `app/assets/english/family/photos`; ocho MP3 locales en `app/assets/english/family/audio`. Se generan con `scripts/generate-family-audio.py`, **es-AR-ElenaNeural**, velocidad **-12%**, igual que los atajos de Me comunico. Requiere edge-tts 7.3.1 o posterior. La tablet no usa el servicio de síntesis: reproduce los archivos incluidos en la APK.

El audio reutiliza la exclusión y pausa global de Me comunico (dos segundos) y sus límites por palabra: 2, 5, 10, 30 y 60 segundos; tras cinco minutos de inactividad la secuencia reinicia. La clave `family-<palabra>` comparte la espera entre árbol, ejercicios y personas del mismo parentesco. Las esperas se guardan al empezar y se ajustan al terminar o interrumpir; no se borran al salir. El audio no se superpone ni se dispara al tocar una foto. Un fallo permite reintentar sin consumir una escucha. El interruptor de las actividades antiguas permanece separado.

Verificación específica: `node scripts/verify-english-family.mjs`. Incluye migración, correspondencia de fotos, singular/plural, recorridos completos, doble toque, persistencia, reloj y fallos de audio. Los recursos también se incluyen en el caché offline de la PWA.

## Mis apoyos: Pac-Man explorador · Islas de código

Una aventura original de programación visual en **Mis apoyos → Pac-Man explorador**. Incluye doce misiones distribuidas en tres mundos: **El jardín secreto**, **Las puertas del sol** y **El archipiélago lunar**. Las primeras cuatro trabajan secuencias de movimientos y recoger cerezas; las siguientes cuatro agregan llaves, desvíos y puertas; las últimas cuatro introducen repetir una acción o un grupo de acciones dos, tres o cuatro veces. Los objetivos se resuelven con las reglas del mapa, aceptando cualquier programa válido.

Los bloques grandes se agregan tocándolos. Al seleccionar uno se puede subir, bajar o quitar; **Borrar plan** vacía el programa y **Volver al inicio** conserva los bloques. **Ejecutar** anima el recorrido, destacando cada bloque, y **Ver un paso** ejecuta una sola instrucción. **Pausa** termina el paso actual antes de detenerse. Si un bloque encuentra un obstáculo o intenta una acción fuera de lugar, se destaca y se puede editar y volver a intentar la misma misión. No hay notas, vidas, audio ni reloj. La próxima misión se abre a mano, después de resolver la actual.

La biblioteca de islas, los mapas y los personajes usan dibujos vectoriales propios. GSAP anima la entrada, los pasos, el salto de Pac-Man, la recogida de objetos, las puertas y el descubrimiento de una isla. **Menos movimiento** y la preferencia del sistema reducen las animaciones manteniendo la misma distribución. La biblioteca y el editor se adaptan a tablet horizontal y pantallas angostas.

El progreso, el programa y la posición de ejecución se guardan en `ian-pacman-explorer-v1`, separados de los datos escolares. Al cerrar o abandonar una ejecución se conserva una pausa; al recuperar se reconstruye y valida el recorrido ya ejecutado. Los recursos están incluidos en el caché offline y en la APK. Archivos: `app/pacman-explorer.js` y `app/pacman-explorer.css`. Verificaciones: `node scripts/verify-pacman-explorer.mjs` y `node scripts/verify-pacman-explorer-browser.mjs` (agregar `--device` para la A8 conectada). La propuesta toma como referencia las secuencias y repeticiones de [Program.AR](https://program.ar/como-acercar-pilas-bloques-a-tus-clases/); no requiere abrir un servicio externo.

## Mis apoyos: Memoria con amigos

Juego de parejas inspirado en la imagen de Pac-Man compartida por Pablo. Los seis personajes se redibujan como vectores de pie: Pac-Man, fantasmas celeste, rojo, rosa, naranja y azul. Hay partidas de 2, 4 y 6 parejas; cada mazo mezcla dos copias de cada personaje y siempre incluye a Pac-Man.

Ian descubre dos cartas. Si coinciden, quedan visibles con una marca y se suma una pareja. Si son diferentes, siguen a la vista hasta tocar **Seguir buscando**. **Mirar las tarjetas** muestra el tablero hasta tocar **Ya las miré**, sin sumar parejas. No hay audio, reloj, penalizaciones ni avance automático. **Pausa** cubre el tablero y conserva la partida; salir y volver en la misma sesión también la conserva. Al cambiar de nivel se puede retomar la partida previa o empezar una nueva. Recargar la aplicación inicia una sesión nueva.

Los dibujos y GSAP están incluidos en la app y en su caché offline. Las cartas se dan vuelta con CSS; GSAP anima la entrada y los aciertos. **Menos movimiento** y la preferencia de movimiento reducido del dispositivo desactivan las animaciones. Recursos en `app/pacman-memory.js` y `app/pacman-memory.css`. Verificación: `node scripts/verify-pacman-memory.mjs`.
