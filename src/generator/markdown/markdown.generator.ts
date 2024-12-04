import { ProjectHandler } from "@handler/project.handler";
import { VitepressGenerator } from "./vitepress.generator";
import { ConfigEnum } from "@storage/config.storage";
import * as fs from "node:fs";

export interface IFileStore {
    markdownPath: string;
    markdownContent: string;
    dataPath: string;
    dataContent: string;
}

export class MarkdownGenerator {
  type: string;
  files: Array<IFileStore> = [];
  basePath: string;
  generator: VitepressGenerator;

  constructor(private readonly project: ProjectHandler) {
    this.type = project.storage.getConfigProperty(ConfigEnum.generate);
    this.basePath = project.storage.getConfigProperty(ConfigEnum.documentsPath);
    this.generator = new VitepressGenerator(this.basePath);
  }

  generateLandingPage() {
      const fileStore: IFileStore = this.generator.generate({
          markdownPath: "landing.md",
          markdownContent: fs.readFileSync("./docubot/src/generator/templates/markdown/common/landing.md", "utf-8"),
          dataPath: "data/landing.data.json",
          dataContent: JSON.stringify(this.project.getProjectDescription())
      });
      this.files.push(fileStore);

  }

  generatePackagesPages() {
      const packagePath = "packages/";
      // individual package pages
      this.project.getDependencies().forEach((pkg) => {

         const fileStore: IFileStore = this.generator.generate({
             //markdownPath: packagePath + `data/${pkg.filename}.md`,
                //markdownContent: fs.readFileSync("./docubot/src/generator/templates/markdown/common/package/package.md", "utf-8"),
                dataPath: packagePath + `${pkg.filename}.data.json`,
                dataContent: JSON.stringify(pkg.package)
         });
            this.files.push(fileStore);
      });

      // pages per category, limited data
      let categories: IFileStore[] = [];
      this.project.package.categories.getTypes().forEach((type) => {
          const category = {
              name: type,
                packages: this.project.package.categories.getCategories(type)
          }
          const fileStore: IFileStore = this.generator.generate({
              //markdownPath: "index.md",
                //markdownContent: fs.readFileSync(`./docubot/src/generator/templates/markdown/common/package/${type}.md`, "utf-8"),
                dataPath: `data/${type}.data.json`,
                dataContent: JSON.stringify(category)
          });
          categories.push(fileStore);
      });
      this.files.push(...categories);

      // unused category
      /*const category = {
          name: "unused",
            packages: this.project.package.categories.getUnused()
      }
        const unusedStore: IFileStore = this.generator.generate({
            //markdownPath: "index.md",
                //markdownContent: fs.readFileSync(`./docubot/src/generator/templates/markdown/common/package/unused.md`, "utf-8"),
                dataPath: `data/unused.data.json`,
                dataContent: JSON.stringify(category)
        });
      this.files.push(unusedStore);*/

        // index to other packages
      const PackageIndexStore: IFileStore = this.generator.generate({
            //markdownPath: "packages/index.md",
                //markdownContent: fs.readFileSync("./docubot/src/generator/templates/markdown/common/package/index.md", "utf-8"),
                dataPath: "data/packages.data.json",
                dataContent: JSON.stringify({
                    path: "packages/",
                    types: this.project.package.categories.getTypes()
                })
      });
        this.files.push(PackageIndexStore);
  }



  writeFiles() {
      this.files.forEach((fileStore) => {
            //fs.writeFileSync(`${this.basePath}/${fileStore.markdownPath}`, fileStore.markdownContent);
            fs.writeFileSync(`${this.basePath}/${fileStore.dataPath}`, fileStore.dataContent);
      })
  }
}