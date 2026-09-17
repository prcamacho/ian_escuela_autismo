import { access, readFile } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const appRoot = path.join(projectRoot, "app");
const manifest = JSON.parse(await readFile(path.join(appRoot, "manifest.json"), "utf8"));

for (const field of ["id", "start_url", "scope", "name", "short_name", "display"]) {
  if (!manifest[field]) throw new Error(`Falta ${field} en manifest.json`);
}

for (const size of ["192x192", "512x512"]) {
  const icon = manifest.icons?.find((candidate) => candidate.sizes === size && candidate.type === "image/png");
  if (!icon) throw new Error(`Falta el icono PNG ${size}`);
  await access(path.join(appRoot, icon.src));
}

const workerSource = await readFile(path.join(appRoot, "service-worker.js"), "utf8");
const workerContext = {
  self: { addEventListener() {} },
  caches: {},
  fetch() {},
  URL,
};
vm.runInNewContext(`${workerSource}\nglobalThis.__APP_FILES = APP_FILES;`, workerContext);

const missing = [];
for (const relativeFile of workerContext.__APP_FILES) {
  const cleanPath = relativeFile.replace(/^\.\//, "");
  const target = path.join(appRoot, cleanPath || "index.html");
  try {
    await access(target);
  } catch {
    missing.push(relativeFile);
  }
}

if (missing.length) {
  throw new Error(`El service worker referencia archivos inexistentes:\n${missing.join("\n")}`);
}

console.log(`PWA verificada: ${workerContext.__APP_FILES.length} recursos disponibles.`);
