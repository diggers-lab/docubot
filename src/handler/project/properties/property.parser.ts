import {
    ClassMemberTypes, ClassStaticBlockDeclarationStructure, ConstructorDeclarationOverloadStructure,
    ConstructorDeclarationStructure, EnumMember,
    GetAccessorDeclarationStructure, InterfaceDeclaration, MethodDeclaration,
    MethodDeclarationOverloadStructure,
    MethodDeclarationStructure,
    PropertyDeclaration,
    PropertyDeclarationStructure,
    SetAccessorDeclarationStructure,
    SyntaxKind, TypeChecker, TypeElementTypes, TypeFlags,
    TypeNode
} from "ts-morph";
import {StructureType} from "@handler/project/properties/properties.handler";
import {fillBaseTypeFromType, IBaseProperty, IProperty, IVariable} from "@handler/project/properties/method.parser";
import {fillVariableProperties} from "@handler/project/properties/property.converter";
import {BasePropertyParser} from "@handler/project/properties/baseProperty.parser";
import {PropertyDetaisParser} from "@handler/project/properties/propertyDetails.parser";
import {ValueTypeParser} from "@handler/project/properties/valueType.parser";



export interface IPropertyDetails {
    name: string;
    type: StructureType
    property: IProperty;


   /* array: boolean;
    record: boolean;
    promise: boolean;
    type: string[];
    optional: boolean;
    readonly: boolean;
    callable?: boolean;
    abstract?: boolean;
    static?: boolean;
    arrowFunction?: boolean;
    visibility: "private" | "protected" | "public";*/
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

   /* constructor(structureType: StructureType,
                property: PropertyDeclaration,
                typeChecker: TypeChecker
    ) {
        const tmp: IBaseProperty = fillBaseTypeFromType(property, typeChecker, {} as IBaseProperty);

        if (structureType === StructureType.propertyDeclarationStructure) {
            const variable: IVariable = {
                name: property.getStructure().name,
                variableType: structureType,
                isStatic: property.getStructure().isStatic,
                isAbstract: property.getStructure().isAbstract,
                scope: property.getScope(),
            }
            //this.property = fillVariableProperties(typeChecker.getTypeAtLocation(property), variable);
        } else if (structureType === StructureType.methodDeclarationStructure) {

        }

    }*/

    tototest = (): string => {

    }

    toJson(): string{
        return this.property;
    }
}
    /*

    private setPropertyModifiers(property: PropertyDeclaration): void {
        property.getModifiers().forEach((modifier) => {
            if (modifier.getKind() === SyntaxKind.PrivateKeyword) {
                this.property.visibility = "private";
            }
            if (modifier.getKind() === SyntaxKind.ProtectedKeyword) {
                this.property.visibility = "protected";
            }
            if (modifier.getKind() === SyntaxKind.PublicKeyword) {
                this.property.visibility = "public";
            }
            if (modifier.getKind() === SyntaxKind.ReadonlyKeyword) {
                this.property.readonly = true;
            }
            if (modifier.getKind() === SyntaxKind.AbstractKeyword) {
                this.property.abstract = true;
            }
            if (modifier.getKind() === SyntaxKind.StaticKeyword) {
                this.property.static = true;
            }
            if (modifier.getKind() === SyntaxKind.ArrowFunction) {
                this.property.arrowFunction = true;
            }
            if (modifier.getKind() === SyntaxKind.FunctionKeyword) {
                this.property.arrowFunction = true;
            }
            if (modifier.getKind() === SyntaxKind.FunctionDeclaration) {
                this.property.funcDeclaration = true;
            }
            if (modifier.getKind() === SyntaxKind.FunctionExpression) {
                this.property.funcExpression = true;
            }
            if (modifier.getKind() === SyntaxKind.FunctionType) {
                this.property.funcType = true;
            }
        });
    }

    private setType(property: PropertyDeclaration): void {
        this.property.type = property.getType().getText();
        /*if (property.getTypeNode()?.getKindName() === "TypeReference") {
            this.property.type = property.getTypeNode().getText().split("|");
        } else if (property.getTypeNode()?.getKindName() === "TypeLiteral") {
            this.property.type = property.getTypeNode().getText().split("|");
        } else if (property.getTypeNode()?.getKindName() === "StringKeyword") {
            this.property.type = ["string"];
        } else if (property.getTypeNode()?.getKindName() === "NumberKeyword") {
            this.property.type = ["number"];
        } else if (property.)
        } else if (property.getTypeNode()?.getKindName() === "BooleanKeyword") {
            this.property.type = ["boolean"];
        } else if (property.getTypeNode()?.getKindName() === "ArrayType") {
            this.property.array = true;
            this.property.type = [property.getType().getText()];
        } else {
            this.property.type = [property.getType().getText()];
        }
    }

    private test(property: PropertyDeclaration): void {
        this.property = {} as IPropertyDetails;
        this.property.type = [];
        this.property.name = property.getName();
        if (property.getType().isArray()) {
            console.log("property.getType().getArrayElementType() :>>", property.getType().getArrayElementType());
        }
        if (property.getType().getTypeArguments()) {
            console.log("property.getType().getTypeArguments() :>>", property.getType().getTypeArguments());
        }
        //console.log("namenode :>> ", property.getNameNode().getText());
       property.getTypeNode()?.forEachChild((child) => {
           console.log("child.getType().getTypeArguments(); :>>", child.getType().getTypeArguments());
            //console.log("child: >>", child.getText());
        });

        //console.log("property.getStructure().type; :>> ", property.getStructure().type);
        //console.log("property.getStructure().kind; :>> ", property.getStructure().kind);

        this.setPropertyModifiers(property);

        if (SyntaxKind[property.getKind()] === "PropertySignature") {
            this.property.callable = true;
        } else {
            this.property.callable = false;
        }

        console.log("this.property: >>", this.property);
        //console.log("property name: >>", property.getSymbol()?.getName());
        //console.log("property escaped name: >>", property.getSymbol()?.getEscapedName());


    }

    // Resolves the full type name for imported or local types
    private setProperty()

    getProperty(type: keyof IPropertyDetails): PropertyTypes {
        return this.property[type];
    }
}*/
