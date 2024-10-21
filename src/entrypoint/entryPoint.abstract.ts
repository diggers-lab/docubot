import { ProjectHandler } from "@handler/project.handler";

export abstract class EntryPoint {
  constructor() {}

  abstract main(): number; // process exit code

  abstract init(): void; // initialize the entrypoint

  abstract end(): void;
}
