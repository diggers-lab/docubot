import {PropertyDeclaration, Type, TypeChecker} from "ts-morph";
import {getTypeFromImport} from "@handler/project/properties/property.converter";

export enum UtilityTypeEnum {
    PROMISE = "Promise",
    PARTIAL = "Partial",
    REQUIRED = "Required",
    READONLY = "Readonly",
    PICK = "Pick",
    OMIT = "Omit",
    RECORD = "Record",
    EXCLUDE = "Exclude",
    EXTRACT = "Extract",
    NON_NULLABLE = "NonNullable",
    PARAMETERS = "Parameters",
    CONSTRUCTOR_PARAMETERS = "ConstructorParameters",
    RETURN_TYPE = "ReturnType",
    INSTANCE_TYPE = "InstanceType",
    THIS_PARAMETER_TYPE = "ThisParameterType",
    OMIT_THIS_PARAMETER = "OmitThisParameter",
    UPPERCASE = "Uppercase",
    LOWERCASE = "Lowercase",
    CAPITALIZE = "Capitalize",
    UNCAPITALIZE = "Uncapitalize",
}

export interface IValueType {
    rawType: string;
    possibleTypes: Set<string>;

    isNullable: boolean;

    isArray: boolean;
    arrayTypes?: Array<string>;

    isUnion: boolean;
    unionTypes?: Array<string>;

    isIntersection: boolean;
    intersectionTypes?: Array<string>;

    isTuple: boolean;
    tupleTypes?: Array<string>;

    isMap: boolean;
    MapTypes?: Array<string>;

    isSet: boolean;
    SetTypes?: Array<string>;

    isWeakMap: boolean;
    WeakMapTypes?: Array<string>;

    isWeakSet: boolean;
    WeakSetTypes?: Array<string>;

    isRecord: boolean;
    RecordTypes?: Array<string>;

    isPromise: boolean;
    PromiseTypes?: Array<string>;

    isReadonly: boolean;
    isOptional: boolean;

    isUtilityType: boolean;
    utilityType?: Array<string>;

    isAnonymous: boolean;
}

export class ValueTypeParser {
    private readonly _propertyDeclaration!: PropertyDeclaration;
    private readonly _typeChecker!: TypeChecker;

    private rawType!: string;

    setRawType() {
        this.rawType = getTypeFromImport(this._propertyDeclaration.getType());
    }

    private _possibleTypes: Set<string> = new Set<string>();

    private set possibleTypes(type: Type) {
        this._possibleTypes.add(getTypeFromImport(type));
    }

    setPossibleTypes() {
        this._propertyDeclaration.getType().getTypeArguments().forEach((type) => {
            this.possibleTypes = type;
        });
    }

    private isNullable!: boolean;

    setIsNullable() {
        this.isNullable = this._propertyDeclaration.getType().isNullable();
    }

    private isArray!: boolean;

    setIsArray() {
        this.isArray = this._propertyDeclaration.getType().isArray();
    }

    private isUnion!: boolean;

    setIsUnion() {
        this.isUnion = this._propertyDeclaration.getType().isUnion();
        this._propertyDeclaration.getType().getUnionTypes().forEach((type) => {
            this.possibleTypes = type;
        });

    }

    private isIntersection!: boolean;

    setIsIntersection() {
        this.isIntersection = this._propertyDeclaration.getType().isIntersection();
        this._propertyDeclaration.getType().getIntersectionTypes().forEach((type) => {
            this.possibleTypes = type;
        });
    }

    private isTuple!: boolean;

    setIsTuple() {
        this.isTuple = this._propertyDeclaration.getType().isTuple();
        this._propertyDeclaration.getType().getTupleElements().forEach((type) => {
            this.possibleTypes = type;
        });
    }

    private isMap!: boolean;

    setIsMap() {
        if (["Map"].includes(this._propertyDeclaration.getType().getSymbol()?.getName())) {
            this.isMap = true;
            this._propertyDeclaration.getType().getTypeArguments().forEach((type) => {
                this.possibleTypes = type;
            });
        }
    }

    private isSet!: boolean;

    setIsSet() {
        if (["Set"].includes(this._propertyDeclaration.getType().getSymbol()?.getName())) {
            this.isSet = true;
            this._propertyDeclaration.getType().getTypeArguments().forEach((type) => {
                this.possibleTypes = type;
            });
        }
    }

    private isWeakMap!: boolean;

    setIsWeakMap() {
        if (["WeakMap"].includes(this._propertyDeclaration.getType().getSymbol()?.getName())) {
            this.isWeakMap = true;
            this._propertyDeclaration.getType().getTypeArguments().forEach((type) => {
                this.possibleTypes = type;
            });
        }
    }

    private isWeakSet!: boolean;

    setIsWeakSet() {
        if (["WeakSet"].includes(this._propertyDeclaration.getType().getSymbol()?.getName())) {
            this.isWeakSet = true;
            this._propertyDeclaration.getType().getTypeArguments().forEach((type) => {
                this.possibleTypes = type;
            });
        }
    }

    private isRecord!: boolean;

    setIsRecord() {
        if (this._propertyDeclaration.getType().getTargetType()?.getText().includes("Record")) {
            this.isRecord = true;
            this._propertyDeclaration.getType().getAliasTypeArguments().forEach((type) => {
                this.possibleTypes = type;
            });
        }
    }

    private isPromise!: boolean;

    setIsPromise() {
        if (this._propertyDeclaration.getType().getSymbol()?.getName() === "Promise") {
            this.isPromise = true;
            this._propertyDeclaration.getType().getTypeArguments().forEach((type) => {
                this.possibleTypes = type;
            });
        }
    }

    private isReadonly!: boolean;

    setIsReadonly() {
        this.isReadonly = this._propertyDeclaration.isReadonly();
    }

    private isOptional!: boolean;

    setIsOptional() {
        this.isOptional = this._propertyDeclaration.hasQuestionToken();
    }

    private isStatic!: boolean;

    setIsStatic() {
        this.isStatic = this._propertyDeclaration.isStatic();
    }

    private isAbstract!: boolean;

    setIsAbstract() {
        this.isAbstract = this._propertyDeclaration.isAbstract();
    }

    private isAnonymous!: boolean;

    setIsAnonymous() {
        if (!this._propertyDeclaration.getName() || this._propertyDeclaration.getName() === "") {
            this.isAnonymous = true
        }
    }

    private isUtilityType!: boolean;
    private utilityTypes: string[] = []; // possibleType found

    setIsUtilityType() {
        const typeArguments = this._propertyDeclaration.getType().getTypeArguments();
        if (typeArguments.length === 0) {
            return ;
        }
        const utilityTypes = [];
        const utilityEnumsTypes = Object.values(UtilityTypeEnum);
        for(const type of this._possibleTypes) {
            // check if one of the utilityEnumsType is contained in the type
            if (utilityEnumsTypes.some((utilityType) => type.includes(utilityType))) {
                this.isUtilityType = true;
                this.utilityTypes.push(type);

            }
        }

    }


    constructor(property: PropertyDeclaration, typeChecker: TypeChecker) {
        this._propertyDeclaration = property;
        this._typeChecker = typeChecker;

        // iterate over the set{variableName} methods and call them
        Object.keys(this).forEach((key) => {
            if (this[`set${key.charAt(0).toUpperCase() + key.slice(1)}`]) {
                this[`set${key.charAt(0).toUpperCase() + key.slice(1)}`]();
             }
        })
    }

    toJson(): Partial<IValueType> {
        const tmp = {...this};
        delete (tmp as any)._propertyDeclaration;
        tmp.possibleTypes = tmp._possibleTypes
        delete tmp._possibleTypes;
        delete (tmp as any)._typeChecker;
        return Object.freeze(tmp) as Partial<IValueType>;
    }

}