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
      this.project.getDependencies().forEach((pkg) => {
         const fileStore: IFileStore = this.generator.generate({
             markdownPath: packagePath + `${pkg.name}.md`,
                markdownContent: fs.readFileSync("./docubot/src/generator/templates/markdown/common/package.md", "utf-8"),
                dataPath: "data/" + packagePath + `${pkg.name}.data.json`,
                dataContent: JSON.stringify(pkg.package)
         });
            this.files.push(fileStore);
      });
  }

  writeFiles() {
      this.files.forEach((fileStore) => {
            fs.writeFileSync(`${this.basePath}/${fileStore.markdownPath}`, fileStore.markdownContent);
            fs.writeFileSync(`${this.basePath}/${fileStore.dataPath}`, fileStore.dataContent);
      })
  }
}