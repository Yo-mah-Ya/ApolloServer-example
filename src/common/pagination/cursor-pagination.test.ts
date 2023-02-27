import { query } from "./cursor-pagination";

type Test = { id: string; name: string };
type Args = {
    after?: string;
    before?: string;
    first?: number;
    last?: number;
};
const edges = [
    { node: { id: "0", name: "test 0" }, cursor: "dGVzdDow" },
    { node: { id: "1", name: "test 1" }, cursor: "dGVzdDox" },
    { node: { id: "2", name: "test 2" }, cursor: "dGVzdDoy" },
    { node: { id: "3", name: "test 3" }, cursor: "dGVzdDoz" },
    { node: { id: "4", name: "test 4" }, cursor: "dGVzdDo0" },
    { node: { id: "5", name: "test 5" }, cursor: "dGVzdDo1" },
    { node: { id: "6", name: "test 6" }, cursor: "dGVzdDo2" },
    { node: { id: "7", name: "test 7" }, cursor: "dGVzdDo3" },
    { node: { id: "8", name: "test 8" }, cursor: "dGVzdDo4" },
    { node: { id: "9", name: "test 9" }, cursor: "dGVzdDo5" },
];
const nodes: Test[] = [
    { id: "0", name: "test 0" },
    { id: "1", name: "test 1" },
    { id: "2", name: "test 2" },
    { id: "3", name: "test 3" },
    { id: "4", name: "test 4" },
    { id: "5", name: "test 5" },
    { id: "6", name: "test 6" },
    { id: "7", name: "test 7" },
    { id: "8", name: "test 8" },
    { id: "9", name: "test 9" },
];
const TOTAL_COUNT = nodes.length;

const dummyQuery = async (): Promise<{ totalCount: number; nodes: Test[] }> => {
    return await Promise.resolve({
        totalCount: TOTAL_COUNT,
        nodes: [],
    });
};
describe("firstTimeQuery", () => {
    test("hasNextPage: true", async () => {
        expect(
            await query<Test, Args>({ first: 3 }, "test", {
                firstTimeQuery: async () => {
                    return await Promise.resolve({
                        totalCount: TOTAL_COUNT,
                        nodes: nodes.slice(0, 3),
                    });
                },
                forwardQuery: dummyQuery,
                backwardQuery: dummyQuery,
            })
        ).toStrictEqual({
            edges: edges.slice(0, 3),
            pageInfo: {
                endCursor: edges[2].cursor,
                hasNextPage: true,
                hasPreviousPage: false,
                startCursor: edges[0].cursor,
            },
            totalCount: TOTAL_COUNT,
            nodes: nodes.slice(0, 3),
        });
    });
    test("hasNextPage: false", async () => {
        expect(
            await query<Test, Args>({ first: 11 }, "test", {
                firstTimeQuery: async () => {
                    return await Promise.resolve({
                        totalCount: TOTAL_COUNT,
                        nodes: nodes,
                    });
                },
                forwardQuery: dummyQuery,
                backwardQuery: dummyQuery,
            })
        ).toStrictEqual({
            edges: edges,
            pageInfo: {
                endCursor: edges[edges.length - 1].cursor,
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: edges[0].cursor,
            },
            totalCount: TOTAL_COUNT,
            nodes: nodes,
        });
    });
});

describe("forwardQuery", () => {
    test("hasNextPage: true", async () => {
        expect(
            await query<Test, Args>({ first: 3, after: "dGVzdDoz" }, "test", {
                firstTimeQuery: dummyQuery,
                forwardQuery: async (): Promise<{
                    totalCount: number;
                    nodes: Test[];
                }> => {
                    return await Promise.resolve({
                        totalCount: TOTAL_COUNT,
                        nodes: nodes.slice(3, 6),
                    });
                },
                backwardQuery: dummyQuery,
            })
        ).toStrictEqual({
            edges: edges.slice(3, 6),
            pageInfo: {
                endCursor: edges[5].cursor,
                hasNextPage: true,
                hasPreviousPage: true,
                startCursor: edges[3].cursor,
            },
            totalCount: TOTAL_COUNT,
            nodes: nodes.slice(3, 6),
        });
    });
    test("hasNextPage: false", async () => {
        expect(
            await query<Test, Args>({ first: 3, after: "dGVzdDo5" }, "test", {
                firstTimeQuery: dummyQuery,
                forwardQuery: async (): Promise<{
                    totalCount: number;
                    nodes: Test[];
                }> => {
                    return await Promise.resolve({
                        totalCount: TOTAL_COUNT,
                        nodes: nodes.slice(nodes.length - 1),
                    });
                },
                backwardQuery: dummyQuery,
            })
        ).toStrictEqual({
            edges: edges.slice(edges.length - 1),
            pageInfo: {
                endCursor: edges[edges.length - 1].cursor,
                hasNextPage: false,
                hasPreviousPage: true,
                startCursor: edges[edges.length - 1].cursor,
            },
            totalCount: TOTAL_COUNT,
            nodes: nodes.slice(nodes.length - 1),
        });
    });
});

describe("backwardQuery", () => {
    const reversedEdges = [...edges].reverse();
    const reversedNodes = [...nodes].reverse();
    test("hasPreviousPage: true", async () => {
        expect(
            await query<Test, Args>({ last: 3, before: "dGVzdDoz" }, "test", {
                firstTimeQuery: dummyQuery,
                forwardQuery: dummyQuery,
                backwardQuery: async (): Promise<{
                    totalCount: number;
                    nodes: Test[];
                }> => {
                    return await Promise.resolve({
                        totalCount: TOTAL_COUNT,
                        nodes: reversedNodes.slice(3, 6),
                    });
                },
            })
        ).toStrictEqual({
            edges: reversedEdges.slice(3, 6),
            pageInfo: {
                endCursor: reversedEdges[5].cursor,
                hasNextPage: true,
                hasPreviousPage: true,
                startCursor: reversedEdges[3].cursor,
            },
            totalCount: TOTAL_COUNT,
            nodes: reversedNodes.slice(3, 6),
        });
    });
    test("hasPreviousPage: false", async () => {
        expect(
            await query<Test, Args>({ last: 3, before: "dGVzdDoz" }, "test", {
                firstTimeQuery: dummyQuery,
                forwardQuery: dummyQuery,
                backwardQuery: async (): Promise<{
                    totalCount: number;
                    nodes: Test[];
                }> => {
                    return await Promise.resolve({
                        totalCount: TOTAL_COUNT,
                        nodes: reversedNodes.slice(reversedNodes.length - 1),
                    });
                },
            })
        ).toStrictEqual({
            edges: reversedEdges.slice(reversedEdges.length - 1),
            pageInfo: {
                endCursor: reversedEdges[reversedEdges.length - 1].cursor,
                hasNextPage: true,
                hasPreviousPage: false,
                startCursor: reversedEdges[reversedEdges.length - 1].cursor,
            },
            totalCount: TOTAL_COUNT,
            nodes: reversedNodes.slice(reversedNodes.length - 1),
        });
    });
});
