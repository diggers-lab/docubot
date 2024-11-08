import {IInterface} from "@handler/project/interface/interface.interface";
import {InterfaceParser} from "@handler/project/interface/interfaceParser";
import {BaseHandlerType, IBaseHandler} from "@model/base.handler";
import {interfaceToJson} from "@handler/project/interface/interface.converter";

export enum InterfacesHandlerGetType {
    json = "json",
}

export class InterfacesHandler {
    private interfaces: Record<string, InterfaceParser> = {};
    get: {
        json: () => string;
    }

    constructor() {
        this.get = {
            json: () => interfaceToJson(this.interfaces)
        }
    }

    public getInterface(interfaceName: string, BaseHandlerType: BaseHandlerType.toJson): string {
        return this.interfaces[interfaceName].toJson();
    }


    public addInterface(interfaceHandler: InterfaceParser) {
        try {
            if (this.interfaces[interfaceHandler.name]) {
                throw new Error(`Interface ${interfaceHandler.name} already exists`);
            }
        } catch (e) {
            console.error(e);
            return;
        }
        this.interfaces[interfaceHandler.name] = interfaceHandler;
    }

    public deleteInterface(interfaceName: string) {
        try {
            if (!this.interfaces[interfaceName]) {
                throw new Error(`Interface ${interfaceName} does not exist`);
            }
        } catch (e) {
            console.error(e);
            return;
        }
        delete this.interfaces[interfaceName];
    }


}