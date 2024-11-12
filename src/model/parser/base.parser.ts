import {FileDetailsParser} from "@model/parser/FileDetails.parser";

export class FileDetailsHandler {
    fileDetails: Record<string, FileDetailsParser> = {};

    addFileDetails(name: string, fileDetails: FileDetailsParser): void {
        if (this.fileDetails[name]) {
            throw new Error(`File ${name} already exists`);
        }

        this.fileDetails[name] = fileDetails;
    }

    updateFileDetails(name: string, fileDetails: FileDetailsParser): void {
        if (!this.fileDetails[name]) {
            throw new Error(`File ${name} does not exist`);
        }

        this.fileDetails[name] = fileDetails;
    }

    deleteFileDetails(name: string): void {
        if (!this.fileDetails[name]) {
            throw new Error(`File ${name} does not exist`);
        }

        delete this.fileDetails[name];
    }

    getFileDetails(name: string): FileDetailsParser {
        return this.fileDetails[name];
    }

    exists(name: string): boolean {
        return !!this.fileDetails[name];
    }

}