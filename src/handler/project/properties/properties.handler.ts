import {IPropertyDetails, PropertyParser, PropertyTypes} from "@handler/project/properties/property.parser";
import {
    ClassMemberTypes,
    TypeChecker,
} from "ts-morph";

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

    private _properties: Record<string, PropertyParser> = {};

    get: {
        json: () => string;
    }

    constructor(private readonly typeChecker: TypeChecker) {
        this.get = {
            json: (): {} => this.properties?.length !== 0 ? Object.values(this._properties).map((property) => property.toJson()) : {}
        }
    }

    getProperty(type:keyof IPropertyDetails): Array<PropertyTypes> {
        return Object.values(this.properties).map((property) => {
            return property.getProperty(type);
        });
    }
}