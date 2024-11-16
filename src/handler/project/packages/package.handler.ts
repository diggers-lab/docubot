import {IPackage} from "@handler/project/packages/package.interface";
import * as fs from "node:fs";
import {PackageParser} from "@handler/project/packages/package.parser";
import {Project, TypeChecker} from "ts-morph";
import {IJsonPackage} from "@handler/project/packages/jsonPackage.interface";

export class PackageHandler {
    packageJson: string;
    jsonPackage: IJsonPackage;
    packages: PackageParser[] = [];
    typeChecker: TypeChecker;
    project: Project;

    constructor(packagePath: string, typeChecker: TypeChecker, project: Project) {
        this.packageJson = packagePath;
        this.typeChecker = typeChecker;
        this.project = project;
    }

    public async setPackageJsonContent() : Promise<PackageParser[]> {
        const parsedPackageJson: IJsonPackage = JSON.parse(fs.readFileSync(this.packageJson, "utf-8"));
        this.jsonPackage = parsedPackageJson;
        const packageList: PackageParser[] = [];
        for(const dependency in parsedPackageJson.dependencies) {
            const newPackage = {
                name: dependency,
                version: parsedPackageJson.dependencies[dependency],
                type: "dependency",
                description: "",
                importNames: [],
                usagesLocations: [],
            } as unknown as IPackage;
            await this.addPackage(newPackage, this.typeChecker, this.project);
        }

        for(const devDependency in parsedPackageJson.devDependencies) {
            const newPackage = {
                name: devDependency,
                version: parsedPackageJson.devDependencies[devDependency],
                type: "devDependency",
                description: "",
                importNames: [],
                usagesLocations: [],
            } as unknown as IPackage;
            await this.addPackage(newPackage, this.typeChecker, this.project);
        }

        return this.packages;
    }

    async addPackage(newPackage: IPackage, typeChecker: TypeChecker, project: Project) {
        const packageHandler = new PackageParser(newPackage, typeChecker, project);
        await packageHandler.setImportDeclaration();
        this.packages.push(packageHandler);
    }

}