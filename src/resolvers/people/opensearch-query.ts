import type { SearchRequestHelper } from "../../datasources/open-search";

export const getPeopleWithFirstAndAfter = ({
    first,
    after,
}: {
    first: number;
    after?: string;
}): SearchRequestHelper => ({
    body: {
        query: {
            match_all: {},
        },
        search_after: after ? [after] : undefined,
        size: first,
        sort: [
            {
                _id: {
                    order: "asc",
                },
            },
        ],
    },
});

export const getPeopleWithLastAndAfter = ({
    last,
    before,
}: {
    last: number;
    before: string;
}): SearchRequestHelper => ({
    body: {
        query: {
            match_all: {},
        },
        search_after: before ? [before] : undefined,
        size: last,
        sort: [
            {
                _id: {
                    order: "desc",
                },
            },
        ],
    },
    size: last,
});
