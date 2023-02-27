import { gql } from "graphql-tag";

export const typeDefs = gql`
    extend type Query {
        allPlanets(
            after: String
            first: Int
            before: String
            last: Int
        ): PlanetsConnection
        planet(id: ID, planetID: ID): Planet
    }

    """
    A large mass, planet or planetoid in the Star Wars Universe, at the time of
    0 ABY.
    """
    type Planet implements Node {
        """
        The name of this planet.
        """
        name: String

        """
        The diameter of this planet in kilometers.
        """
        diameter: Int

        """
        The number of standard hours it takes for this planet to complete a single
        rotation on its axis.
        """
        rotationPeriod: Int

        """
        The number of standard days it takes for this planet to complete a single orbit
        of its local star.
        """
        orbitalPeriod: Int

        """
        A number denoting the gravity of this planet, where "1" is normal or 1 standard
        G. "2" is twice or 2 standard Gs. "0.5" is half or 0.5 standard Gs.
        """
        gravity: String

        """
        The average population of sentient beings inhabiting this planet.
        """
        population: Float

        """
        The climates of this planet.
        """
        climates: [String]

        """
        The terrains of this planet.
        """
        terrains: [String]

        """
        The percentage of the planet surface that is naturally occurring water or bodies
        of water.
        """
        surfaceWater: Float
        residentConnection(
            after: String
            first: Int
            before: String
            last: Int
        ): PlanetResidentsConnection
        filmConnection(
            after: String
            first: Int
            before: String
            last: Int
        ): PlanetFilmsConnection

        """
        The ISO 8601 date format of the time that this resource was created.
        """
        created: String

        """
        The ISO 8601 date format of the time that this resource was edited.
        """
        edited: String

        """
        The ID of an object
        """
        id: ID!
    }

    """
    A connection to a list of items.
    """
    type PlanetFilmsConnection {
        """
        Information to aid in pagination.
        """
        pageInfo: PageInfo!

        """
        A list of edges.
        """
        edges: [PlanetFilmsEdge]

        """
        A count of the total number of objects in this connection, ignoring pagination.
        This allows a client to fetch the first five objects by passing "5" as the
        argument to "first", then fetch the total count so it could display "5 of 83",
        for example.
        """
        totalCount: Int

        """
        A list of all of the objects returned in the connection. This is a convenience
        field provided for quickly exploring the API; rather than querying for
        "{ edges { node } }" when no edge data is needed, this field can be be used
        instead. Note that when clients like Relay need to fetch the "cursor" field on
        the edge to enable efficient pagination, this shortcut cannot be used, and the
        full "{ edges { node } }" version should be used instead.
        """
        nodes: [Film]
    }

    """
    An edge in a connection.
    """
    type PlanetFilmsEdge {
        """
        The item at the end of the edge
        """
        node: Film

        """
        A cursor for use in pagination
        """
        cursor: String!
    }

    """
    A connection to a list of items.
    """
    type PlanetResidentsConnection {
        """
        Information to aid in pagination.
        """
        pageInfo: PageInfo!

        """
        A list of edges.
        """
        edges: [PlanetResidentsEdge]

        """
        A count of the total number of objects in this connection, ignoring pagination.
        This allows a client to fetch the first five objects by passing "5" as the
        argument to "first", then fetch the total count so it could display "5 of 83",
        for example.
        """
        totalCount: Int

        """
        A list of all of the objects returned in the connection. This is a convenience
        field provided for quickly exploring the API; rather than querying for
        "{ edges { node } }" when no edge data is needed, this field can be be used
        instead. Note that when clients like Relay need to fetch the "cursor" field on
        the edge to enable efficient pagination, this shortcut cannot be used, and the
        full "{ edges { node } }" version should be used instead.
        """
        nodes: [Person]
    }

    """
    An edge in a connection.
    """
    type PlanetResidentsEdge {
        """
        The item at the end of the edge
        """
        node: Person

        """
        A cursor for use in pagination
        """
        cursor: String!
    }

    """
    A connection to a list of items.
    """
    type PlanetsConnection {
        """
        Information to aid in pagination.
        """
        pageInfo: PageInfo!

        """
        A list of edges.
        """
        edges: [PlanetsEdge]

        """
        A count of the total number of objects in this connection, ignoring pagination.
        This allows a client to fetch the first five objects by passing "5" as the
        argument to "first", then fetch the total count so it could display "5 of 83",
        for example.
        """
        totalCount: Int

        """
        A list of all of the objects returned in the connection. This is a convenience
        field provided for quickly exploring the API; rather than querying for
        "{ edges { node } }" when no edge data is needed, this field can be be used
        instead. Note that when clients like Relay need to fetch the "cursor" field on
        the edge to enable efficient pagination, this shortcut cannot be used, and the
        full "{ edges { node } }" version should be used instead.
        """
        nodes: [Planet]
    }

    """
    An edge in a connection.
    """
    type PlanetsEdge {
        """
        The item at the end of the edge
        """
        node: Planet

        """
        A cursor for use in pagination
        """
        cursor: String!
    }
`;
