import type { ServiceContext } from "../../context";
import { query, cursorOperationWith, responseCursor } from "../../common/pagination";
import type { Resolvers } from "../types";
import { fulfilledOnly, isNotNullish } from "../../common";
import {
    getPeopleWithFirstAndAfter,
    getPeopleWithLastAndAfter,
} from "./opensearch-query";

export const resolvers: Resolvers = {
    Query: {
        allPeople: async (_, args, { dataSources }: ServiceContext) => {
            return await query(args, "people", {
                firstTimeQuery: async (args) => {
                    const { hits } = await dataSources.openSearch.people.search(
                        getPeopleWithFirstAndAfter({
                            after: undefined,
                            first: args.first,
                        })
                    );
                    return {
                        totalCount: hits.total,
                        nodes: (
                            await fulfilledOnly(
                                hits.hits.map((document) =>
                                    dataSources.dynamodb.people.getItem({
                                        Key: { id: document._id },
                                    })
                                )
                            )
                        ).filter(isNotNullish),
                    };
                },
                forwardQuery: async (args) => {
                    const { hits } = await dataSources.openSearch.people.search(
                        getPeopleWithFirstAndAfter(args)
                    );
                    return {
                        totalCount: hits.total,
                        nodes: (
                            await fulfilledOnly(
                                hits.hits.map((document) =>
                                    dataSources.dynamodb.people.getItem({
                                        Key: { id: document._id },
                                    })
                                )
                            )
                        ).filter(isNotNullish),
                    };
                },
                backwardQuery: async (args) => {
                    const { hits } = await dataSources.openSearch.people.search(
                        getPeopleWithLastAndAfter(args)
                    );
                    return {
                        totalCount: hits.total,
                        nodes: (
                            await fulfilledOnly(
                                hits.hits.map((document) =>
                                    dataSources.dynamodb.people.getItem({
                                        Key: { id: document._id },
                                    })
                                )
                            )
                        ).filter(isNotNullish),
                    };
                },
            });
        },
    },
    Person: {
        filmConnection: async (parent, args, { dataSources }: ServiceContext) => {
            const person = await dataSources.dynamodb.people.getItem({
                Key: { id: parent.id },
            });
            if (!person?.films) {
                return {
                    pageInfo: {
                        hasNextPage: false,
                        hasPreviousPage: false,
                    },
                    totalCount: 0,
                    nodes: [],
                    edges: [],
                };
            }
            const first = args.first ?? 10;
            const { hits } = await dataSources.openSearch.films.search({
                body: {
                    query: {
                        terms: {
                            _id: person.films,
                        },
                    },
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
            const { toEdge } = cursorOperationWith("Person.filmConnection");
            const nodes = (
                await fulfilledOnly(
                    hits.hits.map((document) =>
                        dataSources.dynamodb.films.getItem({
                            Key: { id: document._id },
                        })
                    )
                )
            ).filter(isNotNullish);
            const edges = nodes.map(toEdge);
            return {
                pageInfo: {
                    hasPreviousPage: false,
                    hasNextPage: first <= nodes.length,
                    ...responseCursor(edges),
                },
                totalCount: hits.total,
                nodes,
                edges,
            };
        },
    },
};
