import {
    ClassMemberTypes, ClassStaticBlockDeclaration,
    ConstructorDeclaration,
    EnumMember, GetAccessorDeclaration,
    MethodDeclaration, PropertyDeclaration,
    Scope, SetAccessorDeclaration, TypeChecker,
    TypeElementTypes
} from "ts-morph";
import {DeclarationType, IVariable} from "@handler/project/properties/method.parser";

export interface IBaseProperty {
    name: string | undefined;
    structureKind: DeclarationType | string;
    scope: Scope;
}

function tata(): string {
    return "tata";
}

class test {
    titikaka: string = "titikaka"
    titi: () => string;
    toto: Map<Readonly<string>, number>;
    reze: Array<string>
    uniontest: Readonly<string> | number;
    intersetiontest:  IVariable & IBaseProperty;
    testMap: Map<IVariable, IBaseProperty>;
    testSet: Set<Promise<IVariable>>;

    private _kiki: string;

    private tatatest: Record<string, IVariable>
    private tototest: WeakSet<IVariable>;
    private kirikou: Set<Promise<IVariable>>
    kakatoes?: Promise<IVariable>;

    set kiki(value: string) {

    }

    get kiki(): string {

    }

    constructor() {
        this.titi = tata
    }

}

/**
 * Class to extract base data from a ts-morph PropertyDeclaration or affiliated type
 * used before defining if this is a method, variable, getter, setter, constructor, or static block
 * used before retrieveing its type
 */
export class PropertyDetaisParser implements IBaseProperty {
    name: string | undefined;
    structureKind: DeclarationType | string;
    scope: Scope;

    constructor(property: ClassMemberTypes | TypeElementTypes | EnumMember | MethodDeclaration |
        GetAccessorDeclaration | SetAccessorDeclaration | ConstructorDeclaration |
        ClassStaticBlockDeclaration, typeChecker: TypeChecker) {
        if (property.getStructure?.name) {
            this.name = property.getStructure().name;
        } else if (property.getName) {
            this.name = property.getName();
        } else {
            this.name = undefined;
        }
        console.log("name :>>", this.name);
        if (property instanceof PropertyDeclaration) {
            console.log("I'm a property");
            this.structureKind = DeclarationType.property;
        } else if (property instanceof MethodDeclaration ) {
            console.log("I'm a method");
            this.structureKind = DeclarationType.function;
        } else if (property instanceof ConstructorDeclaration) {
            console.log("I'm a constructor");
            this.structureKind = DeclarationType.constructor;
        }
    }


}