import { type, string, number, TypeOf, array } from "io-ts";
import { planet, starship, vehicle, species } from "./common";

const film = type({
    id: string,
    title: string,
    episodeId: number,
    openingCrawl: string,
    director: string,
    producer: array(string),
    releaseDate: string,
    characters: array(string),
    planets: array(planet),
    starships: array(starship),
    vehicles: array(vehicle),
    species: array(species),
    created: string,
    edited: string,
});
export type Film = TypeOf<typeof film>;
export const isFilm = (json: unknown): json is Film => film.is(json);
