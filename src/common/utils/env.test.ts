import { assertGetEnvValueFrom } from "./env";

describe("assertGetEnvValueFrom", () => {
    test("key is not string", () => {
        expect(() => assertGetEnvValueFrom(undefined as unknown as string)).toThrowError(
            `Cannot get Environment Value. key: undefined is not string`
        );
    });
    test("value is undefined", () => {
        expect(() => assertGetEnvValueFrom("ENV_KEY")).toThrowError(
            `Cannot get Environment Value. value is undefined, key: ENV_KEY`
        );
    });
    test("assertGetEnvValueFrom", () => {
        process.env.ENV_KEY = "ENV_VALUE";
        expect(assertGetEnvValueFrom("ENV_KEY")).toEqual("ENV_VALUE");
    });
});
