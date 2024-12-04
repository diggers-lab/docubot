import * as fs from "fs";

export interface IConfig {
  enumPath: string;
}

export interface ConfigStorageBasics {
  baseUrl: string;
  documentsPath: string;
  generate?: "plain" | "vitepress" | "";
}

export enum ConfigEnum {
  baseUrl = "baseUrl",
  documentsPath = "documentsPath",
  generate = "generate",
}

export class ConfigStorage {
  private readonly config: ConfigStorageBasics = {
    baseUrl: "",
    documentsPath: "",
    generate: ""
  };

  constructor(configPath: string) {
    this.config.baseUrl = configPath;
    this.config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
  }

  public getConfigProperty(property: ConfigEnum): string {

    return this.config[ConfigEnum[property]];
  }
}
