import { toNumber } from "./number";

describe("number", () => {
    test("toNumber", () => {
        expect(() => toNumber("string")).toThrow(Error);
        expect(toNumber("0")).toBe(0);
        expect(toNumber("100")).toBe(100);
        expect(toNumber("100.0")).toBe(100.0);
        expect(toNumber(undefined)).toBeUndefined();
        expect(() => toNumber("dummy")).toThrow(Error);
    });
});
