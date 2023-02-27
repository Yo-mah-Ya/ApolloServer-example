import type { DynamoDBDataSource } from "./datasources/dynamodb";
import type { OpenSearchDataSource } from "./datasources/open-search";

export type ServiceContext = {
    dataSources: DataSources;
};
export type DataSources = {
    openSearch: OpenSearchDataSource;
    dynamodb: DynamoDBDataSource;
};
