import { intersection, type, partial, string, number, TypeOf, array } from "io-ts";
import DataLoader from "dataloader";
import { isNotNullish } from "../../../common";
import { DynamoDBDataSource, dataLoaderOptions } from "../client";
import { planet, species, starship, vehicle } from "./common";

export const person = intersection([
    type({
        id: string,
        created: string,
        edited: string,
        gender: string,
        name: string,
    }),
    partial({
        films: array(string),
        species: species,
        starships: array(starship),
        vehicles: array(vehicle),
        homeworld: planet,
        birthYear: string,
        height: number,
        mass: number,
        hairColor: array(string),
        eyeColor: array(string),
        skinColor: array(string),
    }),
]);
export type Person = TypeOf<typeof person>;
export const isPerson = (u: unknown): u is Person => person.is(u);

export const PERSON_TABLE_NAME = "people";

export const batchGetPeople = (client: DynamoDBDataSource): DataLoader<string, Person> =>
    new DataLoader(async (ids: readonly string[]): Promise<Person[]> => {
        const productList = await client.people.batchItems({
            RequestItems: {
                people: {
                    Keys: ids.map((id) => ({
                        id: { S: id },
                    })),
                    ProjectionExpression: "ATTRIBUTE_NAME",
                },
            },
        });
        if (!productList) throw new Error();
        return productList.people
            .map((person) => {
                const json =
                    typeof person?.json === "string"
                        ? (JSON.parse(person.json) as unknown)
                        : undefined;
                if (isPerson(json)) {
                    return json;
                }
                return undefined;
            })
            .filter(isNotNullish);
    }, dataLoaderOptions(PERSON_TABLE_NAME));
