export interface IRuntimeEnumInterface {
  name: string; // The name of the enum
  properties: Record<string, string | number>; // The properties of the enum (key-value pairs)
  propertiesType: Record<string, string>; // The type of the properties (string, number)
  filePath: string; // The path to the file where the enum is declared
  startLine: number; // The starting line number of the enum in the source file
  endLine: number; // The ending line number of the enum in the source file
  description?: string; // The description/comment associated with the enum, if available
}
