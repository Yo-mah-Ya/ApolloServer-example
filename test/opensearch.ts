import type { OpenSearchDataSource } from "../src/datasources/open-search";
import { data as filmsData } from "./opensearch/films";
import { data as peopleData } from "./opensearch/people";
import { data as planetsData } from "./opensearch/planets";
import { data as speciesData } from "./opensearch/species";
import { data as starshipsData } from "./opensearch/starships";
import { data as vehiclesData } from "./opensearch/vehicles";

export const createAllIndices = async (client: OpenSearchDataSource): Promise<void> => {
    await Promise.all(
        ((): Promise<unknown>[] => {
            const settings = {
                index: {
                    number_of_shards: 4,
                    number_of_replicas: 3,
                },
            };
            return [
                client.films.createIndex({ body: { settings } }),
                client.people.createIndex({
                    body: {
                        settings,
                        mappings: {
                            properties: { mass: { type: "float" } },
                        },
                    },
                }),
                client.planets.createIndex({
                    body: {
                        settings,
                        mappings: {
                            properties: { surface_water: { type: "float" } },
                        },
                    },
                }),
                client.species.createIndex({ body: { settings } }),
                client.starships.createIndex({ body: { settings } }),
                client.vehicles.createIndex({ body: { settings } }),
            ];
        })()
    );
};
export const insertDocuments = async (client: OpenSearchDataSource): Promise<void> => {
    await Promise.all(
        filmsData.map((d) => {
            return client.films.upsertDocument({
                id: d.id,
                // index,
                body: d,
                refresh: true,
            });
        })
    );
    await Promise.all(
        peopleData.map((d) => {
            return client.people.upsertDocument({
                id: d.id,
                // index,
                body: d,
                refresh: true,
            });
        })
    );
    await Promise.all(
        planetsData.map((d) => {
            return client.planets.upsertDocument({
                id: d.id,
                // index,
                body: d,
                refresh: true,
            });
        })
    );
    await Promise.all(
        speciesData.map((d) => {
            return client.species.upsertDocument({
                id: d.id,
                // index,
                body: d,
                refresh: true,
            });
        })
    );
    await Promise.all(
        starshipsData.map((d) => {
            return client.starships.upsertDocument({
                id: d.id,
                // index,
                body: d,
                refresh: true,
            });
        })
    );
    await Promise.all(
        vehiclesData.map((d) => {
            return client.vehicles.upsertDocument({
                id: d.id,
                // index,
                body: d,
                refresh: true,
            });
        })
    );
    // return client.helpers.bulk({
    //     datasource: datasource.map((d) => omit(d, ["id"])),
    //     flushBytes: 1,
    //     concurrency: 3,
    //     onDocument(d) {
    //         return {
    //             index: {
    //                 _index: index,
    //                 _id: (d as unknown as { id: string }).id,
    //             },
    //         };
    //     },
    // });
};

export const deleteAllIndices = async (client: OpenSearchDataSource): Promise<void> => {
    await Promise.all([
        client.films.deleteIndex(),
        client.people.deleteIndex(),
        client.planets.deleteIndex(),
        client.species.deleteIndex(),
        client.starships.deleteIndex(),
        client.vehicles.deleteIndex(),
    ]);
};
