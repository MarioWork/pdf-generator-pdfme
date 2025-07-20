import Fastify from "fastify";
import { fileURLToPath } from "url";
import { Piscina } from "piscina";
import { dirname, join } from "path";

//Use when building for prodf
//const __dirname = dirname(fileURLToPath(import.meta.url));

// Piscina pool setup
const pool = new Piscina({
  filename: new URL("./pdf-worker.ts", import.meta.url).href,
});

const server = Fastify();

server.get("/", async (request, reply) => {
  const pdf = await pool.run({ name: "generatePdf" });

  reply
    .header("Content-Type", "application/pdf")
    .header("Content-Disposition", 'inline; filename="generated.pdf"')
    .send(pdf);
});

// Cleanup on Fastify shutdown
server.addHook("onClose", async () => {
  console.log("Shutting down Piscina...");
  await pool.destroy();
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
