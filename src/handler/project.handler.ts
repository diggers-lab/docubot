import {ClassDeclaration, Project, SourceFile, TypeChecker} from "ts-morph";
import {ConfigEnum, ConfigStorage} from "@storage/config.storage";
import {RuntimeEnumsHandler} from "@handler/project/enums.handler";
import {InterfaceParser} from "@handler/project/interface/interfaceParser";
import * as path from "node:path";
import {GetEnum, IRuntimeEnumInterface, PrintEnum} from "@model/enum/runtimeEnum.interface";
import {FileSystemHandler} from "@handler/fileSystemHandler";
import {EnumHandler} from "@handler/project/enum/enum.handler";
import {InterfacesHandler} from "@handler/project/interface/interfaces.handler";
import {ClassHandler} from "@handler/project/class/class.handler";
import {FileDetailsParser} from "@model/parser/FileDetails.parser";
import {PackageHandler} from "@handler/project/packages/package.handler";
import {IJsonPackage} from "@handler/project/packages/jsonPackage.interface";
import {PackageParser} from "@handler/project/packages/package.parser";

const tsConfigName = "tsconfig.json";


export class ProjectHandler {
  readonly project: Project;
  readonly storage: ConfigStorage;
  enums!: RuntimeEnumsHandler;
  interfacesHandler!: InterfacesHandler;
  fileDetails!: Record<string,Readonly<FileDetailsParser>>;
  classHandler!: ClassHandler;
  package!: PackageHandler;

  constructor(configPath: string) {
    this.storage = new ConfigStorage(configPath);
    console.log(
      `${path.join(this.storage.getConfigProperty(ConfigEnum.baseUrl), tsConfigName)}`,
    );
    this.project = new Project({
      tsConfigFilePath: `${path.join(this.storage.getConfigProperty(ConfigEnum.baseUrl), tsConfigName)}`,
      skipAddingFilesFromTsConfig: false,
      useInMemoryFileSystem: false,
      libFolderPath: this.storage.getConfigProperty(ConfigEnum.baseUrl) + "package.json"
    });
    this.storage.getType = GetEnum.LIST;
    this.classHandler = new ClassHandler(this.project.getTypeChecker());
    this.package = new PackageHandler(this.storage.getConfigProperty(ConfigEnum.baseUrl) + "package.json",
        this.project.getTypeChecker(), this.project);
  }

  getDependencies(): PackageParser[] {
    return this.package.packages.map((pkg) => {
      return pkg;
    });
  }

  getProjectDescription(): Partial<IJsonPackage> {
    return {
        name: this.package.jsonPackage.name,
        version: this.package.jsonPackage.version,
        description: this.package.jsonPackage.description,
        keywords: this.package.jsonPackage.keywords,
        homepage: this.package.jsonPackage.homepage,
        repository: this.package.jsonPackage.repository,
        author: this.package.jsonPackage.author,
        scripts: this.package.jsonPackage.scripts,
    }
  }

  parseFiles(): void {
    const fileList : Record<string, Readonly<FileDetailsParser>> = {};
    this.project.getSourceFiles().forEach((sourceFile: SourceFile) => {
      const fileName: string = sourceFile.getBaseName();
      const fileDetail = new FileDetailsParser(sourceFile);
      fileList[fileName] = Object.freeze(fileDetail);
    })
    this.fileDetails = fileList;

  }

  addClass(classDeclaration: ClassDeclaration, typeChecker: TypeChecker) {
    const fileDetails = this.fileDetails[classDeclaration.getSourceFile().getBaseName()] ?? null;
    const classParser = this.classHandler.addClass(classDeclaration);
    classParser.setFileDetails(fileDetails);
    console.log("this.classHandler.classes.length: >>", this.classHandler.classes.length);
  }

  public getEnums(
      getType: GetEnum,
  ): | Map<string, IRuntimeEnumInterface>
      | Record<string, IRuntimeEnumInterface>
      | IRuntimeEnumInterface[]
      | string {
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

