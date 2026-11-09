# Ian Escuela App

Este proyecto es la app de Ian para las tablets Samsung A8 y Ulefone. Conservar los datos escolares, la firma Android y Device Owner. Antes de trabajar con las tablets, leer `docs/TABLET_KIOSCO.md` y `docs/TABLETS_MANTENIMIENTO.md`.

## Autorizacion y permisos de ejecucion

- Un pedido del usuario de actualizar o instalar la app ya autoriza esa actualizacion. No volver a pedirle que confirme la misma intencion.
- Distinguir esa autorizacion de la politica tecnica de la sesion. El consentimiento del usuario no cambia por si solo el sandbox ni habilita una herramienta prohibida.
- Si la politica efectiva permite solicitar ejecucion fuera del sandbox, usar la solicitud de permiso de la herramienta para la operacion concreta autorizada. No abandonar la tarea ante el primer error de sockets.
- Si la politica efectiva prohibe esa solicitud, informarlo una sola vez y explicar el impedimento exacto. No intentar modificar las restricciones, buscar otra herramienta para eludirlas ni pedir al usuario una confirmacion que no puede habilitarlas.
- No asumir que los permisos de otro chat se heredan. La opcion global `windows.sandbox = "elevated"` tampoco demuestra que un comando se ejecute fuera del sandbox.

## Inicio de una conversacion que va a actualizar la tablet

- Al comienzo de un trabajo cuya entrega incluya instalar o verificar en la tablet, revisar la politica efectiva de esta sesion y ejecutar la comprobacion local antes de desarrollar los cambios. No esperar hasta el final para descubrir que la instalacion esta bloqueada.
- Si falla la comprobacion y la politica permite solicitar ejecucion autorizada, solicitarla mediante la herramienta para la operacion concreta. Si la politica prohibe esa solicitud, informar inmediatamente la limitacion; se puede continuar con el trabajo de codigo permitido, dejando clara la parte de instalacion pendiente.
- `allow` es el resultado de una revision por accion, no un modo que este archivo pueda imponer. Estas instrucciones no conceden acceso ni sustituyen las politicas del entorno.
- El 9 de noviembre de 2026 la configuracion local general ya tenia `approval_policy = "on-request"`, `approvals_reviewer = "guardian_subagent"` y `sandbox_mode = "workspace-write"`. Aun asi, esta conversacion recibio una politica granular que prohibia escalar. No proponer reescribir los mismos valores como si eso garantizara corregir una politica de sesion que los sobreescribe.
- No prometer que activar un modo general cambia un chat existente. No indicar un selector de permisos sin comprobar que este disponible en la interfaz que esta usando el usuario.

## Comprobacion previa de las tablets

1. Comprobar primero si la sesion admite conexiones locales. `npm run tablet:check` lo diagnostica sin tocar la tablet ni iniciar ADB. `tablet:update:*` incorpora esta comprobacion automaticamente.
2. Si falla esa comprobacion, todavia no se consultaron los dispositivos USB. No atribuirlo al cable, a la autorizacion de la tablet, a una actualizacion de ADB ni al codigo de la app sin evidencia.
3. Consultar la politica efectiva de la sesion y proceder segun la seccion anterior. No repetir el mismo intento bajo los mismos permisos ni reiniciar ADB indefinidamente.
4. Si se puede consultar ADB, distinguir fallo del servidor, fallo de enumeracion, dispositivo ausente y dispositivo `unauthorized`. Son problemas diferentes.
5. Identificar siempre la tablet por nombre y serie. Actualizar con `adb install -r`; no desinstalar la app ni regenerar las llaves. Usar `npm run tablet:update:a8` o `npm run tablet:update:ulefone` segun corresponda.
6. Verificar instalacion y kiosco antes de afirmar que la actualizacion esta en la tablet. Separar claramente codigo preparado, APK compilada e instalacion verificada.

## Comunicacion ante bloqueos

- Informar pronto la causa comprobada, lo que sigue pendiente y la via permitida para continuar. Evitar vueltas de confirmaciones y pruebas repetidas.
- Si el usuario dice que otro chat acaba de conseguirlo, revisar primero el registro de esa operacion y su modo de ejecucion. No inventar cambios de configuracion o de hardware.
- No prometer una transferencia a otro chat sin comprobar que esa capacidad este disponible y contar con autorizacion del usuario para enviarle un mensaje.
- El incidente del 9 de noviembre de 2026 quedo documentado en `docs/TABLET_KIOSCO.md`: el otro chat obtuvo autorizacion para `require_escalated`; esta conversacion tenia `sandbox_approval: false` y la solicitud fue rechazada. Los scripts de instalacion y ADB no explicaban esa diferencia.
