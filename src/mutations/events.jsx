import { gql } from "@apollo/client";

export const CREATE_EVENT = gql`
    mutation createEventMutation(
        $poster: Upload
        $datetimeStart: DateTime
        $datetimeEnd: DateTime
        $name: String!
        $description: String
        $venue: String
        $audience: String
        $lastEditedBy: String!
        $mode: String!
    ) {
        createEvent(
            eventData: {
                poster: $poster
                datetimeStart: $datetimeStart
                datetimeEnd: $datetimeEnd
                name: $name
                description: $description
                venue: $venue
                audience: $audience
                lastEditedBy: $lastEditedBy
                mode: $mode
            }
        ) {
            event {
                poster
                datetimeStart
                datetimeEnd
                name
                description
                venue
                audience
                lastEditedBy
                mode
            }
        }
    }
`;

export const UPDATE_EVENT = gql`
    mutation updateEventMutation(
        $id: ID!
        $poster: Upload
        $datetimeStart: DateTime
        $datetimeEnd: DateTime
        $name: String!
        $description: String
        $venue: String
        $audience: String
        $lastEditedBy: String!
        $mode: String!
    ) {
        updateEvent(
            eventData: {
                id: $id
                poster: $poster
                datetimeStart: $datetimeStart
                datetimeEnd: $datetimeEnd
                name: $name
                description: $description
                venue: $venue
                audience: $audience
                lastEditedBy: $lastEditedBy
                mode: $mode
            }
        ) {
            event {
                id
                poster
                datetimeStart
                datetimeEnd
                name
                description
                venue
                audience
                lastEditedBy
                mode
            }
        }
    }
`;

export const DELETE_EVENT = gql`
    mutation deleteEventMutation($id: ID!) {
        deleteEvent(eventData: { id: $id }) {
            event {
                id
                poster
                datetimeStart
                datetimeEnd
                name
                description
                venue
                audience
                lastEditedBy
                mode
                state
            }
        }
    }
`;
