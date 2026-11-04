import { spawnSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { randomBytes } from "node:crypto";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const tablets = { ulefone: "3109RH1010027680", a8: "R8MT100KBQD" };
const tablet = process.argv.find(arg => arg.startsWith("--tablet="))?.slice(9);
if (!tablets[tablet]) throw new Error("Elegí --tablet=ulefone o --tablet=a8.");
const adb = join(process.env.ANDROID_HOME || join(process.env.LOCALAPPDATA, "Android", "Sdk"), "platform-tools", "adb.exe");
const key = join(process.env.USERPROFILE, ".android", "adbkey");
const serial = tablets[tablet];
function run(args, input) {
  const result = spawnSync(adb, ["-s", serial, ...args], { input, encoding: "utf8", windowsHide: true, env: { ...process.env, ADB_VENDOR_KEYS: key } });
  if (result.status !== 0) throw new Error("No se pudo configurar la tablet autorizada. Revisá ADB y la instalación.");
  return result.stdout;
}
if (run(["get-state"]).trim() !== "device") throw new Error("Tablet no autorizada.");
if (!run(["shell", "dpm", "list-owners"]).includes("com.ian.escuela/.KioskDeviceAdminReceiver")) throw new Error("Primero configurar el kiosco de esta tablet.");
const configFile = fileURLToPath(new URL("../.companion-device.json", import.meta.url));
let device;
try { device = JSON.parse(await readFile(configFile, "utf8")); }
catch (error) { if (error.code !== "ENOENT") throw error; }
if (!device) device = { token: randomBytes(32).toString("hex"), endpoint: "http://127.0.0.1:4180" };
if (!/^[a-f0-9]{64}$/.test(device.token)) throw new Error("Credencial local inválida; no se reemplazó.");
const endpointArg = process.argv.find(arg => arg.startsWith("--endpoint="))?.slice(11);
if (endpointArg) {
  const url = new URL(endpointArg);
  if (!(url.protocol === "https:" || endpointArg === "http://127.0.0.1:4180") || url.username || url.password || url.search || url.hash || !["", "/"].includes(url.pathname)) throw new Error("El servidor debe ser un origen HTTPS.");
  device.endpoint = url.origin;
}
await writeFile(configFile, JSON.stringify(device, null, 2) + "\n", { mode: 0o600 });
const config = tablet === "ulefone" ? { enabled: true, ...device } : { enabled: false };
run(["shell", "run-as", "com.ian.escuela", "mkdir", "-p", "no_backup"]);
run(["shell", "run-as", "com.ian.escuela", "sh", "-c", "'umask 077; cat > no_backup/companion.json'"], JSON.stringify(config));
const installed = JSON.parse(run(["exec-out", "run-as", "com.ian.escuela", "cat", "no_backup/companion.json"]));
if (JSON.stringify(installed) !== JSON.stringify(config)) throw new Error("La configuración no coincide; revisar antes de continuar.");
console.log(`${tablet}: compañero ${installed.enabled ? "habilitado" : "deshabilitado"}. Credencial verificada sin mostrarla.`);
