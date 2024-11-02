import {Project} from "ts-morph";
import * as path from "node:path";
import {ConfigEnum, ConfigStorage} from "@storage/config.storage";
import {FileSystemHandler} from "@handler/fileSystemHandler";
import {EnumHandler} from "@handler/enum.handler";
import {GetEnum, IRuntimeEnumInterface, PrintEnum} from "@model/enum/runtimeEnum.interface";
import {RuntimeEnumsHandler} from "@handler/project/enums.handler";

const tsConfigName = "tsconfig.json";

interface IProjectHandlerSettings {
  configPath: string;
  tsConfigPath: string;
}

export class ProjectHandler {
  readonly project: Project;
  private readonly storage: ConfigStorage;
  enums!: RuntimeEnumsHandler;

  constructor(configPath: string) {
    this.storage = new ConfigStorage(configPath);
    console.log(
      `${path.join(this.storage.getConfigProperty(ConfigEnum.baseUrl), tsConfigName)}`,
    );
    this.project = new Project({
      tsConfigFilePath: `${path.join(this.storage.getConfigProperty(ConfigEnum.baseUrl), tsConfigName)}`,
      skipAddingFilesFromTsConfig: false,
      useInMemoryFileSystem: false,
    });
    this.storage.getType = GetEnum.LIST;
  }

  public getEnums(
      getType: GetEnum,
  ): | Map<string, IRuntimeEnumInterface>
      | Record<string, IRuntimeEnumInterface>
      | IRuntimeEnumInterface[]
      | string {
    //const enums = Array.from(this.storage.enums.values());
    return this.enums.getEnums(getType);
  }

  public generateDocumentation(): void {
    FileSystemHandler.createSourceFolder(
      this.storage.getConfigProperty(ConfigEnum.documentsPath),
    );
    Object.values(PrintEnum).forEach((type) => {
        FileSystemHandler.printEnum(
            this.storage.getConfigProperty(ConfigEnum.documentsPath),
            this.enums,
            type as PrintEnum,
        );
    })
    /*FileSystemHandler.printEnumMarkdown(
      this.storage.getConfigProperty(ConfigEnum.documentsPath),
      this.enums,
    );
    FileSystemHandler.printEnumMARKDOWN(
        this.storage.getConfigProperty(ConfigEnum.documentsPath),
        this.enums
    );
    FileSystemHandler.printEnumMERMAID(
        this.storage.getConfigProperty(ConfigEnum.documentsPath),
        this.enums
    )*/
  }

  public handleEnums(): void {
    const enums = EnumHandler.iterateOverEnums(this);

    this.enums = new RuntimeEnumsHandler(enums);
  }
/*
  public getEnums(): IRuntimeEnumInterface[];
  public getEnums(getType: GetEnum.Map): Map<string, IRuntimeEnumInterface>;
  public getENums(getType: GetEnum.MARKDOWN): string;
  public getEnums(
    getType: GetEnum.Record,
  ): Record<string, IRuntimeEnumInterface>;
  public getEnums(getType: GetEnum.List): [];

  public getEnums(
    getType?: GetEnum,
  ):
    | Map<string, IRuntimeEnumInterface>
    | Record<string, IRuntimeEnumInterface>
    | IRuntimeEnumInterface[]
    | string
  {
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
      case GetEnum.MARKDOWN:
        return this.generateMarkdownContent(enums);
      case GetEnum.List:
      default:
        return enums as []; // Return as List
    }
  }
*/


}
