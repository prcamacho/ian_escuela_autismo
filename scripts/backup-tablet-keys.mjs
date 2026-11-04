import { readFile, writeFile, mkdir } from "node:fs/promises";
import { randomBytes, scryptSync, createCipheriv, createDecipheriv, createHash } from "node:crypto";
import { join, resolve } from "node:path";
import { homedir } from "node:os";

const destination = process.argv[2];
if (!destination) throw new Error("Indicar una carpeta privada fuera del repositorio.");
const folder = resolve(destination);
const files = {};
for (const name of ["adbkey", "adbkey.pub", "debug.keystore"]) files[name] = (await readFile(join(homedir(), ".android", name))).toString("base64");
const cleartext = Buffer.from(JSON.stringify({ version: 1, created: new Date().toISOString(), files }));
const password = randomBytes(24).toString("base64url");
const salt = randomBytes(16), iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", scryptSync(password, salt, 32), iv);
const encrypted = Buffer.concat([cipher.update(cleartext), cipher.final()]);
const bundle = { version: 1, salt: salt.toString("base64"), iv: iv.toString("base64"), tag: cipher.getAuthTag().toString("base64"), data: encrypted.toString("base64") };
// Verify decryption and every key before writing the recovery package.
const verify = createDecipheriv("aes-256-gcm", scryptSync(password, salt, 32), iv);
verify.setAuthTag(cipher.getAuthTag());
if (!Buffer.concat([verify.update(encrypted), verify.final()]).equals(cleartext)) throw new Error("Falló la verificación del respaldo.");
await mkdir(folder, { recursive: true });
await writeFile(join(folder, "llaves-cifradas.json"), JSON.stringify(bundle), { flag: "wx", mode: 0o600 });
await writeFile(join(folder, "CLAVE-DE-RECUPERACION.txt"), password + "\n", { flag: "wx", mode: 0o600 });
await writeFile(join(folder, "LEEME.txt"), "Respaldo de las llaves de Ian Escuela.\r\n\r\nllaves-cifradas.json contiene adbkey, adbkey.pub y debug.keystore cifrados con AES-256-GCM.\r\nLa clave está en CLAVE-DE-RECUPERACION.txt. Guardala también en tu gestor de contraseñas y separada de una copia externa del respaldo.\r\nNo contiene la clave de OpenAI.\r\nNo regenerar las llaves originales de C:\\Users\\pablo\\.android.\r\nPara recuperar con Node.js: node restaurar-llaves.mjs CARPETA-DESTINO\r\nEl recuperador pide la clave y nunca reemplaza archivos existentes.\r\n", { flag: "wx" });
await writeFile(join(folder, "huellas.json"), JSON.stringify(Object.fromEntries(Object.entries(files).map(([name, value]) => [name, createHash("sha256").update(Buffer.from(value, "base64")).digest("hex")])), null, 2), { flag: "wx" });
const restore = await readFile(new URL("./restore-tablet-keys.mjs", import.meta.url));
await writeFile(join(folder, "restaurar-llaves.mjs"), restore, { flag: "wx" });
console.log(`Respaldo cifrado y verificado: ${folder}`);
