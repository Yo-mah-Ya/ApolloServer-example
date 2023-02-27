import { type, string, number, array, intersection, partial } from "io-ts";

export const planet = intersection([
    type({
        id: string,
        name: string,
        climate: array(string),
        gravity: string,
        terrain: array(string),
        residents: array(string),
        created: string,
        edited: string,
    }),
    partial({
        population: number,
        surfaceWater: number,
        rotationPeriod: number,
        orbitalPeriod: number,
        diameter: number,
    }),
]);
export const starship = type({
    id: string,
    name: string,
    model: string,
    manufacturer: array(string),
    costInCredits: string,
    length: string,
    maxAtmospheringSpeed: string,
    crew: string,
    passengers: string,
    cargoCapacity: string,
    consumables: string,
    hyperdriveRating: string,
    MGLT: string,
    starshipClass: string,
    pilots: array(string),
});
export const species = intersection([
    type({
        id: string,
        name: string,
        classification: string,
        designation: string,
        skinColors: array(string),
        hairColors: array(string),
        eyeColors: array(string),
        averageLifespan: string,
        language: string,
        people: array(string),
        created: string,
        edited: string,
    }),
    partial({ averageHeight: number, homeworld: planet }),
]);
export const vehicle = type({
    id: string,
    name: string,
    model: string,
    manufacturer: array(string),
    costInCredits: string,
    length: string,
    maxAtmospheringSpeed: string,
    crew: string,
    passengers: string,
    cargoCapacity: string,
    consumables: string,
    vehicleClass: string,
});
