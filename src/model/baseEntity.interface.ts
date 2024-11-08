

export interface IBaseEntity {
        name: string;
        properties: Record<string, string|number>;
        propertiesType: Record<string, string>;
        filePath: string;
        startLine: number;
        endLine: number;
        description?: string;
}

