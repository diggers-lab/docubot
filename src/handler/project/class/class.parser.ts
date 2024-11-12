import {ClassDeclaration, ClassMemberTypes, PropertyDeclaration, TypeChecker} from "ts-morph";
import {DeclarationType, FileDetailsParser, getUniqueRandomName} from "@model/parser/FileDetails.parser";
import {PropertiesHandler} from "@handler/project/properties/properties.handler";

interface Person {
    name: string;
}

interface Employee {
    employeeId: number;
}

export class ClassParser {
    readonly name: Readonly<string>;
    classDeclaration: Readonly<ClassDeclaration>;
    private readonly fileDetails!: Readonly<FileDetailsParser>
    private readonly properties!: Readonly<PropertiesHandler>;


    constructor(classDeclaration: ClassDeclaration, typeChecker: TypeChecker) {
        this.name = classDeclaration.getName() ?? Object.freeze(getUniqueRandomName(classDeclaration));
        console.log("___\nclass name: >>", this.name);

        this.classDeclaration = classDeclaration;
        this.properties = new PropertiesHandler(typeChecker);
        classDeclaration.getMembers().forEach((property: ClassMemberTypes) => {
            this.properties.properties = property;
        });
    }

    setFileDetails(fileDetails: FileDetailsParser) {
        this.fileDetails = fileDetails;
    }

    toJson(): string {
        return JSON.stringify({
            name: this.name,
            fileDetails: this.fileDetails.toJson(),
            properties: this.properties.get.json()
        })
    }
}


export interface IBaseParser {
    name: string;
    declaration: DeclarationType
}
