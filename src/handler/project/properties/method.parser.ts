import {StructureType} from "@handler/project/properties/properties.handler";
import {
    PropertyDeclaration,
    SyntaxKind,
    TypeChecker
} from "ts-morph";
import {IBaseProperty} from "@handler/project/properties/propertyDetails.parser";

export enum  DeclarationType {
    Class = "ClassDeclaration",
    Interface= "InterfaceDeclaration",
    Enum= "EnumDeclaration",
    function = "FunctionDeclaration",
    property = "PropertyDeclaration",
    variable = "VariableDeclaration",
    typeAlias = "TypeAliasDeclaration",
    constructor = "Constructor",
}

export function fillBaseTypeFromType(property: PropertyDeclaration, typeChecker: TypeChecker, variable: IBaseProperty): IBaseProperty {
    if (!property.getName) {
        console.log("no name");
        variable.name = undefined;
    } else {
        variable.name = property?.getName();
    }
    variable.scope = property.getScope();
    variable.structureKind = SyntaxKind[property.getKind()];
    if (variable.structureKind === DeclarationType.property && typeChecker.getTypeAtLocation(property)?.getInitializer) {
        variable.structureKind = DeclarationType.function;
    }
    return variable;
}

export interface IVariable {
    name: string;
    variableType: StructureType;
    parameterTypes: string[];
    isOptional: boolean;
    isArray: boolean;
    isRecord: boolean;
    isMap: boolean;
    isSet: boolean;
    isPartial: boolean;
    isWeakSet: boolean;
    isWeakMap: boolean;
    isBoolean: boolean;
    isUnion: boolean;
    isPromise: boolean;
    isAnonymous: boolean;
    isClass: boolean;
    isInterface: boolean;
    isEnum: boolean;
    isIntersection: boolean;
    isTuple: boolean;
    isTypeParameter: boolean;
    isVoid: boolean;
    isAny: boolean;
    isObject: boolean;
}