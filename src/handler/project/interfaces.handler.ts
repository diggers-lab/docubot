import {IInterface} from "@interface/interface.interface";

class InterfacesHandler {
    private interfaces: IInterface[];

    constructor(interfaces: IInterface[] = []) {
        this.interfaces = interfaces;
    }

    // Add a new interface to the collection
    addInterface(newInterface: IInterface): void {
        this.interfaces.push(newInterface);
    }

    // Find an interface by name
    findInterface(name: string): IInterface | undefined {
        return this.interfaces.find((intf) => intf.name === name);
    }

    // Update an existing interface by name
    updateInterface(name: string, updatedInterface: Partial<IInterface>): void {
        const index = this.interfaces.findIndex((intf) => intf.name === name);
        if (index === -1) {
            throw new Error(`Interface with name "${name}" not found.`);
        }
        this.interfaces[index] = { ...this.interfaces[index], ...updatedInterface };
    }

    // Save all interfaces to a file (or implement database logic here)
    async saveToFile(filePath: string): Promise<void> {
        const fs = await import('fs/promises');
        await fs.writeFile(filePath, JSON.stringify(this.interfaces, null, 2));
    }

    // Load interfaces from a JSON file
    async loadFromFile(filePath: string): Promise<void> {
        const fs = await import('fs/promises');
        const data = await fs.readFile(filePath, 'utf-8');
        this.interfaces = JSON.parse(data) as IInterface[];
    }

    // Get all interfaces
    getInterfaces(): IInterface[] {
        return this.interfaces;
    }
}

export default InterfacesHandler;
