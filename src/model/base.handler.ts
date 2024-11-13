export interface IBaseHandler {
    toString(): string;
    toJson(): string;
    toObject<T>(type: T): T;
    // toJsonSchema(): JSONSchema7;
    toMarkdown(): string;
    //  toMermaid(): toDefine

}

export enum BaseHandlerType {
    toString = "toString",
    toJson = "toJson",
    toObject = "toObject",
    // toJsonSchema = "toJsonSchema",
    toMarkdown = "toMarkdown",
    // toMermaid = "toMermaid",
}

export enum InterfacesObjects {
    interface = "interface",
    property = "property",
    method = "method",
    inheritance = "inheritance",
}