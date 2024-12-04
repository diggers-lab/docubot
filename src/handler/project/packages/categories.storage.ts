import {PackageParser} from "@handler/project/packages/package.parser";
import {IPackage} from "@handler/project/packages/package.interface";

export class PackageCategoriesStorage {
    private readonly types: string[] = ["react", "remix", "tailwind", "vite", "epic", "prisma", "ui", "http", "test", "log", "utility", "types", "" ]
    private readonly categories: Map<string, PackageParser[]> = new Map<string, PackageParser[]>(
        this.types.map((type) => [type, []] as [string, PackageParser[]] )

    );
    private readonly unused: PackageParser[] = [];

    public getTypes(): string[] {
        return this.types;
    }

    public getCategories(categoryName: string): Partial<IPackage>[] {
        const category: Partial<IPackage>[] = [];
        this.categories.get(categoryName)?.forEach((packageParser) => {
            const tmp = packageParser.package;
            tmp.registry = undefined;
            category.push(tmp)
        });
        return this.sortByUsages(category);
    }

    sortByUsages(category:  IPackage[]): Partial<IPackage>[] {
        category.sort((a, b) => {
            if (!a.usagesLocations || !a.usagesLocations.length) {
                return -1;
            }
            if (a.usagesLocations.length < b.usagesLocations.length) {
                return 1;
            }
            if (a.usagesLocations.length > b.usagesLocations.length) {
                return -1;
            }
            return 0;
        });
        return category;
    }

    public getUnused(): Partial<IPackage>[] {
        const category: PackageParser[] = [];
        this.unused.forEach((packageParser) => {
            category.push({
                name: packageParser.name,
                type: packageParser.package.type,
                version: packageParser.package.version,
                description: packageParser.package.description,
                keywords: packageParser.package.keywords,
                usages: packageParser.package.usages,
                imports: packageParser.package.importNames
            })
        });


        return this.sortByUsages(category);
    }

    constructor(packages: PackageParser[]) {
        this.setCategory(packages);
    }

    addToCategory(packageParser: PackageParser, category: string) {
        if (this.categories.has(category)) {
            this.categories.get(category)?.push(packageParser);
        }
    }

    setCategory(packages: PackageParser[]) {
        packages.forEach((packageParser) => {
            this.types.forEach((type) => {
                this.selectPackage(packageParser, packages, type)
            });

            if (packageParser.package.usages === 0) {
                this.unused.push(packageParser);
            }
        })
    }

    selectPackage(packageParser: PackageParser, packages: PackageParser[], type: string): boolean {
        if (packageParser.name.includes(type)) {
            this.addToCategory(packageParser, type);
            return true;
        }
        if (packageParser.package.keywords?.includes(type)) {
            this.addToCategory(packageParser, type);
            return true;
        }
        return false;
    }


}