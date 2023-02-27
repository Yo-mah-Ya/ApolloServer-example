import { fulfilledOnly } from "./promise";
import * as PromiseUtil from "./promise";

describe("promise", () => {
    test("fulfilledOnly", async () => {
        expect(
            await fulfilledOnly([
                Promise.resolve(1),
                Promise.reject(new Error("failed")),
                Promise.resolve(3),
                Promise.resolve(undefined),
                Promise.resolve(5),
                Promise.reject(undefined),
            ])
        ).toStrictEqual(expect.arrayContaining([1, 3, undefined, 5]));
    });
    test("promiseRetry", async () => {
        const mockSpyOn = jest
            .fn()
            .mockImplementation(() => Promise.reject(new Error("error")));
        await expect(
            async () =>
                await PromiseUtil.promiseRetry(
                    mockSpyOn,
                    {
                        retries: 3,
                    },
                    { function: "test" }
                )
        ).rejects.toThrow("error");
        expect(mockSpyOn).toHaveBeenCalledTimes(4);
    });
});
