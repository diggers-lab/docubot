import {Project} from "ts-morph";
import * as path from "node:path";
import {ConfigEnum, ConfigStorage} from "@storage/config.storage";
import {FileSystemHandler} from "@handler/fileSystemHandler";
import {EnumHandler} from "@handler/enum.handler";
import {GetEnum, IRuntimeEnumInterface, PrintEnum} from "@model/enum/runtimeEnum.interface";
import {RuntimeEnumsHandler} from "@handler/project/enums.handler";
import {IInterfaceHandler} from "@handler/project/interface.handler";

const tsConfigName = "tsconfig.json";


export class ProjectHandler {
  readonly project: Project;
  private readonly storage: ConfigStorage;
  enums!: RuntimeEnumsHandler;
  interfaces!: IInterfaceHandler;

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


  public printInterfaces(): void {
    FileSystemHandler.printInterfaceJSON(
        this.storage.getConfigProperty(ConfigEnum.documentsPath),
        this.interfaces,
    );
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
  }

  public handleEnums(): void {
    const enums = EnumHandler.iterateOverEnums(this);

    this.enums = new RuntimeEnumsHandler(enums);
  }

  public handleInterfaces(): void {
    this.interfaces = new IInterfaceHandler(this);
  }

}
