import { PageInfo, Node } from "../../resolvers/types";
import { string, number, intersection, undefined, type, partial, TypeOf } from "io-ts";

/**
 * first time to get items.
 */
const firstTimeParam = intersection([
    type({ first: number }),
    partial({ after: undefined, last: undefined, before: undefined }),
]);
type FirstTimeParam = TypeOf<typeof firstTimeParam>;
const isFirstTimeParam = (clientParam: unknown): clientParam is FirstTimeParam =>
    firstTimeParam.is(clientParam);
type FirstTimeQuery = Pick<FirstTimeParam, "first">;

/**
 * set the "after" argument searching the next page
 */
const forwardParam = intersection([
    type({ first: number, after: string }),
    partial({ last: undefined, before: undefined }),
]);
type ForwardParam = TypeOf<typeof forwardParam>;
const isForwardParam = (clientParam: unknown): clientParam is ForwardParam =>
    forwardParam.is(clientParam);

type ForwardQuery = Pick<ForwardParam, "first"> & {
    after: string;
};

/**
 * set the "before" argument searching the previous page
 */
const backwardParam = intersection([
    partial({ first: undefined, after: undefined }),
    type({ last: number, before: string }),
]);
type BackwardParam = TypeOf<typeof backwardParam>;
const isBackwardParam = (clientParam: unknown): clientParam is BackwardParam =>
    backwardParam.is(clientParam);
type BackwardQuery = Pick<BackwardParam, "last"> & {
    before: string;
};

/**
 * query
 */
type Edge<T extends Node> = {
    cursor: string;
    node: T;
};
type CursorOperation<T extends Node> = {
    decodeCursor: (cursorValue: string) => string;
    toEdge: (node: T) => Edge<T>;
};
export const cursorOperationWith = <T extends Node>(
    nodeName: string
): CursorOperation<T> => {
    // cursor_prefix:cursor_value
    const cursorKeyWithSeparator = `${nodeName}:`;
    const cursorKeyRegExp = new RegExp(`^${cursorKeyWithSeparator}`);

    const encodeCursor = (cursorValue: string): string =>
        Buffer.from(`${cursorKeyWithSeparator}${cursorValue}`).toString("base64");

    return {
        decodeCursor: (cursor: string): string =>
            Buffer.from(cursor, "base64").toString().replace(cursorKeyRegExp, ""),
        toEdge: (node: T): Edge<T> => ({
            cursor: encodeCursor(node.id),
            node,
        }),
    };
};
export const responseCursor = <T extends Node>(
    edges: Edge<T>[]
): Pick<PageInfo, "startCursor" | "endCursor"> => ({
    startCursor: edges[0]?.cursor,
    endCursor: edges.slice(-1)[0]?.cursor,
});

type QueryResponse<T extends Node> = { nodes: T[]; totalCount: number };
type Queries<T extends Node, P> = {
    firstTimeQuery: (query: P & FirstTimeQuery) => Promise<QueryResponse<T>>;
    forwardQuery: (query: P & ForwardQuery) => Promise<QueryResponse<T>>;
    backwardQuery?: (query: P & BackwardQuery) => Promise<QueryResponse<T>>;
};
export const query = async <T extends Node, P>(
    clientParam: P,
    nodeName: string,
    { firstTimeQuery, forwardQuery, backwardQuery }: Queries<T, P>
): Promise<
    {
        edges: Edge<T>[];
        pageInfo: PageInfo;
    } & QueryResponse<T>
> => {
    if (!nodeName) throw new Error(`nodeName should not be empty`);

    const paramErrorMessageFrom = (func: keyof Queries<T, P>): string =>
        `The clientParam passed, but the ${func} function is not passed`;

    const { toEdge, decodeCursor } = cursorOperationWith<T>(nodeName);

    if (isFirstTimeParam(clientParam)) {
        const { nodes, totalCount } = await firstTimeQuery({
            ...clientParam,
            first: clientParam.first,
        });
        const edges = nodes.map(toEdge);
        return {
            edges,
            pageInfo: {
                hasPreviousPage: false,
                hasNextPage: clientParam.first <= nodes.length,
                ...responseCursor(edges),
            },
            nodes,
            totalCount,
        };
    } else if (isForwardParam(clientParam)) {
        const { nodes, totalCount } = await forwardQuery({
            ...clientParam,
            first: clientParam.first,
            after: decodeCursor(clientParam.after),
        });
        const edges = nodes.map(toEdge);
        return {
            edges,
            pageInfo: {
                hasPreviousPage: true,
                hasNextPage: clientParam.first <= nodes.length,
                ...responseCursor(edges),
            },
            nodes,
            totalCount,
        };
    } else if (isBackwardParam(clientParam)) {
        if (!backwardQuery) throw new Error(paramErrorMessageFrom("backwardQuery"));
        const { nodes, totalCount } = await backwardQuery({
            ...clientParam,
            last: clientParam.last,
            before: decodeCursor(clientParam.before),
        });
        const edges = nodes.map(toEdge);
        return {
            edges,
            pageInfo: {
                hasPreviousPage: clientParam.last <= nodes.length,
                hasNextPage: true,
                ...responseCursor(edges),
            },
            nodes,
            totalCount,
        };
    } else {
        throw new Error(
            `Invalid clientParam for cursor pagination ${JSON.stringify(clientParam)}`
        );
    }
};
