import {InterfaceParser} from "@handler/project/interface/interfaceParser";

export const interfaceToJson = (interfaces: Record<string, InterfaceParser>): string => {
    let json: string = '[';

    Object.entries(interfaces).forEach(([key, value], index) => {
        json += value.toJson();
        if (index !== Object.keys(interfaces).length - 1)
            json += ',';
    });
    json += ']';
    return json;
}