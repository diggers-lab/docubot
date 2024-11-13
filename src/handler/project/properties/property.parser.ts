import {
    ClassMemberTypes, EnumMember,
    PropertyDeclaration,
    TypeChecker, TypeElementTypes
} from "ts-morph";
import {StructureType} from "@handler/project/properties/properties.handler";
import {PropertyDetaisParser} from "@handler/project/properties/propertyDetails.parser";
import {ValueTypeParser} from "@handler/project/properties/valueType.parser";



export interface IPropertyDetails {
    name: string;
    type: StructureType
    property: IProperty;
}

export type PropertyTypes = string | string[] | boolean | undefined;

export class PropertyParser {
    //private readonly property!: IVariable;
    private readonly details: PropertyDetaisParser;
    private readonly valueType;

    constructor(property: ClassMemberTypes | TypeElementTypes | EnumMember, typeChecker: TypeChecker, name: string) {
        this.details = new PropertyDetaisParser(property, typeChecker);
        if (property instanceof PropertyDeclaration) {
            const type = property.getType();
            const valueType = new ValueTypeParser(property, typeChecker);
           console.log("valueType.toJson(): >>", valueType.toJson());
        }
    }

    toJson(): string{
        return this.property;
    }
}

