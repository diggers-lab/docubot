export interface IJsonPackage {
    // Required fields
    name: string;
    version: string;

    // Optional fields
    description?: string;
    keywords?: string[];
    homepage?: string;
    license?: string;
    private?: boolean;

    // Author and contributors
    author?: string | { name: string; email?: string; url?: string };
    contributors?: (string | { name: string; email?: string; url?: string })[];

    // Dependencies
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    peerDependencies?: Record<string, string>;
    optionalDependencies?: Record<string, string>;
    bundledDependencies?: string[] | boolean;

    // Scripts
    scripts?: Record<string, string>;

    // Repository and bugs
    repository?: { type: string; url: string; directory?: string } | string;
    bugs?: { url?: string; email?: string } | string;

    // Engines and platforms
    engines?: Record<string, string>;
    os?: string[];
    cpu?: string[];

    // Package manager and funding
    packageManager?: string;
    funding?: string | { type: string; url: string };

    // Custom fields (user-defined extensions)
    [key: string]: unknown;
}