import {Project} from "ts-morph";
import {ConfigEnum, ConfigStorage} from "@storage/config.storage";
import {RuntimeEnumsHandler} from "@handler/project/enums.handler";
import {InterfaceParser} from "@handler/project/interface/interfaceParser";
import * as path from "node:path";
import {GetEnum, IRuntimeEnumInterface, PrintEnum} from "@model/enum/runtimeEnum.interface";
import {FileSystemHandler} from "@handler/fileSystemHandler";
import {EnumHandler} from "@handler/project/enum/enum.handler";
import {InterfacesHandler, InterfacesHandlerGetType} from "@handler/project/interface/interfaces.handler";

const tsConfigName = "tsconfig.json";


export class ProjectHandler {
  readonly project: Project;
  private readonly storage: ConfigStorage;
  enums!: RuntimeEnumsHandler;
  interfacesHandler!: InterfacesHandler;

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

  parseProject(): void {
    this.parseEnums();
    this.parseInterfaces();
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
        this.interfacesHandler,
    );
  }

  public generateDocumentation(): void {
    if (this.enums.runtimeEnums.length > 0) {
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

    FileSystemHandler.createSourceFolder(
        this.storage.getConfigProperty(ConfigEnum.documentsPath),
    );
    FileSystemHandler.printInterface(
        this.storage.getConfigProperty(ConfigEnum.documentsPath),
        this.interfacesHandler
    );

  }

  public parseEnums(): void {
    const enums = EnumHandler.iterateOverEnums(this);

    this.enums = new RuntimeEnumsHandler(enums);
  }

  public parseInterfaces(): void {
    const interfacesHandler: InterfacesHandler = new InterfacesHandler();
    console.log("interfacesHandler :>> ", interfacesHandler);

    this.project.getSourceFiles().flatMap((sourceFile) => {
      sourceFile.getInterfaces().forEach((interfaceDeclaration) => {
        interfacesHandler.addInterface(new InterfaceParser(interfaceDeclaration));
      });
    });
    this.interfacesHandler = interfacesHandler;
  }

}

