import {InterfaceDeclaration, MethodSignature, SyntaxKind} from "ts-morph";
import {IInterface, IMethod, IParameter, IStatement} from "@handler/project/interface/interface.interface";


export class InterfaceParser {
    name!: string;
    interfaceDecl: InterfaceDeclaration;
    interface!: IInterface;
    startLine!: number;
    endLine!: number;
    filePath!: string;
    properties!: IProperty[];
    description?: string;

    inheritances!: {
        name: string;
        isExtends: boolean;
        isImplements: boolean
    }[];

    methods!: {
        name: string;
        returnType: string;
        parameters: IParameter[];
        isAsync: boolean;
        bodyStatements?: IStatement[];
    }[];


    constructor(interfaceDecl: InterfaceDeclaration) {
        this.interfaceDecl = interfaceDecl;

        this.setName();
        this.setProperties();
        this.setFileDetails();
        this.setInheritance();
        this.setMethods();
    }

    setName(): void {
        this.name = this.interfaceDecl.getName();
    }

    setProperties(): void {
        this.properties = this.interfaceDecl.getProperties().map((element) => {
            return {
                name: element.getName(),
                type: element.getType().getText().split("|"),
                array: element.getType().isArray(),
                optional: element.hasQuestionToken(),
                readonly: element.isReadonly(),
            };
        });
    }

    setFileDetails(): void {
        this.startLine = this.interfaceDecl.getStartLineNumber();
        this.endLine = this.interfaceDecl.getEndLineNumber();
        this.filePath = this.interfaceDecl.getSourceFile().getFilePath();
    }

    setInheritance(): void {
        this.inheritances = [];
        this.interfaceDecl.getHeritageClauses().forEach((heritageClause) => {
            heritageClause.getTypeNodes().forEach((typeNode) => {
                this.inheritances.push({
                    name: typeNode.getText(),
                    isExtends: heritageClause.getKind() === SyntaxKind.ExtendsKeyword,
                    isImplements: heritageClause.getKind() === SyntaxKind.ImplementsKeyword,
                });
            });
        });

    }

    setMethods(): void {
        const methods: IMethod[] = [];

        this.interfaceDecl.getMethods().forEach((method: MethodSignature) => {
            const parsedMethod: IMethod = {
                name: method.getName(),
                returnType: method.getReturnType().getText(),
                parameters: [],
                isAsync: method.getReturnType().getText().startsWith("Promise<"),
                bodyStatements: [],
            };
            const parsedParameters: IParameter[] = [];
            method.getParameters().forEach((parameter) => {
              const parsedParameter: IParameter = {
                    name: parameter.getName(),
                    type: parameter.getType().getText(),
                    optional: parameter.isOptional(),
              };
              parsedParameters.push(parsedParameter);
            })
            parsedMethod.parameters = parsedParameters;
            methods.push(parsedMethod);
        });
        this.methods = methods;
    }

    toJson(): string {
        const jsoned = {
            name: this.name,
            properties: this.properties,
            methods: this.methods,
            extends: this.inheritances.map((inheritance) => inheritance.name),
            filePath: this.filePath,
            startLine: this.startLine,
            endLine: this.endLine,
            description: this.description,
        }
        return JSON.stringify(jsoned);
    }


}