export const assertGetEnvValueFrom = (key: string): string => {
    if (typeof key !== "string")
        throw new Error(
            `Cannot get Environment Value. key: ${JSON.stringify(key)} is not string`
        );
    const value = process.env[key];
    if (value == undefined)
        throw new Error(`Cannot get Environment Value. value is undefined, key: ${key}`);
    return value;
};
