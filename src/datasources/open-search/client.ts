import {
    AwsSigv4Signer,
    AwsSigv4SignerOptions,
    AwsSigv4SignerResponse,
} from "@opensearch-project/opensearch/aws";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import { Client, ClientOptions } from "@opensearch-project/opensearch";
import type {
    IndicesCreate,
    Index,
} from "@opensearch-project/opensearch/api/requestParams";
import type {
    IndicesIndexState,
    SearchRequest,
    SearchResponse,
    ExpandWildcardOptions,
} from "@opensearch-project/opensearch/api/types";
import type { Films, People, Planets, Species, StarShips, Vehicles } from "./type";

export type { Client, ClientOptions, SearchRequestHelper, SearchResponse };
export const signV4 = (): AwsSigv4SignerResponse =>
    AwsSigv4Signer({
        region: process.env.AWS_REGION,
        service: "es",
        getCredentials: () => defaultProvider()(),
    } as AwsSigv4SignerOptions & { service: "es" });

type SearchRequestHelper = Omit<SearchRequest, "index"> & {
    expand_wildcards?: ExpandWildcardOptions;
    track_total_hits?: boolean;
};
type SearchResponseHelper<T> = Omit<SearchResponse<T>, "hits"> & {
    hits: Omit<SearchResponse<T>["hits"], "total"> & {
        total: number;
    };
};
type ClientHelper<T extends Record<string, unknown>> = {
    // search: (params: SearchRequest) => Promise<SearchResponse<T>>;
    search: (params: SearchRequestHelper) => Promise<SearchResponseHelper<T>>;
    createIndex: (
        body: Omit<IndicesCreate<IndicesIndexState>, "index">
    ) => Promise<unknown>;
    upsertDocument: (params: Omit<Index<T>, "index">) => Promise<unknown>;
    deleteIndex: () => Promise<void>;
};
const clientHelper = <T extends Record<string, unknown>>(
    client: Client,
    index: string
): ClientHelper<T> => ({
    // search: async (params: SearchRequest): Promise<SearchResponse<T>> => {
    //     return (await client.search<T>(params)).body;
    // },
    search: async (params: SearchRequestHelper): Promise<SearchResponseHelper<T>> => {
        const { body } = await client.search<SearchResponse<T>>({
            ...params,
            routing: params.routing?.toString(),
            scroll: params.scroll?.toString(),
            _source:
                typeof params._source === "boolean"
                    ? String(params._source)
                    : params._source,
            timeout: params.timeout?.toString(),
            index,
        });
        return {
            ...body,
            hits: {
                ...body.hits,
                total:
                    typeof body.hits.total === "number"
                        ? body.hits.total
                        : body.hits.total.value,
            },
        };
    },
    createIndex: async (
        params: Omit<IndicesCreate<IndicesIndexState>, "index">
    ): Promise<unknown> => {
        return await client.indices.create({
            ...params,
            index,
        });
    },
    upsertDocument: async (params: Omit<Index<T>, "index">): Promise<unknown> => {
        return await client.index({
            id: typeof params.body?.id === "string" ? params.body.id : undefined,
            index,
            body: params.body,
        });
    },
    deleteIndex: async (): Promise<void> => {
        await client.indices.delete({
            index,
        });
    },
});

export type OpenSearchDataSource = {
    films: ClientHelper<Films>;
    people: ClientHelper<People>;
    planets: ClientHelper<Planets>;
    species: ClientHelper<Species>;
    starships: ClientHelper<StarShips>;
    vehicles: ClientHelper<Vehicles>;
};
export const initializeClient = (options: ClientOptions): OpenSearchDataSource => {
    const client = new Client(options);
    return {
        films: clientHelper<Films>(client, "films"),
        people: clientHelper<People>(client, "people"),
        planets: clientHelper<Planets>(client, "planets"),
        species: clientHelper<Species>(client, "species"),
        starships: clientHelper<StarShips>(client, "starships"),
        vehicles: clientHelper<Vehicles>(client, "vehicles"),
    };
};
