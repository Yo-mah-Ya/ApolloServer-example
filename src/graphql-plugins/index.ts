import type { ApolloServerPlugin } from "@apollo/server";
import { Logger } from "../common";

export const graphQLCustomPlugin: ApolloServerPlugin = {
    requestDidStart: async () => {
        const startTime = new Date().getTime();
        return {
            didEncounterErrors: async ({ errors }): Promise<void> => {
                errors.forEach((error) => {
                    Logger.warn({
                        message: error.message,
                        error: {
                            locations: error.locations
                                ?.map(
                                    ({ line, column }) =>
                                        `{ line: ${line}, column: ${column} }`
                                )
                                .join(", "),
                            path: error.path,
                            originalError: error.originalError,
                            extensionsCode: error.extensions?.code,
                        },
                        callSite: {
                            function: "didEncounterErrors",
                        },
                    });
                });
            },
            willSendResponse: async ({
                request: { operationName, variables },
                errors,
            }): Promise<void> => {
                if (operationName !== "IntrospectionQuery") {
                    const message = {
                        message: "TracingTime",
                        tracing: {
                            durationSeconds: (new Date().getTime() - startTime) / 1000,
                            operationName,
                            variables,
                        },
                    };
                    if (errors) {
                        Logger.info(message);
                    } else {
                        Logger.debug(message);
                    }
                }
            },
        };
    },
};
