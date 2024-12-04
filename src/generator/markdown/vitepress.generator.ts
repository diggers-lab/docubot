import {IFileStore} from "./markdown.generator";
import {linkToData} from "../templates/markdown/vitepress/linkToData";

const replaceFilePath = (filePath: string, value: string): string => {
    return filePath.replace("filePath", value);
}

export class VitepressGenerator {
    path: string;
    linkToData: string;

    constructor(docPath: string) {
        this.path = docPath;
        this.linkToData = linkToData();
    }

    generate(fileStore: IFileStore)
    : IFileStore
        {
        let file = "";
        let linkToData = this.linkToData;
        //linkToData = replaceFilePath(linkToData, fileStore.markdownPath.split(".")[0])
        //file = file.concat(linkToData);
        //file = file.concat(fileStore.markdownContent);
        return {
            //markdownPath: fileStore.markdownPath,
           // markdownContent: file,
            dataPath: fileStore.dataPath,
            dataContent: fileStore.dataContent
        }
    }


}