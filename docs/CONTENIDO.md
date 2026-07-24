# Contenido educativo

La app esta preparada para que los temas y ejercicios se mantengan desde el codigo. Por ahora no hay editor visible para Ian, asi la interfaz queda limpia y sin distracciones.

## Materias

Las materias son fijas y se cambian solamente editando el codigo:

- Lengua.
- Cs Naturales.
- Cs Sociales.
- Matematicas.

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

## Recomendacion de uso

Primero conviene cargar pocos ejercicios por tema, probarlos con Ian y ajustar el nivel. Despues se pueden agregar mas temas desde el codigo y, cuando la app avance, sumar registro de progreso.
