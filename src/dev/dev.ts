import { InitScript } from "@entrypoint/initScript";
import { CliHandler } from "@handler/cli.handler";
import { ProjectHandler } from "@handler/project.handler";
import process from "node:process";
import * as path from "node:path";
import { Project } from "ts-morph";

script();

async function settingScript() {
  /*const config: { responses: Record<string, string> } = await import(
    "./config.json"
  );
  console.log("config :>> ", config);
  const initSript = new InitScript();
  initSript.askConfigPath = async () => {
    return config.responses.first;
  };
  initSript.init();
  initSript.main();*/
}

async function script() {
  /*const test = new Project(
    "C:\\Users\\Smogogo\\WebstormProjects\\docubot\\tests\\example\\tsconfig.json",
  );
  console.log("project :>> ", test);*/
  const basePath = `${path.join(process.cwd(), "tests/example/config/docubot.config.json")}`;
  const projectHandler = new ProjectHandler(basePath);

  projectHandler.handleEnums();
  projectHandler.generateDocumentation();
  console.log("projectHandler :>> ", projectHandler);
}
