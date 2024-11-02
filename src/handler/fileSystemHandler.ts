import * as fs from "node:fs";
import * as path from "node:path";
import {GetEnum, PrintEnum} from "@model/enum/runtimeEnum.interface";
import {RuntimeEnumsHandler} from "@handler/project/enums.handler";

export class FileSystemHandler {

  [key: string]: any;
  static createSourceFolder(sourceFolder: string): void {
    if (!fs.existsSync(sourceFolder)) {
      try {
        fs.mkdirSync(`${sourceFolder}`);
      } catch (error) {
        console.error("Error creating enum folder: ", error);
      }
    }
  }

  static printEnum(sourceFolder: string, enums: RuntimeEnumsHandler, type: PrintEnum): void {
    const enumFolder = "enums";
    if (!fs.existsSync(`${path.join(sourceFolder, enumFolder)}`)) {
      try {
        fs.mkdirSync(`${path.join(sourceFolder, enumFolder)}`);
      } catch (error) {
        console.error("Error creating enum folder: ", error);
      }
    }
    console.log("type :>> ", type);
    FileSystemHandler[`printEnum${type}`](sourceFolder, enums);
  }



  static printEnumJSON(sourceFolder: string, enums:RuntimeEnumsHandler): void {
    const enumFolder = "enums";
    if (!fs.existsSync(`${path.join(sourceFolder, enumFolder)}`)) {
      try {
        fs.mkdirSync(`${path.join(sourceFolder, enumFolder)}`);
      } catch (error) {
        console.error("Error creating enum folder: ", error);
      }
    }
    fs.writeFileSync(
      `${path.join(sourceFolder, enumFolder, "enums.json")}`,
      JSON.stringify(enums.getEnums(GetEnum.LIST)),
    );
  }

  static printEnumMARKDOWN(sourceFolder: string, enums:RuntimeEnumsHandler): void {
    const enumFolder = "enums";
    if (!fs.existsSync(`${path.join(sourceFolder, enumFolder)}`)) {
      try {
        fs.mkdirSync(`${path.join(sourceFolder, enumFolder)}`);
      } catch (error) {
        console.error("Error creating enum folder: ", error);
      }
    }
    fs.writeFileSync(
      `${path.join(sourceFolder, enumFolder, "enums.md")}`,
      enums.getEnums(GetEnum.MARKDOWN) as string,
    );
  }

  static printEnumMERMAID(sourceFolder: string, enums:RuntimeEnumsHandler): void {
    const enumFolder = "enums";
    if (!fs.existsSync(`${path.join(sourceFolder, enumFolder)}`)) {
      try {
        fs.mkdirSync(`${path.join(sourceFolder, enumFolder)}`);
      } catch (error) {
        console.error("Error creating enum folder: ", error);
      }
    }
    fs.writeFileSync(
      `${path.join(sourceFolder, enumFolder, "enums.mmd")}`,
      enums.getEnums(GetEnum.MERMAID) as string,
    );
  }


  static printEnumJSONSCHEMA31(sourceFolder: string, enums:RuntimeEnumsHandler): void {
    const enumFolder = "enums";
    if (!fs.existsSync(`${path.join(sourceFolder, enumFolder)}`)) {
      try {
        fs.mkdirSync(`${path.join(sourceFolder, enumFolder)}`);
      } catch (error) {
        console.error("Error creating enum folder: ", error);
      }
    }
    fs.writeFileSync(
        `${path.join(sourceFolder, enumFolder, "enums.schema.json")}`,
        (enums.getEnums(PrintEnum.JSONSCHEMA31) as string)
    );
  }
}
