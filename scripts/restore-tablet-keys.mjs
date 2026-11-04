import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { scryptSync, createDecipheriv } from "node:crypto";
import { join, resolve } from "node:path";
import { createInterface } from "node:readline/promises";

if (!process.argv[2]) throw new Error("Indicá una carpeta vacía de destino. No se reemplazarán las llaves actuales.");
const destination = resolve(process.argv[2]);
const bundle = JSON.parse(await readFile(new URL("./llaves-cifradas.json", import.meta.url), "utf8"));
const question = createInterface({ input: process.stdin, output: process.stdout });
const password = (await question.question("Clave de recuperación: ")).trim();
question.close();
const decipher = createDecipheriv("aes-256-gcm", scryptSync(password, Buffer.from(bundle.salt, "base64"), 32), Buffer.from(bundle.iv, "base64"));
decipher.setAuthTag(Buffer.from(bundle.tag, "base64"));
const recovered = JSON.parse(Buffer.concat([decipher.update(Buffer.from(bundle.data, "base64")), decipher.final()]).toString());
const names = ["adbkey", "adbkey.pub", "debug.keystore"];
for (const name of names) {
  if (typeof recovered.files[name] !== "string") throw new Error("Respaldo incompleto.");
  try { await access(join(destination, name)); throw new Error(`Ya existe ${name}; no se reemplaza.`); }
  catch (error) { if (error.code !== "ENOENT") throw error; }
}
await mkdir(destination, { recursive: true });
for (const name of names) await writeFile(join(destination, name), Buffer.from(recovered.files[name], "base64"), { flag: "wx", mode: 0o600 });
console.log(`Llaves recuperadas en ${destination}.`);
