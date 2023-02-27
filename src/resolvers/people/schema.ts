import { gql } from "graphql-tag";

export const typeDefs = gql`
    extend type Query {
        allPeople(after: String, first: Int, before: String, last: Int): PeopleConnection
        person(id: ID, personID: ID): Person
    }

    """
    A connection to a list of items.
    """
    type PeopleConnection {
        """
        Information to aid in pagination.
        """
        pageInfo: PageInfo!

        """
        A list of edges.
        """
        edges: [PeopleEdge]

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
    type PeopleEdge {
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
    An individual person or character within the Star Wars universe.
    """
    type Person implements Node {
        """
        The name of this person.
        """
        name: String

        """
        The birth year of the person, using the in-universe standard of BBY or ABY -
        Before the Battle of Yavin or After the Battle of Yavin. The Battle of Yavin is
        a battle that occurs at the end of Star Wars episode IV: A New Hope.
        """
        birthYear: String

        """
        The eye color of this person. Will be "unknown" if not known or "n/a" if the
        person does not have an eye.
        """
        eyeColor: [String]

        """
        The gender of this person. Either "Male", "Female" or "unknown",
        "n/a" if the person does not have a gender.
        """
        gender: String

        """
        The hair color of this person. Will be "unknown" if not known or "n/a" if the
        person does not have hair.
        """
        hairColor: [String]

        """
        The height of the person in centimeters.
        """
        height: Int

        """
        The mass of the person in kilograms.
        """
        mass: Float

        """
        The skin color of this person.
        """
        skinColor: [String]

        """
        A planet that this person was born on or inhabits.
        """
        homeworld: Planet
        filmConnection(first: Int): PersonFilmsConnection

        """
        The species that this person belongs to, or null if unknown.
        """
        species: Species
        starshipConnection(
            after: String
            first: Int
            before: String
            last: Int
        ): PersonStarshipsConnection
        vehicleConnection(
            after: String
            first: Int
            before: String
            last: Int
        ): PersonVehiclesConnection

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
    type PersonFilmsConnection {
        """
        Information to aid in pagination.
        """
        pageInfo: PageInfo!

        """
        A list of edges.
        """
        edges: [PersonFilmsEdge]

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
    type PersonFilmsEdge {
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
    type PersonStarshipsConnection {
        """
        Information to aid in pagination.
        """
        pageInfo: PageInfo!

        """
        A list of edges.
        """
        edges: [PersonStarshipsEdge]

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
    type PersonStarshipsEdge {
        """
        The item at the end of the edge
        """
        node: Starship

        """
        A cursor for use in pagination
        """
        cursor: String!
    }

    """
    A connection to a list of items.
    """
    type PersonVehiclesConnection {
        """
        Information to aid in pagination.
        """
        pageInfo: PageInfo!

        """
        A list of edges.
        """
        edges: [PersonVehiclesEdge]

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
        nodes: [Vehicle]
    }

    """
    An edge in a connection.
    """
    type PersonVehiclesEdge {
        """
        The item at the end of the edge
        """
        node: Vehicle

        """
        A cursor for use in pagination
        """
        cursor: String!
    }
`;
