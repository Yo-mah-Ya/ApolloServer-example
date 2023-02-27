import {
    DynamoDBClient,
    DynamoDBClientConfig,
    BatchGetItemCommand,
    BatchGetItemCommandInput,
    BatchGetItemCommandOutput,
} from "@aws-sdk/client-dynamodb";
import type { KeysAndAttributes } from "@aws-sdk/client-dynamodb/dist-types";
import type { NativeAttributeValue } from "@aws-sdk/util-dynamodb/dist-types/models";
import {
    DynamoDBDocumentClient,
    GetCommand,
    GetCommandInput,
    // GetCommandOutput,
    UpdateCommand,
    UpdateCommandInput,
    PutCommand,
    PutCommandInput,
} from "@aws-sdk/lib-dynamodb";
import DataLoader from "dataloader";
import { Film, isFilm, Person, isPerson } from "./tables";
import { Logger } from "../../common";

export const dataLoaderOptions = <V>(
    contentType: string
): DataLoader.Options<string, V, string> => ({
    batch: true,
    cacheKeyFn: (key: string) => `${contentType}-${key}`,
});

export type DynamoDBClientHelper<
    T extends string,
    I extends Record<string, NativeAttributeValue>,
    HashKey extends keyof I,
    RangeKey extends keyof I = string
> = {
    getItem: (
        input: Omit<GetCommandInput, "TableName"> & {
            Key: { [H in HashKey]: I[HashKey] } & Partial<{
                [R in RangeKey]: I[RangeKey];
            }>;
        }
    ) => Promise<I | undefined>;
    batchItems: (
        param: Omit<BatchGetItemCommandInput, "RequestItems"> & {
            RequestItems: Record<T, KeysAndAttributes>;
        }
    ) => Promise<BatchGetItemCommandOutput["Responses"]>;
    updateItem: (input: Omit<UpdateCommandInput, "TableName">) => Promise<void>;
    putItem: (input: Omit<PutCommandInput, "TableName"> & { Item: I }) => Promise<void>;
};
const dynamoDBClientHelper = <
    T extends string,
    I extends Record<string, NativeAttributeValue>,
    HashKey extends keyof I,
    RangeKey extends keyof I = string
>(
    client: DynamoDBDocumentClient,
    table: T,
    isCodec: (json: unknown) => json is I
): DynamoDBClientHelper<T, I, HashKey, RangeKey> => ({
    getItem: async (
        input: Omit<GetCommandInput, "TableName"> & {
            Key: { [H in HashKey]: I[HashKey] } & Partial<{
                [R in RangeKey]: I[RangeKey];
            }>;
        }
    ): Promise<I | undefined> => {
        const json = (
            await client.send(
                new GetCommand({
                    ...input,
                    TableName: table,
                })
            )
        ).Item;
        if (json == undefined) return undefined;
        if (isCodec(json)) {
            return json;
        }
        Logger.warn({
            message: "DynamoDB.GetCommand. Bad codec",
            table,
            Key: input.Key,
        });
        return undefined;
    },
    batchItems: async (
        param: Omit<BatchGetItemCommandInput, "RequestItems"> & {
            RequestItems: Record<T, KeysAndAttributes>;
        }
    ): Promise<BatchGetItemCommandOutput["Responses"]> => {
        return (
            await client.send(
                new BatchGetItemCommand({
                    ...param,
                    RequestItems: {
                        [table]: param.RequestItems[table],
                    },
                })
            )
        ).Responses;
    },
    updateItem: async (input: Omit<UpdateCommandInput, "TableName">): Promise<void> => {
        await client.send(
            new UpdateCommand({
                ...input,
                TableName: table,
            })
        );
    },
    putItem: async (
        input: Omit<PutCommandInput, "TableName"> & { Item: I }
    ): Promise<void> => {
        await client.send(
            new PutCommand({
                ...input,
                TableName: table,
            })
        );
    },
});

export type DynamoDBDataSource = {
    films: DynamoDBClientHelper<"films", Film, "id">;
    people: DynamoDBClientHelper<"people", Person, "id">;
};
export const initializeClient = (
    clientConfig: DynamoDBClientConfig
): DynamoDBDataSource => {
    const client = DynamoDBDocumentClient.from(
        new DynamoDBClient({
            region: process.env.AWS_REGION,
            ...clientConfig,
        }),
        {
            marshallOptions: {
                // https://github.com/aws/aws-sdk-js-v3/issues/4280
                removeUndefinedValues: true,
            },
        }
    );
    return {
        films: dynamoDBClientHelper(client, "films", isFilm),
        people: dynamoDBClientHelper(client, "people", isPerson),
    };
};
