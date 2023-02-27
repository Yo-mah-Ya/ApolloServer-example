import { typeDefs as commonTypeDefs } from "./common";
import { typeDefs as filmsTypeDefs, resolvers as filmsResolvers } from "./films";
import { typeDefs as peopleTypeDefs, resolvers as peopleResolvers } from "./people";
import { typeDefs as planetsTypeDefs, resolvers as planetsResolvers } from "./planets";
import { typeDefs as speciesTypeDefs, resolvers as speciesResolvers } from "./species";
import {
    typeDefs as starshipsTypeDefs,
    resolvers as starshipsResolvers,
} from "./starships";
import { typeDefs as vehiclesTypeDefs, resolvers as vehiclesResolvers } from "./vehicles";

export const typeDefs = [
    commonTypeDefs,
    filmsTypeDefs,
    peopleTypeDefs,
    planetsTypeDefs,
    speciesTypeDefs,
    starshipsTypeDefs,
    vehiclesTypeDefs,
];
export const resolvers = [
    filmsResolvers,
    peopleResolvers,
    planetsResolvers,
    speciesResolvers,
    starshipsResolvers,
    vehiclesResolvers,
];
