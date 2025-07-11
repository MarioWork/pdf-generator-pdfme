import Fastify from "fastify";
import { type Template } from "@pdfme/common";
import { generate } from "@pdfme/generator";
import { text, image } from "@pdfme/schemas";
import templateJson from "./template.json" assert { type: "json" };

const template: Template = templateJson as Template;

const plugins = { text, image };

const inputs = [
  {
    firstName: "Mario",
    lastName: "Vieira",
  },
];

const server = Fastify();

server.get("/", async (request, reply) => {
  const pdf = await generate({ template, inputs, plugins });

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
