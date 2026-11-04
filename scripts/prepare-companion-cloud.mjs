import { mkdir, copyFile, writeFile, readFile } from "node:fs/promises";
import { randomBytes } from "node:crypto";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const staging = resolve(root, ".companion-deploy");
// Explicit allowlist: no .env, credentials, school content or Android files.
for (const file of ["companion/server.mjs", "companion/provider.mjs", "companion/session-config.mjs", "companion/public/conversation.mjs", "scripts/serve-companion-cloud.mjs"]) {
  const destination = resolve(staging, file);
  await mkdir(dirname(destination), { recursive: true });
  await copyFile(resolve(root, file), destination);
}
await writeFile(resolve(staging, "package.json"), JSON.stringify({ name: "ian-companion-voice", version: "1.0.0", private: true, type: "module", scripts: { start: "node scripts/serve-companion-cloud.mjs" }, engines: { node: ">=22" }, dependencies: { ws: "8.22.0" } }, null, 2));
await writeFile(resolve(staging, "Dockerfile"), 'FROM node:22-alpine\nWORKDIR /app\nCOPY package.json ./\nRUN npm install --omit=dev --ignore-scripts\nCOPY companion ./companion\nCOPY scripts ./scripts\nUSER node\nCMD ["node", "scripts/serve-companion-cloud.mjs"]\n');
await writeFile(resolve(staging, "railway.json"), JSON.stringify({ build: { builder: "DOCKERFILE" }, deploy: { healthcheckPath: "/health", healthcheckTimeout: 60, restartPolicyType: "ON_FAILURE", restartPolicyMaxRetries: 3 } }, null, 2));
const credentials = resolve(root, ".companion-device.json");
try { await readFile(credentials); }
catch (error) {
  if (error.code !== "ENOENT") throw error;
  await writeFile(credentials, JSON.stringify({ token: randomBytes(32).toString("hex"), endpoint: "http://127.0.0.1:4180" }, null, 2), { flag: "wx", mode: 0o600 });
}
console.log("Servicio preparado en .companion-deploy, sin claves ni datos escolares.");
