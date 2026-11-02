/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly Backend_localhost: string;
    readonly Backend_host: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}