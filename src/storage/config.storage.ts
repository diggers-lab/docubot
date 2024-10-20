import * as fs from "fs";
import { GetEnum } from "@handler/project.handler";
import { IRuntimeEnumInterface } from "@model/enum/runtimeEnum.interface";
import { MapError, MapErrorEnum } from "../error/storage/map.error";

export interface IConfig {
  enumPath: string;
}

export interface ConfigStorageBasics {
  baseUrl: string;
  documentsPath: string;
}

export enum ConfigEnum {
  baseUrl = "baseUrl",
  documentsPath = "documentsPath",
}

export class ConfigStorage {
  private readonly config: ConfigStorageBasics;

  public getType!: GetEnum;

  public readonly enums: Map<string, IRuntimeEnumInterface> = new Map<
    string,
    IRuntimeEnumInterface
  >();

  constructor() {
    this.config = JSON.parse(
      fs.readFileSync("./config/configFile.json", "utf-8"),
    );
    this.getType = GetEnum.List;
  }

  public getConfigProperty(property: ConfigEnum): string {
    return this.config[ConfigEnum[property]];
  }

  public setEnum(toAdd: IRuntimeEnumInterface): void {
    if (this.enums.get(toAdd.name)) {
      throw new MapError(MapErrorEnum.KeyAlreadyExists, { key: toAdd.name });
    }
    this.enums.set(toAdd.name, toAdd);
  }

  public updateEnum(toUpdate: IRuntimeEnumInterface): void {
    if (!this.enums.get(toUpdate.name)) {
      throw new MapError(MapErrorEnum.KeyDoesNotExist, { key: toUpdate.name });
    }
    this.enums.set(toUpdate.name, toUpdate);
  }

  public deleteEnum(name: string): void {
    if (!this.enums.get(name)) {
      throw new MapError(MapErrorEnum.KeyDoesNotExist, { key: name });
    }
    this.enums.delete(name);
  }

  public getEnum(name: string): IRuntimeEnumInterface {
    const enumInstance = this.enums.get(name);
    if (!enumInstance) {
      throw new MapError(MapErrorEnum.KeyDoesNotExist, { key: name });
    }
    return enumInstance;
  }
}
