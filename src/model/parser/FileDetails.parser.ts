import {
    ClassDeclaration,
    EnumDeclaration, ExportDeclaration, FunctionDeclaration, ImportDeclaration,
    InterfaceDeclaration,
    SourceFile,
    TypeAliasDeclaration, VariableDeclaration
} from "ts-morph";
import {IFileDetails} from "@model/fileDetails.interface";
import * as fs from "fs";

export type DeclarationType = ClassDeclaration | InterfaceDeclaration | EnumDeclaration | TypeAliasDeclaration | ImportDeclaration | ExportDeclaration | VariableDeclaration | FunctionDeclaration;

export function getUniqueRandomName(declaration: DeclarationType): string {
    return `${declaration.getSourceFile().getText()}_${Math.random().toString(36).substring(7)}`;
}

export enum FileDetailsGetType {
    fileName = "fileName",
    filePath = "filePath",
    startLine = "startLine",
    endLine = "endLine",
    directoryPath = "directoryPath",
    fileSize = "fileSize",
    lastModified = "lastModified",
}

export class FileDetailsParser {
    sourceFile: Readonly<SourceFile>;

    private fileDetails!: IFileDetails;

    constructor(sourceFile: SourceFile) {
        this.fileDetails = {};
        this.setFilePath(sourceFile);
        this.setStartLine(sourceFile);
        this.setEndLine(sourceFile);
        this.setDirectoryPath(sourceFile);
        this.setFileName(sourceFile);
        this.setFileSize(sourceFile);
        this.setLastModified(sourceFile);
        this.sourceFile = sourceFile;
    }

    toJson(): Partial<IFileDetails> {
        return {
            fileName: this.fileDetails.fileName,
            filePath: this.fileDetails.filePath,
            startLine: this.fileDetails.startLine,
            endLine: this.fileDetails.endLine,
            directoryPath: this.fileDetails.directoryPath,
            fileSize: this.fileDetails.fileSize,
            lastModified: this.fileDetails.lastModified
        };
    }

    public get = {
        fileName: (): string => this.fileDetails.fileName,
        filePath: (): string => this.fileDetails.filePath,
        startLine: (): number => this.fileDetails.startLine,
        endLine: (): number => this.fileDetails.endLine,
        directoryPath: (): string => this.fileDetails.directoryPath,
        fileSize: (): number => this.fileDetails.fileSize,
        lastModified: (): Date => this.fileDetails.lastModified
    }

    // Set filePath from SourceFile
    private setFilePath(sourceFile: SourceFile): void {
        this.fileDetails.filePath = Object.freeze(sourceFile.getFilePath().toString());
        this.fileDetails.fileName = Object.freeze(sourceFile.getBaseName().split(".")[0]);
    }

    // Set startLine from SourceFile
    private setStartLine(sourceFile: SourceFile): void {
        this.fileDetails.startLine = Object.freeze(sourceFile.getStartLineNumber().toFixed());
    }

    // Set endLine from SourceFile
    private setEndLine(sourceFile: SourceFile): void {
        this.fileDetails.endLine = Object.freeze(sourceFile.getEndLineNumber().toFixed());
    }

    // Set directoryPath from SourceFile
    private setDirectoryPath(sourceFile: SourceFile): void {
        this.fileDetails.directoryPath = Object.freeze(sourceFile.getDirectoryPath().toString());
    }

    // Set fileName from SourceFile
    private setFileName(sourceFile: SourceFile): void {
        this.fileDetails.fileName = Object.freeze(sourceFile.getBaseName().toString());
    }

    // Set fileSize from SourceFile
    private setFileSize(sourceFile: SourceFile): void {
        const stats = fs.statSync(sourceFile.getFilePath());
        this.fileDetails.fileSize = Object.freeze(stats.size);
    }

    // Set lastModified date from SourceFile
    private setLastModified(sourceFile: SourceFile): void {
        const stats = fs.statSync(sourceFile.getFilePath());
        this.fileDetails.lastModified = Object.freeze(stats.mtime);
    }

}