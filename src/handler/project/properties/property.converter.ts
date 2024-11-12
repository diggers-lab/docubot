import {PropertyParser,} from "@handler/project/properties/property.parser";
import {ClassMemberTypes, SyntaxKind, Type, TypeChecker, TypeFormatFlags} from "ts-morph";
import {StructureType} from "@handler/project/properties/properties.handler";
import {IBaseProperty, IVariable} from "@handler/project/properties/method.parser";

export const propertyToJson = (properties: PropertyParser[]): string => {
    let json = '[';
    properties.forEach((property, index) => {
        const jsonified = property.toJson();
        if (!jsonified) return;
        console.log("json :>>", property.toJson());
        json += property.toJson();
        if (index !== properties.length - 1)
            json += ',';
    });
    json += ']';
    return json;
}

export function getPropertyType(propertyDeclaration: ClassMemberTypes, typeCHecker: TypeChecker): StructureType {
    if (typeCHecker.getTypeAtLocation(propertyDeclaration).getCallSignatures().length > 0) {
        return StructureType.methodDeclarationStructure;
    }
    switch (propertyDeclaration.getKind()) {
        case SyntaxKind.PropertyDeclaration: {
            if (propertyDeclaration.getInitializer() !== undefined) {
                return StructureType.methodDeclarationStructure
            }

            return StructureType.propertyDeclarationStructure;
        }
        case SyntaxKind.MethodDeclaration:
            return StructureType.methodDeclarationStructure;
        case SyntaxKind.GetAccessor:
            return StructureType.getAccessorDeclarationStructure;
        case SyntaxKind.SetAccessor:
            return StructureType.setAccessorDeclarationStructure;
        case SyntaxKind.Constructor:
            return StructureType.constructorDeclarationStructure;
        default:
            throw new Error(`Unknown property type ${SyntaxKind[propertyDeclaration.getKind()]}`);
    }
}

export function getTypeFromImport(type: Type): string {
    return type.getText(undefined, TypeFormatFlags.UseAliasDefinedOutsideCurrentScope);
}


export function fillVariableProperties(node: Type, variable: IVariable): IVariable {
    const setParameterTypes = (types: Type[]) => {
        variable.parameterTypes = types.map(getTypeFromImport);
    };

    if (node.getSymbol()?.isOptional()) {
        variable.isOptional = true;
    }
    if (node?.isArray() || node?.isReadonlyArray()) {
        variable.isArray = true;
        console.log("isArray")
        setParameterTypes([node?.getArrayElementType()]);
    } else if (node?.isTuple()) {
        variable.isTuple = true;
        setParameterTypes(node?.getTupleElements());
    } else if (node?.isUnion()) {
        variable.isUnion = true;
        setParameterTypes(node.getUnionTypes());
    } else if (node?.isIntersection() && !variable.isUnion) {
        variable.isIntersection = true;
        setParameterTypes(node.getIntersectionTypes());
    } else if (node?.isBoolean()) {
        variable.isBoolean = true;
        variable.parameterTypes = ["boolean"];
    } else if (node?.isString()) {
        variable.parameterTypes = ["string"];
    } else if (node?.isNumber()) {
        variable.parameterTypes = ["number"];
    } else if (node?.isUndefined()) {
        variable.parameterTypes = ["undefined"];
    } else if (node?.isNull()) {
        variable.parameterTypes = ["null"];
    } else if (node.isAnonymous()) {
        variable.isAnonymous = true;
        setParameterTypes(node.getCallSignatures().map(sig => sig.getReturnType()));
    } else if (node.isClass()) {
        variable.isClass = true;
        setParameterTypes([node]);
    } else if (node.isInterface()) {
        variable.isInterface = true;
        setParameterTypes([node]);
    } else if (node.isEnum()) {
        variable.isEnum = true;
        setParameterTypes([node]);
    } else if (node.isVoid()) {
        variable.isVoid = true;
        variable.parameterTypes = ["void"];
    } else if (node.isAny()) {
        variable.isAny = true;
        variable.parameterTypes = ["any"];
    } else if (["Map", "Set", "WeakMap", "WeakSet", "Promise"].includes(node?.getSymbol()?.getName())) {
        variable[`is${node.getSymbol().getName()}`] = true;
        setParameterTypes(node.getTypeArguments());
    } else if (node.getTargetType()?.getText().includes("Record")) {
        variable.isRecord = true;
        setParameterTypes(node.getAliasTypeArguments());
    } else if (node.getTargetType()?.getText().includes("Partial")) {
        variable.isPartial = true;
    }

    if (variable.parameterTypes) {
        variable.parameterTypes = variable.parameterTypes.flatMap(type => type.split("|").map(t => t.trim()));
    } else {
        setParameterTypes(node.getAliasTypeArguments());
    }

    return variable;
}