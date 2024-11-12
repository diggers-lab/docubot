import {ClassParser} from "@handler/project/class/class.parser";

export const classToJson = (classes:ClassParser[]): string => {
    let json = '[';

    classes.forEach((value, index) => {
        json += value.toJson();
        if (index !== classes.length - 1)
            json += ',';
    });
    json += ']';
    return json;
}