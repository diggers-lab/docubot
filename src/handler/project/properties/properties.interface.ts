import {PropertyDeclaration} from "ts-morph";

export abstract class AbstractPropertyparser {
    name!: string;

    get!: {
        json: () => string;
    }

    constructor(propertyDeclaration: PropertyDeclaration) {
        this.name = propertyDeclaration.getName() ?? "unknown";
        this.get = {
            json: () => this.toJson()
        }
    }
}

export class VariableParser extends AbstractPropertyparser {

}