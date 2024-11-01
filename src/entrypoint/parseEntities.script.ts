import { EntryPoint } from "@entrypoint/entryPoint.abstract";
import { ProjectHandler } from "@handler/project.handler";

export class ParseEntityScript extends EntryPoint {
  project: ProjectHandler;
  constructor() {
    super();
    this.project = new ProjectHandler();
  }
  main(): number {
    this.project.handleEnums();

    this.project.generateDocumentation();
    return 0;
  }

  init(): void {}
}
