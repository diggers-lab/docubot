import { EntryPoint } from "@entrypoint/entryPoint.abstract";

export class ParseEntityScript extends EntryPoint {
  main(): number {
    this.project.handleEnums();

    this.project.generateDocumentation();
    return 0;
  }

  init(): void {}
}
