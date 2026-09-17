import httpServer from "http-server";
import { fileURLToPath } from "node:url";

const port = Number.parseInt(process.env.PORT || "4173", 10);
const host = process.env.HOST || "0.0.0.0";

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error(`PORT inválido: ${process.env.PORT}`);
}

const server = httpServer.createServer({
  root: fileURLToPath(new URL("../app", import.meta.url)),
  cache: -1,
  robots: true,
  showDir: false,
  autoIndex: true,
});

server.listen(port, host, () => {
  console.log(`Ian Escuela disponible en http://${host}:${port}`);
});

function shutdown() {
  server.close(() => process.exit(0));
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
