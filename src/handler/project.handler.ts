import { Project } from "ts-morph";
import * as path from "node:path";
import { ConfigEnum, ConfigStorage } from "@storage/config.storage";
import { DocumentHandler } from "@handler/document.handler";
import { EnumHandler } from "@handler/enum.handler";
import { IRuntimeEnumInterface } from "@model/enum/runtimeEnum.interface";

export enum GetEnum {
  Map = "Map",
  Record = "Record",
  List = "List",
}

export class ProjectHandler {
  readonly project: Project;
  private readonly storage: ConfigStorage;

  constructor() {
    this.storage = new ConfigStorage();
    this.project = new Project({
      tsConfigFilePath: `${path.join(this.storage.getConfigProperty(ConfigEnum.baseUrl), "tsconfig.json")}`,
      skipAddingFilesFromTsConfig: false,
      useInMemoryFileSystem: false,
    });
    this.storage.getType = GetEnum.List;
  }

  public generateDocumentation(): void {
    DocumentHandler.createSourceFolder(
      this.storage.getConfigProperty(ConfigEnum.documentsPath),
    );

    DocumentHandler.printEnum(
      this.storage.getConfigProperty(ConfigEnum.documentsPath),
      this.getEnums(),
    );
  }

  public setGetType(getEnum: GetEnum): void {
    this.storage.getType = getEnum;
  }

  public handleEnums(): void {
    const enums = EnumHandler.iterateOverEnums(this);
    for (const enumInstance of enums) {
      this.storage.setEnum(enumInstance);
    }
  }

  public getEnums(): IRuntimeEnumInterface[];
  public getEnums(getType: GetEnum.Map): Map<string, IRuntimeEnumInterface>;
  public getEnums(
    getType: GetEnum.Record,
  ): Record<string, IRuntimeEnumInterface>;
  public getEnums(getType: GetEnum.List): [];

  public getEnums(
    getType?: GetEnum,
  ):
    | Map<string, IRuntimeEnumInterface>
    | Record<string, IRuntimeEnumInterface>
    | IRuntimeEnumInterface[] {
    const enums = Array.from(this.storage.enums.values());

    const type = getType ?? this.storage.getType;

    switch (type) {
      case GetEnum.Map:
        return new Map(this.storage.enums); // Return as Map
      case GetEnum.Record:
        return enums.reduce(
          (acc, curr) => {
            acc[curr.name] = curr;
            return acc;
          },
          {} as Record<string, IRuntimeEnumInterface>,
        ); // Return as Record
      case GetEnum.List:
      default:
        return enums as []; // Return as List
    }
  }
}
