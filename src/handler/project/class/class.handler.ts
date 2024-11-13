import {ClassParser} from "@handler/project/class/class.parser";
import {ClassDeclaration, TypeChecker} from "ts-morph";
import {classToJson} from "@handler/project/class/class.converter";

export class ClassHandler {
    classes: ClassParser[] = [];
    typeChecker: TypeChecker;
    get: {
        json: () => string;
    }

    constructor(typeChecker: TypeChecker) {
        this.typeChecker = typeChecker;
        this.get = {
            json: () => classToJson(this.classes)
        }
    }


    addClass(classDeclaration: ClassDeclaration): ClassParser {
        const classParser = new ClassParser(classDeclaration, this.typeChecker);
        this.classes.push(classParser);
        return classParser
    }

}