
export class IRuntimeEnumInterface {
  name!: string; // The name of the enum
  properties!: Record<string, string | number>; // The properties of the enum (key-value pairs)
  propertiesType!: Record<string, string>; // The type of the properties (string, number)
  filePath!: string; // The path to the file where the enum is declared
  startLine!: number; // The starting line number of the enum in the source file
  endLine!: number; // The ending line number of the enum in the source file
  description?: string; // The description/comment associated with the enum, if available

}

export enum InheritanceType {
    EXTENDS = "extends",
    IMPLEMENTS = "implements",
}

export enum GetEnum {
  MAP = "MAP",
  RECORD = "RECORD",
  LIST = "LIST",
  MARKDOWN = "MARKDOWN",
  MERMAID = "MERMAID",
  JSONSCHEMA31 = "JSONSCHEMA31",
}

export enum PrintEnum {
    JSON = "JSON",
    MARKDOWN = "MARKDOWN",
    MERMAID = "MERMAID",
    JSONSCHEMA31 = "JSONSCHEMA31",
}