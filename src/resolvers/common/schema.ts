import { gql } from "graphql-tag";

export const typeDefs = gql`
    schema {
        query: Query
        # mutation: Mutation
    }
    type Query
    # type Mutation

    """
    An object with an ID
    """
    interface Node {
        """
        The id of the object.
        """
        id: ID!
    }

    """
    Information about pagination in a connection.
    """
    type PageInfo {
        """
        When paginating forwards, are there more items?
        """
        hasNextPage: Boolean!

        """
        When paginating backwards, are there more items?
        """
        hasPreviousPage: Boolean!

        """
        When paginating backwards, the cursor to continue.
        """
        startCursor: String

        """
        When paginating forwards, the cursor to continue.
        """
        endCursor: String
    }

    """
    An edge in a connection.
    """
    interface Edge {
        """
        The item at the end of the edge
        """
        node: Node!
        """
        A cursor for use in pagination
        """
        cursor: String!
    }
    """
    A connection to a list of items.
    """
    interface Connection {
        """
        Information to aid in pagination.
        """
        pageInfo: PageInfo!
        """
        A list of edges.
        """
        edges: [Edge]
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
        nodes: [Node]
    }

    scalar JSON
    scalar JSONObject
`;
