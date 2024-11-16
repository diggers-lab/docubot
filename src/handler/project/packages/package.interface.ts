export interface IPackage {
    name: string;
    type: "dependency" | "devDependency";
    keywords: string[];
    version: string;
    description: string;
    importNames: string[];
    usagesLocations: IPackageUsage[];
    requiredBy: string[]; // list of package that require this package
}

export interface IPackageUsage {
    filePath: string;
    packageName: string;
    importName: string;
    line: number;
    type: "import" | "usage";
}