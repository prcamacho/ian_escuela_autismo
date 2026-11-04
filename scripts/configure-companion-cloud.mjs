import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const railway = process.argv[2];
if (!railway) throw new Error("Indicar el ejecutable oficial de Railway.");
const root = fileURLToPath(new URL("../", import.meta.url));
process.loadEnvFile(new URL("../.env", import.meta.url));
const device = JSON.parse(await readFile(new URL("../.companion-device.json", import.meta.url), "utf8"));
if (!process.env.OPENAI_API_KEY || !/^[a-f0-9]{64}$/.test(device.token)) throw new Error("Falta la configuración local del servicio.");
for (const [key, value] of [["OPENAI_API_KEY", process.env.OPENAI_API_KEY], ["COMPANION_DEVICE_TOKEN", device.token]]) {
  const result = spawnSync(railway, ["variable", "set", key, "--stdin", "--skip-deploys", "--service", "voz", "--environment", "production", "--project", "090df0f8-fe0f-42a9-953b-5d01fb59692e"], { cwd: root + "/.companion-deploy", input: value, encoding: "utf8", windowsHide: true, timeout: 60000 });
  // The CLI may echo secret values: never print its stdout or stderr.
  if (result.status !== 0) {
    const diagnostic = (result.stderr || result.error?.code || "").replaceAll(process.env.OPENAI_API_KEY, "[redactado]").replaceAll(device.token, "[redactado]").replace(/sk-[A-Za-z0-9_-]+/g, "[redactado]").slice(0, 1200);
    throw new Error(`No se pudo configurar ${key}: ${diagnostic}`);
  }
  console.log(`${key}: configurada en el servicio voz, sin mostrar su valor.`);
}
