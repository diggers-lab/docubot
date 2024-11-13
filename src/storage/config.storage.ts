import * as fs from "fs";

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
  private readonly config: ConfigStorageBasics = {
    baseUrl: "",
    documentsPath: "",
  };

  constructor(configPath: string) {
    this.config.baseUrl = configPath;
    console.log("configPath", configPath);
    this.config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
  }

  public getConfigProperty(property: ConfigEnum): string {
    return this.config[ConfigEnum[property]];
  }
}
