import { gql } from "graphql-tag";

export const typeDefs = gql`
    extend type Query {
        allStarships(
            after: String
            first: Int
            before: String
            last: Int
        ): StarshipsConnection
        starship(id: ID, starshipID: ID): Starship
    }

    """
    A single transport craft that has hyperdrive capability.
    """
    type Starship implements Node {
        """
        The name of this starship. The common name, such as "Death Star".
        """
        name: String

        """
        The model or official name of this starship. Such as "T-65 X-wing" or "DS-1
        Orbital Battle Station".
        """
        model: String

        """
        The class of this starship, such as "Starfighter" or "Deep Space Mobile
        Battlestation"
        """
        starshipClass: String

        """
        The manufacturers of this starship.
        """
        manufacturers: [String]

        """
        The cost of this starship new, in galactic credits.
        """
        costInCredits: Float

        """
        The length of this starship in meters.
        """
        length: Float

        """
        The number of personnel needed to run or pilot this starship.
        """
        crew: String

        """
        The number of non-essential people this starship can transport.
        """
        passengers: String

        """
        The maximum speed of this starship in atmosphere. null if this starship is
        incapable of atmosphering flight.
        """
        maxAtmospheringSpeed: Int

        """
        The class of this starships hyperdrive.
        """
        hyperdriveRating: Float

        """
        The Maximum number of Megalights this starship can travel in a standard hour.
        A "Megalight" is a standard unit of distance and has never been defined before
        within the Star Wars universe. This figure is only really useful for measuring
        the difference in speed of starships. We can assume it is similar to AU, the
        distance between our Sun (Sol) and Earth.
        """
        MGLT: Int

        """
        The maximum number of kilograms that this starship can transport.
        """
        cargoCapacity: Float

        """
        The maximum length of time that this starship can provide consumables for its
        entire crew without having to resupply.
        """
        consumables: String
        pilotConnection(
            after: String
            first: Int
            before: String
            last: Int
        ): StarshipPilotsConnection
        filmConnection(
            after: String
            first: Int
            before: String
            last: Int
        ): StarshipFilmsConnection

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
    type StarshipFilmsConnection {
        """
        Information to aid in pagination.
        """
        pageInfo: PageInfo!

        """
        A list of edges.
        """
        edges: [StarshipFilmsEdge]

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
    type StarshipFilmsEdge {
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
    type StarshipPilotsConnection {
        """
        Information to aid in pagination.
        """
        pageInfo: PageInfo!

        """
        A list of edges.
        """
        edges: [StarshipPilotsEdge]

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
    type StarshipPilotsEdge {
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
    type StarshipsConnection {
        """
        Information to aid in pagination.
        """
        pageInfo: PageInfo!

        """
        A list of edges.
        """
        edges: [StarshipsEdge]

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
        nodes: [Starship]
    }

    """
    An edge in a connection.
    """
    type StarshipsEdge {
        """
        The item at the end of the edge
        """
        node: Starship

        """
        A cursor for use in pagination
        """
        cursor: String!
    }
`;
