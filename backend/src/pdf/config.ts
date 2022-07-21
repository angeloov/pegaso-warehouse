import { Template } from "@pdfme/generator";
import * as fs from "fs";
import path from "path";

const template: Template = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "..", "src", "pdf", "template.json")));

export default template;
