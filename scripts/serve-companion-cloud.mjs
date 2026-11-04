import { createCompanionServer } from "../companion/server.mjs";

if (!process.env.OPENAI_API_KEY) throw new Error("Falta configurar el servicio de voz.");
const port = Number(process.env.PORT || 4180);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("Puerto inválido.");
const app = createCompanionServer({ apiOnly: true, deviceToken: process.env.COMPANION_DEVICE_TOKEN });
app.server.listen(port, "0.0.0.0", () => console.log("Servicio de voz listo. Acceso limitado a la tablet autorizada."));
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, async () => { await app.shutdown(); });
