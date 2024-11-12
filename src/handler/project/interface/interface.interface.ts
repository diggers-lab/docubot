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

export interface IMethod {
    name: string;
    returnType: string;
    parameters: IParameter[];
    isAsync: boolean;
    bodyStatements?: IStatement[];
}

export interface IStatement {
    kind: string;
    details: IVariableDeclaration | IFunctionCall | null;
}

export interface IVariableDeclaration {
    name: string;
    initializer: string;
}

export interface IFunctionCall {
    name: string;
    arguments: string[];
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
