import * as fs from "node:fs";
import * as path from "node:path";
import {GetEnum, PrintEnum} from "@model/enum/runtimeEnum.interface";
import {RuntimeEnumsHandler} from "@handler/project/enums.handler";
import {IInterfaceHandler} from "@handler/project/interface.handler";
import {IInterface} from "@interface/interface.interface";

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

  static printInterfaceJSON(sourceFolder: string, interfaces: IInterfaceHandler): void {
    const interfaceFolder = "interfaces";
    if (!fs.existsSync(`${path.join(sourceFolder, interfaceFolder)}`)) {
      try {
        fs.mkdirSync(`${path.join(sourceFolder, interfaceFolder)}`);
      } catch (error) {
        console.error("Error creating interface folder: ", error);
      }
    }
    const test: Array<Partial<IInterface>> = interfaces.interfaces.map((interfaceItem: IInterface): Partial<IInterface> => {
        return {
          name: interfaceItem.name,
          properties: interfaceItem.properties,
          methods: interfaceItem.methods,
          extends: interfaceItem.extends,
          indexSignature: interfaceItem.indexSignature,
          callableSignature: interfaceItem.callableSignature,
          typeParameters: interfaceItem.typeParameters,
            heritages: interfaceItem.heritages,



      };
    })
    fs.writeFileSync(
      `${path.join(sourceFolder, interfaceFolder, "interfaces.json")}`,
        JSON.stringify(test),
    );
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
