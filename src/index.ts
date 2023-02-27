import { errorMessageOf, Logger } from "./common";
import { startService, createServiceContext } from "./service";
import { initializeClient as InitializeDynamoDbClient } from "./datasources/dynamodb";
import {
    initializeClient as InitializeOpenSearchClient,
    signV4,
} from "./datasources/open-search";

const isDevelopment = process.env.NODE_ENV === "development";

startService(
    createServiceContext({
        dynamodb: InitializeDynamoDbClient(
            isDevelopment ? { endpoint: process.env.DYNAMODB_ENDPOINT } : {}
        ),
        openSearch: InitializeOpenSearchClient({
            nodes: process.env.OPENSEARCH_NODES,
            requestTimeout: 3000,
            ...(isDevelopment
                ? {
                      ssl: {
                          rejectUnauthorized: false,
                      },
                  }
                : { ...signV4() }),
        }),
    })
).catch((error) => {
    Logger.error({
        message: errorMessageOf(error),
        callSite: { file: __filename },
        exitReason: `failed invoking ${startService.name} function`,
    });
});
