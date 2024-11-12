import {SourceFile} from "ts-morph";

/**
 * Interface representing comprehensive file metadata from ts-morph,
 * covering essential file attributes and metadata within a TypeScript project.
 */
export interface IFileDetails {

    /** File name only */
    fileName: Readonly<string>;

    /** Absolute path to the file */
    filePath: Readonly<string>;

    /** Starting line number of the primary declaration or content within the file */
    startLine: Readonly<number>;

    /** Ending line number of the primary declaration or content within the file */
    endLine: Readonly<number>;

    /** Directory path containing the file */
    directoryPath: Readonly<string>;

    /** Size of the file in bytes */
    fileSize: Readonly<number>;

    /** Date and time of the last modification */
    lastModified: Readonly<Date>;

    /** Indicates if the file is part of the TypeScript project references */
    isInProject: Readonly<boolean>;

    /** Any associated JSDoc or top-level comments describing the file */
    fileComments?: Readonly<string>;

    /** The source file object from ts-morph */
    sourceFile: Readonly<SourceFile>;
}
