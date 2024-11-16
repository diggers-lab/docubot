import {IPackage, IPackageUsage} from "@handler/project/packages/package.interface";
import {ImportDeclaration, Project, SourceFile, SyntaxKind, TypeChecker} from "ts-morph";

export class PackageParser {
    importDeclaration: ImportDeclaration;
    package: IPackage;
    typeChecker: TypeChecker;
    project: Project;


    constructor(packageValues: IPackage, typeChecker: TypeChecker, project: Project) {
        this.package = packageValues;
        this.typeChecker = typeChecker;
        this.project = project;
    }

    public get name(): string {
        // replace impossible characters in markdown with blank value
        return this.package.name.replace('@', '').replace('/', '');
    }

    async setImportDeclaration() {
        this.project.getSourceFiles().forEach((sourceFile) => {
           sourceFile.getDescendantsOfKind(SyntaxKind.ImportDeclaration).forEach((importDeclaration) => {
                if (importDeclaration.getModuleSpecifierValue() === this.package.name) {
                     this.importDeclaration = importDeclaration;
                }
                this.setPackageUsages(sourceFile, this.package.name);
           });
        });
        await this.getNpmRegistry(this.package.name);
    }

    async getNpmRegistry(moduleName: string): Promise<Record<string, string>> {
        const registryUrl = `https://registry.npmjs.org/${encodeURIComponent(moduleName)}`;
        try {
            const response = await fetch(registryUrl);
            if (!response.ok) {
                throw new Error(`Failed to fetch module info for ${moduleName}: ${response.statusText}`);
            }

            const data = await response.json();
            if (!data['dist-tags']) {
                throw new Error(`No tags found for module ${moduleName}`);
            }
            this.package.keywords = data.keywords;
            return data;
        } catch (error) {
            console.error(`Error fetching tags for module ${moduleName}:`, error);
            return {};
        }
    }

    setPackageUsages(sourceFile: SourceFile, moduleName: string) {
        const usages: IPackageUsage[] = [];
        if (!sourceFile?.getDescendantsOfKind)
            return;
        sourceFile.getDescendantsOfKind(SyntaxKind.ImportDeclaration).forEach((importDeclaration) => {
            if (importDeclaration.getModuleSpecifierValue() === moduleName) {
                const namedImports = importDeclaration.getNamedImports();
                namedImports.forEach((namedImport) => {
                    const importName = namedImport.getName();
                    const importUsages = sourceFile.getDescendantsOfKind(SyntaxKind.Identifier).filter(identifier => {
                        return identifier.getText() === importName;
                    });

                    importUsages.forEach((usage) => {
                        const parentKind = usage.getParent()?.getKind();
                        const isDefinition = parentKind === SyntaxKind.ImportSpecifier;
                        usages.push({
                            filePath: sourceFile.getFilePath(),
                            packageName: moduleName,
                            importName: importName,
                            line: usage.getStartLineNumber(),
                            type: isDefinition ? "import" : "usage"
                        });
                    });
                });
            }
        });

        this.package.usagesLocations = usages;
    }

}