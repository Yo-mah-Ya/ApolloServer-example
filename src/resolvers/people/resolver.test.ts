import { startService, createServiceContext } from "../../service";
import { initializeClient as InitializeDynamoDbClient } from "../../datasources/dynamodb";
import { initializeClient as InitializeOpenSearchClient } from "../../datasources/open-search";
import * as OpenSearchTestUtil from "../../../test/opensearch";
import * as DynamoDbTestUtil from "../../../test/dynamodb";
import type { ApolloServer } from "@apollo/server";
import type { ServiceContext } from "../../context";
import request from "supertest";

describe("", () => {
    const openSearchClient = InitializeOpenSearchClient({
        nodes: ["https://admin:admin@localhost:9200"],
        ssl: {
            rejectUnauthorized: false,
        },
    });
    const dynamodbClient = InitializeDynamoDbClient({
        endpoint: "http://localhost:8000",
    });
    const getContext = createServiceContext({
        dynamodb: dynamodbClient,
        openSearch: openSearchClient,
    });

    let apolloServer: ApolloServer<ServiceContext>;
    let url: string;
    beforeAll(async () => {
        await OpenSearchTestUtil.createAllIndices(openSearchClient);
        await OpenSearchTestUtil.insertDocuments(openSearchClient);
        await DynamoDbTestUtil.insertDocuments(dynamodbClient);
        ({ apolloServer, url } = await startService(getContext));
    });
    afterAll(async () => {
        await OpenSearchTestUtil.deleteAllIndices(openSearchClient);
        await apolloServer.stop();
    });

    test("first", async () => {
        const edges = [
            { cursor: "cGVvcGxlOjE=", node: { id: "1", name: "Luke Skywalker" } },
            { cursor: "cGVvcGxlOjEw", node: { id: "10", name: "Obi-Wan Kenobi" } },
            { cursor: "cGVvcGxlOjEx", node: { id: "11", name: "Anakin Skywalker" } },
            { cursor: "cGVvcGxlOjEy", node: { id: "12", name: "Wilhuff Tarkin" } },
            { cursor: "cGVvcGxlOjEz", node: { id: "13", name: "Chewbacca" } },
            { cursor: "cGVvcGxlOjE0", node: { id: "14", name: "Han Solo" } },
            { cursor: "cGVvcGxlOjE1", node: { id: "15", name: "Greedo" } },
            { cursor: "cGVvcGxlOjE2", node: { id: "16", name: "Jabba Desilijic Tiure" } },
            { cursor: "cGVvcGxlOjE4", node: { id: "18", name: "Wedge Antilles" } },
            { cursor: "cGVvcGxlOjE5", node: { id: "19", name: "Jek Tono Porkins" } },
        ];
        const queryData = {
            query: `
            query allPeople($first: Int) {
                allPeople(first: $first){
                    pageInfo {
                        hasNextPage
                        hasPreviousPage
                        endCursor
                        startCursor
                    }
                    totalCount
                    edges {
                        cursor
                        node {
                            id
                            name
                        }
                    }
                    nodes {
                        id
                        name
                    }
                }
            }
            `,
            variables: {
                first: 10,
            },
        };
        const { body } = (await request(url).post("/").send(queryData)) as {
            body: { data: { allPeople: { edges: unknown[] } } | null };
        };
        expect(body?.data?.allPeople).toStrictEqual({
            pageInfo: {
                hasNextPage: true,
                hasPreviousPage: false,
                endCursor: edges[edges.length - 1].cursor,
                startCursor: edges[0].cursor,
            },
            totalCount: 82,
            edges,
            nodes: edges.map((edge) => edge.node),
        });
    });
    test("first & after", async () => {
        const edges = [
            { cursor: "cGVvcGxlOjI=", node: { id: "2", name: "C-3PO" } },
            { cursor: "cGVvcGxlOjIw", node: { id: "20", name: "Yoda" } },
            { cursor: "cGVvcGxlOjIx", node: { id: "21", name: "Palpatine" } },
            { cursor: "cGVvcGxlOjIy", node: { id: "22", name: "Boba Fett" } },
            { cursor: "cGVvcGxlOjIz", node: { id: "23", name: "IG-88" } },
            { cursor: "cGVvcGxlOjI0", node: { id: "24", name: "Bossk" } },
            { cursor: "cGVvcGxlOjI1", node: { id: "25", name: "Lando Calrissian" } },
            { cursor: "cGVvcGxlOjI2", node: { id: "26", name: "Lobot" } },
            { cursor: "cGVvcGxlOjI3", node: { id: "27", name: "Ackbar" } },
            { cursor: "cGVvcGxlOjI4", node: { id: "28", name: "Mon Mothma" } },
        ];
        const queryData = {
            query: `
            query allPeople($first: Int, $after: String) {
                allPeople(first: $first, after: $after){
                    pageInfo {
                        hasNextPage
                        hasPreviousPage
                        endCursor
                        startCursor
                    }
                    totalCount
                    edges {
                        cursor
                        node {
                            id
                            name
                        }
                    }
                    nodes {
                        id
                        name
                    }
                }
            }
            `,
            variables: {
                first: 10,
                after: "cGVvcGxlOjE5",
            },
        };
        const { body } = (await request(url).post("/").send(queryData)) as {
            body: { data: { allPeople: { edges: unknown[] } } | null };
        };
        expect(body?.data?.allPeople).toStrictEqual({
            pageInfo: {
                hasNextPage: true,
                hasPreviousPage: true,
                endCursor: edges[edges.length - 1].cursor,
                startCursor: edges[0].cursor,
            },
            totalCount: 82,
            edges,
            nodes: edges.map((edge) => edge.node),
        });
    });
});
