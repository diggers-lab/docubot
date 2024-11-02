export interface IInterface {
    name: string;
    properties: IProperty[];
    methods: IMethod[];
    extends: string[];
    indexSignature?: IIndexSignature;
    callableSignature?: ICallableSignature;
    constructSignature?: IConstructSignature;
    typeParameters?: string[];
}

export interface IProperty {
    name: string;
    type: string[];
    optional: boolean;
    readonly: boolean;
}

export interface IMethod {
    name: string;
    returnType: string;
    parameters: IParameter[];
}

export interface IParameter {
    name: string;
    type: string;
    optional: boolean;
}

export interface IIndexSignature {
    keyType: string;
    valueType: string;
}

export interface ICallableSignature {
    parameters: IParameter[];
    returnType: string;
}

export interface IConstructSignature {
    parameters: IParameter[];
    returnType: string;
}
