import { ApolloServer } from "@apollo/server";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import { startStandaloneServer } from "@apollo/server/standalone";
import depthLimit from "graphql-depth-limit";
import { makeExecutableSchema } from "@graphql-tools/schema";
import {
    constraintDirective,
    constraintDirectiveTypeDefs,
} from "graphql-constraint-directive";
import { typeDefs, resolvers } from "./resolvers";
import { graphQLCustomPlugin } from "./graphql-plugins";
import { toNumber, Logger, Fp } from "./common/utils";
import type { DynamoDBDataSource } from "./datasources/dynamodb";
import type { OpenSearchDataSource } from "./datasources/open-search";
import { ServiceContext } from "./context";
import type { GraphQLFormattedError } from "graphql";

const initializeApolloServer = (): ApolloServer<ServiceContext> => {
    return new ApolloServer<ServiceContext>({
        schema: Fp.pipe(
            {
                typeDefs: [constraintDirectiveTypeDefs, typeDefs],
                resolvers,
            },
            makeExecutableSchema,
            constraintDirective()
        ),
        introspection: process.env.NODE_ENV !== "production",
        formatError: ({
            message,
            locations,
            path,
            extensions,
        }): GraphQLFormattedError => {
            Logger.warn({
                message,
                formattedError: {
                    locations: locations
                        ?.map(
                            ({ line, column }) => `{ line: ${line}, column: ${column} }`
                        )
                        .join(", "),
                    path,
                    extensionsCode: extensions?.code,
                },
                callSite: {
                    function: "formatError in ApolloServer",
                },
            });
            return typeof extensions?.code === "string" &&
                [
                    ApolloServerErrorCode.GRAPHQL_PARSE_FAILED,
                    ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED,
                    ApolloServerErrorCode.PERSISTED_QUERY_NOT_FOUND,
                    ApolloServerErrorCode.PERSISTED_QUERY_NOT_SUPPORTED,
                    ApolloServerErrorCode.BAD_USER_INPUT,
                    ApolloServerErrorCode.OPERATION_RESOLUTION_FAILURE,
                    ApolloServerErrorCode.BAD_REQUEST,
                ].includes(extensions.code as ApolloServerErrorCode)
                ? {
                      message: ApolloServerErrorCode.BAD_REQUEST,
                  }
                : {
                      message: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                  };
        },
        validationRules: [depthLimit(10)],
        plugins: [graphQLCustomPlugin],
    });
};

export const createServiceContext = ({
    dynamodb,
    openSearch,
}: {
    dynamodb: DynamoDBDataSource;
    openSearch: OpenSearchDataSource;
}): (() => ServiceContext["dataSources"]) => {
    return () => ({
        dynamodb,
        openSearch,
    });
};

export const startService = async (
    getContext: () => ServiceContext["dataSources"]
): Promise<{
    url: string;
    apolloServer: ApolloServer<ServiceContext>;
}> => {
    const apolloServer = initializeApolloServer();
    const { url } = await startStandaloneServer(apolloServer, {
        listen: { port: toNumber(process.env.APOLLO_SERVER_PORT) ?? 3000 },
        context: async (): Promise<ServiceContext> => {
            return {
                dataSources: getContext(),
            };
        },
    });
    Logger.info({ message: `🚀 Server ready at ${url}` });
    return {
        url,
        apolloServer,
    };
};
