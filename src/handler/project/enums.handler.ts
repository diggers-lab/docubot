import {GetEnum, IRuntimeEnumInterface} from "@model/enum/runtimeEnum.interface";


export class RuntimeEnumsHandler {
    runtimeEnums: IRuntimeEnumInterface[] = [];
    [key: string]: any;

    constructor(enums: IRuntimeEnumInterface[]) {
        this.runtimeEnums = enums;
    }


    public getEnums(
        getType: GetEnum,
    ): | Map<string, IRuntimeEnumInterface>
        | Record<string, IRuntimeEnumInterface>
        | IRuntimeEnumInterface[]
        | string {
        //const enums = Array.from(this.storage.enums.values());
        return this[`get${getType}`]();

    }

    private getLIST(): IRuntimeEnumInterface[] {
        return Array.from(this.runtimeEnums.values());
    }

    private getMAP(): Map<string, IRuntimeEnumInterface> {
        const map = new Map<string, IRuntimeEnumInterface>();
        this.runtimeEnums.forEach((enumItem) => {
            map.set(enumItem.name, enumItem);
        });
        return map;
    }

    private getMARKDOWN(): string {
        let content = "# Enums Documentation  \n\n";

        this.runtimeEnums.forEach((enumItem) => {
            content += `## ${enumItem.name}  \n\n`;
            if (enumItem.description) {
                content += `${enumItem.description}  \n\n`;
            }
            content += `**File Path:** ${enumItem.filePath}  \n`;
            content += `**Lines:** ${enumItem.startLine} - ${enumItem.endLine}  \n\n`;
            content += `### Properties  \n\n`;
            content += `| Name | Value | Type |  \n`;
            content += `|------|-------|------|  \n`;

            for (const [key, value] of Object.entries(enumItem.properties)) {
                const type = enumItem.propertiesType[key];
                content += `| ${key} | ${value} | ${type} |  \n`;
            }

            content += `  \n`;
        });

        return content;
    }

    private getJSONSCHEMA31(): string {
        const schema = {
            $schema: "http://json-schema.org/draft-07/schema#",
            title: "Enums",
            type: "object",
            properties: {},
        };

        this.runtimeEnums.forEach((enumItem) => {
            schema.properties[enumItem.name] = {
                type: "object",
                properties: {},
            };

            for (const [key, value] of Object.entries(enumItem.properties)) {
                const type = enumItem.propertiesType[key];
                schema.properties[enumItem.name].properties[key] = {
                    type,
                    default: value,
                };
            }
        });

        return JSON.stringify(schema, null, 2);
    }

    private getMERMAID(): string {
        let content = "graph TD\n";

        this.runtimeEnums.forEach((enumItem) => {
            content += `    ${enumItem.name}["${enumItem.name}"]\n`;

            for (const [key, value] of Object.entries(enumItem.properties)) {
                content += `    ${enumItem.name} -->|${key}| ${value}\n`;
            }
        });

        return content;
    }

}