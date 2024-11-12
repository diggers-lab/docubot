import {IPropertyDetails, PropertyParser, PropertyTypes} from "@handler/project/properties/property.parser";
import {
    ClassMemberTypes,
    MethodDeclarationStructure,
    PropertyDeclaration,
    SyntaxKind,
    TypeChecker,
    TypeNode
} from "ts-morph";
import {getPropertyType, propertyToJson} from "@handler/project/properties/property.converter";

export enum PropertiesType {
    name = "name",
    type = "type",
    optional = "optional",
    readonly = "readonly",
    callable = "callable"
}

export enum PropertyType {
    variable = "variable",
    method = "method",
    getter = "getter",
    setter = "setter",
    constructor = "constructor",
}
/*
getStructure: (() => PropertyDeclarationStructure) | (() => (MethodDeclarationStructure | MethodDeclarationOverloadStructure)) | (() => GetAccessorDeclarationStructure) | (() => SetAccessorDeclarationStructure) | (() => (ConstructorDeclarationStructure | ConstructorDeclarationOverloadStructure)) | (() => ClassStaticBlockDeclarationStructure) */
export enum StructureType {
    propertyDeclarationStructure = "PropertyDeclarationStructure",
    methodDeclarationStructure = "MethodDeclarationStructure",
    methodDeclarationOverloadStructure = "MethodDeclarationOverloadStructure",
    getAccessorDeclarationStructure = "GetAccessorDeclarationStructure",
    setAccessorDeclarationStructure = "SetAccessorDeclarationStructure",
    constructorDeclarationStructure = "ConstructorDeclarationStructure",
    constructorDeclarationOverloadStructure = "ConstructorDeclarationOverloadStructure",
    classStaticBlockDeclarationStructure = "ClassStaticBlockDeclarationStructure",
}



export class PropertiesHandler {
    public set properties(propertyDeclaration: ClassMemberTypes) {
        this._properties[propertyDeclaration.getStructure().name] = new PropertyParser(propertyDeclaration, this.typeChecker, propertyDeclaration.getStructure().name)//new PropertyParser(getPropertyType(propertyDeclaration, this.typeChecker), propertyDeclaration, this.typeChecker);
    }

    public get properties(): Record<string, PropertyParser> {

    }


    private _properties: Record<string, PropertyParser> = {};

    get: {
        json: () => string;
    }

    constructor(private readonly typeChecker: TypeChecker) {
        this.get = {
            json: () => this.properties?.length !== 0 ? Object.values(this._properties).map((property) => property.toJson()) : {}
        }
    }

    get(name: string): PropertyParser | undefined {
        return this.properties[name];
    }

    getProperty(type:keyof IPropertyDetails): Array<PropertyTypes> {
        return Object.values(this.properties).map((property) => {
            return property.getProperty(type);
        });
    }
}