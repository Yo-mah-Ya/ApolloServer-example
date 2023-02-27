import { flow, pipe } from "./function";

describe("function", () => {
    const f = (n: number): number => n + 1;
    const g = (n: number): number => n * 2;
    test("flow", () => {
        expect(flow(f)(2)).toBe(3);
        expect(flow(f, g)(2)).toBe(6);
        expect(flow(f, g, f)(2)).toBe(7);
        expect(flow(f, g, f, g)(2)).toBe(14);
        expect(flow(f, g, f, g, f)(2)).toBe(15);
        expect(flow(f, g, f, g, f, g)(2)).toBe(30);
        expect(flow(f, g, f, g, f, g, f)(2)).toBe(31);
        expect(flow(f, g, f, g, f, g, f, g)(2)).toBe(62);
        expect(flow(f, g, f, g, f, g, f, g, f)(2)).toBe(63);
    });

    test("pipe", () => {
        expect(pipe(2)).toBe(2);
        expect(pipe(2, f)).toBe(3);
        expect(pipe(2, f, g)).toBe(6);
        expect(pipe(2, f, g, f)).toBe(7);
        expect(pipe(2, f, g, f, g)).toBe(14);
        expect(pipe(2, f, g, f, g, f)).toBe(15);
        expect(pipe(2, f, g, f, g, f, g)).toBe(30);
        expect(pipe(2, f, g, f, g, f, g, f)).toBe(31);
        expect(pipe(2, f, g, f, g, f, g, f, g)).toBe(62);
        expect(pipe(2, f, g, f, g, f, g, f, g, f)).toBe(63);
        expect(pipe(2, f, g, f, g, f, g, f, g, f, g)).toBe(126);
        expect(pipe(2, f, g, f, g, f, g, f, g, f, g, f)).toBe(127);
        expect(pipe(2, f, g, f, g, f, g, f, g, f, g, f, g)).toBe(254);
        expect(pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f)).toBe(255);
        expect(pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g)).toBe(510);
        expect(pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f)).toBe(511);
        expect(pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g)).toBe(1022);
        expect(pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f)).toBe(1023);
        expect(pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g)).toBe(2046);
        expect(pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f)).toBe(
            2047
        );
    });
});
