import { ProjectHandler } from "@handler/project.handler";

const projectHandler = new ProjectHandler();

projectHandler.handleEnums();

projectHandler.generateDocumentation();
