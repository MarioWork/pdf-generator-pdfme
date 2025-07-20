import { Template } from "@pdfme/common";
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

export default async function () {
  const pdf = await generate({ template, inputs, plugins });
  return pdf;
}
