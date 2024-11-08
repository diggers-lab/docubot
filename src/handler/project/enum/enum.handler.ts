import { ProjectHandler } from "@handler/project.handler";
import { IRuntimeEnumInterface } from "@model/enum/runtimeEnum.interface";

export class EnumHandler {
  static iterateOverEnums(project: ProjectHandler): IRuntimeEnumInterface[] {
    const enums: IRuntimeEnumInterface[] = project.project
      .getSourceFiles()
      .flatMap((sourceFile) => {
        return sourceFile.getEnums().map((enumDeclaration) => {
          const properties: Record<string, string | number> = {};
          const propertiesType: Record<string, string> = {};

          enumDeclaration.getMembers().forEach((member) => {
            const memberName = member.getName();
            const memberValue = member.getInitializer()?.getText();
            let parsedValue: string | number | undefined;

            if (memberValue) {
              if (!isNaN(Number(memberValue))) {
                parsedValue = Number(memberValue);
              } else {
                const variableDeclaration =
                  sourceFile.getVariableDeclaration(memberValue);
                if (variableDeclaration) {
                  const initializer = variableDeclaration
                    .getInitializer()
                    ?.getText();
                  parsedValue =
                    initializer?.replace(/['"]/g, "") ??
                    memberValue.replace(/['"]/g, "");
                } else {
                  parsedValue = memberValue.replace(/['"]/g, "");
                }
              }
            }

            properties[memberName] = parsedValue!;
            if (!isNaN(Number(parsedValue))) {
              propertiesType[memberName] = "number";
            } else {
              propertiesType[memberName] =
                typeof parsedValue === "string" ? "string" : "number";
            }
          });

          return {
            name: enumDeclaration.getName(),
            properties,
            propertiesType,
            filePath: sourceFile.getFilePath(),
            startLine: enumDeclaration.getStartLineNumber(),
            endLine: enumDeclaration.getEndLineNumber(),
            description:
              enumDeclaration
                .getJsDocs()
                .map((doc) => doc.getComment())
                .join("\n") || undefined,
          };
        });
      });

    return enums;
  }
}
