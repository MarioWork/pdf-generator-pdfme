import Fastify from "fastify";
import { type Template } from "@pdfme/common";
import { generate } from "@pdfme/generator";
import { text, image, barcodes } from "@pdfme/schemas";
import templateJson from "./template.json";

const template: Template = templateJson as Template;

const plugins = { text, image, ean13: barcodes.ean13 };

const inputs = [
  {
    firstName: "Mario",
    lastName: "Vieira",
  },
];

const server = Fastify();

server.get("/", async (request, reply) => {
  const startTime = new Date().getTime();

  const pdf = await generate({ template, inputs, plugins });

  const endTime = new Date().getTime();
  console.log(endTime - startTime);

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
