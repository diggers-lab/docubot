import * as fs from "node:fs";
import * as path from "node:path";
import { IRuntimeEnumInterface } from "@model/enum/runtimeEnum.interface";

export class DocumentHandler {
  static createSourceFolder(sourceFolder: string): void {
    if (!fs.existsSync(sourceFolder)) {
      try {
        fs.mkdirSync(`${sourceFolder}`);
      } catch (error) {
        console.error("Error creating enum folder: ", error);
      }
    }
  }

  static printEnum(sourceFolder: string, enums: IRuntimeEnumInterface[]): void {
    const enumFolder = "enums";
    if (!fs.existsSync(`${path.join(sourceFolder, enumFolder)}`)) {
      try {
        fs.mkdirSync(`${path.join(sourceFolder, enumFolder)}`);
      } catch (error) {
        console.error("Error creating enum folder: ", error);
      }
    }

    if (process.argv.includes("mode=dev")) {
      fs.writeFileSync(
        `${path.join(sourceFolder, enumFolder, "enums.json")}`,
        JSON.stringify(enums, null, 2),
      );
    }
  }
}
