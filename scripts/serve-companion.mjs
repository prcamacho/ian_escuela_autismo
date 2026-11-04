import { createCompanionServer } from "../companion/server.mjs";
import { readFile } from "node:fs/promises";

const port = Number(process.env.COMPANION_PORT || 4180);
if (!Number.isInteger(port) || port < 1024 || port > 65535) throw new Error("COMPANION_PORT debe ser un puerto entre 1024 y 65535.");
let deviceToken = "";
try { deviceToken = JSON.parse(await readFile(new URL("../.companion-device.json", import.meta.url), "utf8")).token; }
catch (error) { if (error.code !== "ENOENT") throw error; }
const app = createCompanionServer({ deviceToken });
app.server.listen(port, "127.0.0.1", () => {
  console.log(`Mi compañero: http://localhost:${port}/companion/`);
  console.log(`Inicio de la app: http://localhost:${port}/`);
  console.log(process.env.OPENAI_API_KEY ? "Voz configurada. La conexión comienza al tocar Quiero hablar." : "Falta OPENAI_API_KEY en .env. La vista previa está disponible sin voz.");
});
app.server.on("error", (error) => { console.error(error.code === "EADDRINUSE" ? "El puerto está ocupado. Elegí otro COMPANION_PORT." : "No se pudo iniciar el servidor local."); process.exitCode = 1; });
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, async () => { await app.shutdown(); });
