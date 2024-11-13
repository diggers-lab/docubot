import {PropertyParser,} from "@handler/project/properties/property.parser";
import {ClassMemberTypes, SyntaxKind, Type, TypeChecker, TypeFormatFlags} from "ts-morph";
import {StructureType} from "@handler/project/properties/properties.handler";

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
