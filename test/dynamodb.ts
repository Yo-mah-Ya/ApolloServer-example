import { isNotNullish } from "../src/common";
import { DynamoDBDataSource } from "../src/datasources/dynamodb";
import type { Person } from "../src/datasources/dynamodb/tables";
import { data as filmsData } from "./opensearch/films";
import { data as peopleData } from "./opensearch/people";
import { data as planetsData } from "./opensearch/planets";
import { data as speciesData } from "./opensearch/species";
import { data as starshipsData } from "./opensearch/starships";
import { data as vehiclesData } from "./opensearch/vehicles";

type ArrayElementType<T> = T extends (infer E)[] ? E : T;
const toVehicle = (id: string): ArrayElementType<Person["vehicles"]> => {
    const vehicles = vehiclesData.find((v) => v.id === id);
    return vehicles
        ? {
              ...vehicles,
              costInCredits: vehicles.cost_in_credits,
              maxAtmospheringSpeed: vehicles.max_atmosphering_speed,
              cargoCapacity: vehicles.cargo_capacity,
              vehicleClass: vehicles.vehicle_class,
          }
        : undefined;
};
const toStarship = (id: string): ArrayElementType<Person["starships"]> => {
    const starship = starshipsData.find((s) => s.id === id);
    return starship
        ? {
              ...starship,
              costInCredits: starship.cost_in_credits,
              maxAtmospheringSpeed: starship.max_atmosphering_speed,
              cargoCapacity: starship.cargo_capacity,
              hyperdriveRating: starship.hyperdrive_rating,
              starshipClass: starship.starship_class,
          }
        : undefined;
};
const toPlanet = (id: string): ArrayElementType<Person["homeworld"]> => {
    return planetsData.find((s) => s.id === id);
};

const toSpecies = (id: string): ArrayElementType<Person["species"]> => {
    const species = speciesData.find((s) => s.id === id);
    return species
        ? {
              ...species,
              averageLifespan: species.average_lifespan,
              averageHeight: species.average_height,
              skinColors: species.skin_colors,
              hairColors: species.hair_colors,
              eyeColors: species.eye_colors,
              homeworld: species.homeworld ? toPlanet(species.homeworld) : undefined,
          }
        : undefined;
};
export const insertDocuments = async (client: DynamoDBDataSource): Promise<void> => {
    await Promise.all([
        peopleData.map((person) =>
            client.people.putItem({
                Item: {
                    ...person,
                    hairColor: person.hair_color,
                    skinColor: person.skin_color,
                    eyeColor: person.eye_color,
                    homeworld: planetsData.find((p) => p.id === person?.homeworld),
                    species: person.species ? toSpecies(person.species) : undefined,
                    starships: person.starships.map(toStarship).filter(isNotNullish),
                    vehicles: person.vehicles.map(toVehicle).filter(isNotNullish),
                },
            })
        ),
        filmsData.map((film) =>
            client.films.putItem({
                Item: {
                    ...film,
                    episodeId: film.episode_id,
                    releaseDate: film.release_date,
                    openingCrawl: film.opening_crawl,
                    planets: film.planets
                        .map((f) => planetsData.find((p) => p.id === f))
                        .filter(isNotNullish),
                    starships: film.starships.map(toStarship).filter(isNotNullish),
                    species: film.species.map(toSpecies).filter(isNotNullish),
                    vehicles: film.vehicles.map(toVehicle).filter(isNotNullish),
                },
            })
        ),
    ]);
};
