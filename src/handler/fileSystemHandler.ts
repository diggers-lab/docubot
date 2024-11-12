import * as fs from "node:fs";
import * as path from "node:path";
import {GetEnum, PrintEnum} from "@model/enum/runtimeEnum.interface";
import {RuntimeEnumsHandler} from "@handler/project/enums.handler";
import {IInterfaceHandler} from "@handler/project/interface.handler";
import {IInterface} from "@handler/project/interface/interface.interface";
import {InterfacesHandler} from "@handler/project/interface/interfaces.handler";
import {ClassHandler} from "@handler/project/class/class.handler";

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

  static printClassJSon(sourceFolder: string, classesHandler: ClassHandler) : void {
    const classFolder = "classes";
    if (!fs.existsSync(`${path.join(sourceFolder, classFolder)}`)) {
      try {
        fs.mkdirSync(`${path.join(sourceFolder, classFolder)}`);
      } catch (error) {
        console.error("Error creating class folder: ", error);
      }
    }
    fs.writeFileSync(
      `${path.join(sourceFolder, classFolder, "classes.json")}`,
      classesHandler.get.json(),
    );
  }

  static printInterfaceJSON(sourceFolder: string, interfacesHandler: InterfacesHandler): void {
    const interfaceFolder = "interfaces";
    if (!fs.existsSync(`${path.join(sourceFolder, interfaceFolder)}`)) {
      try {
        fs.mkdirSync(`${path.join(sourceFolder, interfaceFolder)}`);
      } catch (error) {
        console.error("Error creating interface folder: ", error);
      }
    }
    fs.writeFileSync(
      `${path.join(sourceFolder, interfaceFolder, "interfaces.json")}`,
        interfacesHandler.get.json(),
    );
  }

  static printInterface(sourcefolder: string, interfacesHandler: InterfacesHandler): void {
    const interfaceFolder = "interfaces";
    if (!fs.existsSync(`${path.join(sourcefolder, interfaceFolder)}`)) {
      try {
        fs.mkdirSync(`${path.join(sourcefolder, interfaceFolder)}`);
      } catch (error) {
        console.error("Error creating interface folder: ", error);
      }
    }
    fs.writeFileSync(`${path.join(sourcefolder, interfaceFolder, "interfaces.json")}`, interfacesHandler.get.json());
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
