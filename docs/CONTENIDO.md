# Contenido educativo

La app esta preparada para que los temas y ejercicios se mantengan desde el codigo. Por ahora no hay editor visible para Ian, asi la interfaz queda limpia y sin distracciones.

## Materias

Las materias son fijas y se cambian solamente editando el codigo:

- Lengua.
- Cs Naturales.
- Cs Sociales.
- Matematicas.
- Inglés.

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

## Inglés

La materia Inglés incluye tres actividades de vocabulario: colores, útiles escolares y números del 1 al 10. Cada inicio arma seis consignas desde un banco mayor, cambia la posición de las cuatro opciones y reproduce una pronunciación guardada dentro de la app.

Si Ian se equivoca, la respuesta correcta no se revela ni se eliminan opciones. La app avanza automáticamente a otra palabra y guarda la palabra fallada para reforzarla más adelante. Cuando quedan al menos dos consignas, puede volver a presentarla después de esas consignas con opciones reordenadas; en caso contrario queda priorizada para la próxima sesión.

Los audios están en `app/assets/english/audio` y se pueden regenerar con `scripts/generate-english-audio.py` usando `edge-tts`.

## Matemáticas: círculo y circunferencia

La actividad "¿Círculo o circunferencia?" comienza con una comparación visual de alto contraste: círculo significa "borde + interior" y circunferencia significa "solo borde". Después mezcla diez desafíos tomados de un banco de 48 situaciones.

Los desafíos tienen cuatro formatos:

- Clasificar una figura geométrica con distintos tamaños, colores y posiciones.
- Observar una parte rosa señalada en un objeto cotidiano, por ejemplo la superficie de una galletita o el borde de un plato.
- Transformar una figura eligiendo si hay que pintar o borrar el interior.
- Aplicar la definición para encontrar la figura correcta entre un círculo, una circunferencia, un arco abierto y un óvalo.

La sesión base contiene tres clasificaciones, tres objetos señalados, dos transformaciones y dos búsquedas por definición. También queda equilibrada entre círculo y circunferencia. Al responder, todas las opciones se bloquean y solamente se marca la elección realizada; no se puede probar de nuevo ni eliminar opciones. Si hay un error, la app explica la regla después del bloqueo y vuelve a evaluar el mismo tipo de razonamiento varias pantallas después con una situación diferente. El formato fallado también queda priorizado para la próxima sesión.

## Matemáticas: ángulos con Pac-Man

La actividad "Ángulos con Pac-Man" reúne tres juegos consecutivos de seis desafíos cada uno:

- Reconocer ángulos agudos, rectos, obtusos y llanos en bocas de distintos tamaños y orientaciones.
- Construir ángulos de 30° a 180° abriendo la boca con un control táctil.
- Interpretar giros de 45°, 90°, 135°, 180°, 270° y 360° dentro de un pequeño laberinto.

Cada pantalla usa una consigna corta, tres opciones como máximo y una referencia visual de 90°. Una respuesta equivocada muestra una pista breve y permite volver a intentar sin avanzar. Al acertar, tres fantasmitas pequeños se ubican delante de la boca y Pac-Man avanza en esa misma dirección para comerlos. Las animaciones y recorridos se realizan con GSAP y respetan la preferencia del sistema para reducir movimiento.

## Me Comunico

La pantalla inicial tambien tiene una tarjeta "Me Comunico" con un comunicador visual inmersivo por pictogramas ARASAAC.

La pantalla permite:

- Senalar pictos rapidos anclados arriba: SI, NO, tengo hambre, estoy enojado, hola, adios, quiero agua, necesito ir al bano y necesito ayuda.
- Armar una frase tocando pictos en orden.
- Usar iniciadores: "Yo quiero", "Necesito", "Me duele", "Me siento", "Yo no quiero" y "Yo tengo".
- Mostrar pictos relacionados segun el iniciador elegido, con grupos simples para necesidades, actividades, personas, cuerpo, emociones, escuela y sensaciones.
- Quitar un picto tocandolo dentro de la frase.
- Limpiar toda la frase con un unico boton.

No usa voz ni lectura automatica por parlante.

Los pictogramas estan guardados dentro de `app/assets/pictos`, asi que la app puede funcionar sin internet. Los pictogramas son de ARASAAC: Sergio Palao / ARASAAC - Gobierno de Aragon, licencia CC BY-NC-SA 4.0.

Dos alimentos especificos usan fotografias de Wikimedia Commons porque no habia un pictograma unico que representara claramente la preparacion completa:

- `sandwich-milanesa.jpg`: fotografia de Horacio Cambeiro, [Sandwich de milanesa](https://commons.wikimedia.org/wiki/File:Sandwich_de_milanesa.jpg), licencia CC BY-SA 4.0. La copia incluida fue redimensionada por Wikimedia.
- `sandwich-salame-queso.jpg`: fotografia de Simplus Menegati, [Sanduiche de salame e queijo](https://commons.wikimedia.org/wiki/File:Sandu%C3%ADche_de_salame_e_queijo_no_Bairro_dos_Fran%C3%A7as,_Ortigueira,_Paran%C3%A1.1.jpg), licencia CC BY-SA 4.0. La copia incluida fue redimensionada por Wikimedia.

## Recomendacion de uso

Primero conviene cargar pocos ejercicios por tema, probarlos con Ian y ajustar el nivel. Despues se pueden agregar mas temas desde el codigo y, cuando la app avance, sumar registro de progreso.
