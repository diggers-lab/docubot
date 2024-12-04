export interface IPackage {
    name: string;
    fileName: string;
    type: "dependency" | "devDependency";
    readme: string;
    keywords: string[];
    version: string;
    description: string;
    usages?: number;
    usagesLocations: IPackageUsage[];
}

export interface IPackageUsage {
    filePath: string;
    packageName: string;
    importName: string;
    line: number;
    type: "import" | "usage";
}