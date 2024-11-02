import {
    CallSignatureDeclaration, ConstructSignatureDeclaration, HeritageClause,
    IndexSignatureDeclaration,
    InterfaceDeclaration,
    MethodSignature,
    PropertySignature, ts
} from "ts-morph";
import {
    ICallableSignature,
    IConstructSignature,
    IInterface,
    IMethod,
    IProperty
} from "@interface/interface.interface";
import {ProjectHandler} from "@handler/project.handler";

export class IInterfaceHandler {

    static iterateOverInterfaces(project: ProjectHandler): IInterface[] {
        const interfaces = project.project.getSourceFiles().flatMap(file => file.getInterfaces());
        return interfaces.map(interfaceDecl => new IInterfaceHandler(interfaceDecl).interface);
    }
    interfaces: IInterface[] = [];

    constructor(project: ProjectHandler) {
        const interfaces = project.project.getSourceFiles().flatMap(file => file.getInterfaces());
       /* for(const interfaceDecl of interfaces) {
            const result = this.parseInterface(interfaceDecl);
            break;
        }*/
        this.interfaces = interfaces.map(interfaceDecl => this.parseInterface(interfaceDecl));
    }
    private parseInterface(interfaceDecl: InterfaceDeclaration): IInterface {
        const name = interfaceDecl.getName();
        console.log("____\nname: ", name);

            const properties = interfaceDecl.getProperties().map(this.parseProperty);
            const methods = interfaceDecl.getMethods().map(this.parseMethod);
            const extendsList = interfaceDecl.getExtends().map(extended => extended.getText());

            const indexSignature = interfaceDecl.getIndexSignatures().map(this.parseIndexSignature);

            const testSignature = interfaceDecl.getConstructSignatures().map(this.testSignature);
            const callableSignature = interfaceDecl.getCallSignatures().map(this.parseCallableSignature);
            const constructSignature = interfaceDecl.getConstructSignatures().map(this.parseConstructSignature);

            const typeParameters = interfaceDecl.getTypeParameters().map(param => param.getText());

            const heritages = interfaceDecl.getHeritageClauses().map(this.parseHeritageClauses);



            return {
                name,
                properties,
                testSignature,
                methods,
                extends: extendsList,
                indexSignature,
                callableSignature,
                constructSignature,
                typeParameters,
                heritages,
            };
    }

    private parseHeritageClauses(heritageClause: HeritageClause): string {
        const text = heritageClause.getText();
        const token = heritageClause.getToken();
        const types = heritageClause.getTypeNodes().map(typeNode => typeNode.getText());
        console.log("token name: ", ts.SyntaxKind[token]);
        return {
            text,
            token,
            types
        };
    }

    private parseProperty(prop: PropertySignature): IProperty {
        return {
            name: prop.getName(),
            type: prop.getType().getText().split("|"),
            optional: prop.hasQuestionToken(),
            readonly: prop.isReadonly(),
        };
    }

    private parseMethod(method: MethodSignature): IMethod {
        return {
            name: method.getName(),
            returnType: method.getReturnType().getText(),
        };
    }


    private testSignature(signature: ConstructSignatureDeclaration): IConstructSignature {
        const parameters = signature.getParameters().map(param => ({
            name: param.getName(),
            type: param.getType().getText(),
            optional: param.isOptional(),
        }));

        const returnType = signature.getReturnType().getText();
       // const decorators = signature.getDecorators().map(decorator => decorator.getText());
        const typeParameters = signature.getTypeParameters().map(param => param.getText());
        const jsDocTags = signature.getJsDocs().flatMap(doc => doc.getTags().map(tag => tag.getText()));

        return {
            parameters,
            returnType,
           // decorators,
            typeParameters,
            jsDocTags,
        };
    }

    private parseIndexSignature(indexSignature: IndexSignatureDeclaration): IndexSignatureDeclaration {
        const keyType = indexSignature.getKeyType().getText();
        const valueType = indexSignature.getType().getText();
        return { keyType, valueType };
    }

    private parseCallableSignature(callSignature: CallSignatureDeclaration): ICallableSignature {
        return {
            parameters: "callSignature.getParameters().map(this.parseParameter),",
            returnType: "callSignature.getReturnType().getText(),"
        };
    }

    private parseConstructSignature(constructSignature: ConstructSignatureDeclaration): IConstructSignature {
        return {
            parameters: constructSignature.getParameters(),
            returnType: constructSignature.getReturnType().getText(),
        };
    }
}