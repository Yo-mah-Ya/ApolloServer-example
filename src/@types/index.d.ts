declare namespace NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV: "development" | "staging" | "production";
    }
}
