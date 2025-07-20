import Fastify from "fastify";
import path from "path";
import { fileURLToPath } from "url";
import { Piscina } from "piscina";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pool = new Piscina({
  filename: path.resolve(__dirname, "pdf-worker.js"),
});

const server = Fastify();

server.get("/", async (request, reply) => {
  const pdf = await pool.run({ name: "generatePdf" });

  reply
    .header("Content-Type", "application/pdf")
    .header("Content-Disposition", 'inline; filename="generated.pdf"')
    .send(pdf);
});

const start = async () => {
  try {
    await server.listen({ port: 3000 });
    console.log("Server listening on http://localhost:3000");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
