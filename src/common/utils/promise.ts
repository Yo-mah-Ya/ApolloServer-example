import { errorMessageOf } from "./error";
import { warn, CallSite } from "./logger";

export const fulfilledOnly = async <T>(
    promises: Array<Promise<T | undefined>>
): Promise<T[]> =>
    (await Promise.allSettled(promises))
        .filter((result) => result.status === "fulfilled")
        .map((result) => (result as PromiseFulfilledResult<T>).value);

export const sleep = (milliseconds: number): Promise<void> =>
    new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    });

export const promiseRetry = async <T, C extends CallSite>(
    func: () => Promise<T>,
    options: { retries: number; delay?: number },
    callSite: C
): Promise<T> => {
    // Do not retry more than 10 times in any cases
    options.retries = options.retries > 10 ? 10 : options.retries;
    while (0 <= options.retries) {
        try {
            return await func();
        } catch (error) {
            warn({
                message: errorMessageOf(error),
                callSite,
                retries: options.retries,
            });
            options.retries--;
            if (0 <= options.retries) {
                await sleep(options.delay ?? 1000);
                continue;
            }
            throw error;
        }
    }
    throw new Error(`Failed to Promise Retry`);
};
