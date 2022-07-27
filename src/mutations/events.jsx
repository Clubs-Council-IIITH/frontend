import { gql } from "@apollo/client";

export const CREATE_EVENT = gql`
    mutation createEventMutation(
        $poster: Upload
        $datetimeStart: DateTime
        $datetimeEnd: DateTime
        $name: String!
        $description: String
        $audience: String
    ) {
        createEvent(
            eventData: {
                poster: $poster
                datetimeStart: $datetimeStart
                datetimeEnd: $datetimeEnd
                name: $name
                description: $description
                audience: $audience
            }
        ) {
            event {
                id
                club {
                    id
                    name
                }
                poster
                datetimeStart
                datetimeEnd
                name
                description
                audience
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
        $audience: String
    ) {
        updateEvent(
            eventData: {
                id: $id
                poster: $poster
                datetimeStart: $datetimeStart
                datetimeEnd: $datetimeEnd
                name: $name
                description: $description
                audience: $audience
            }
        ) {
            event {
                id
                poster
                datetimeStart
                datetimeEnd
                name
                description
                audience
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
                audience
                state
            }
        }
    }
`;

export const PROGRESS_EVENT = gql`
    mutation progressEventMutation($id: ID!) {
        progressEvent(eventData: { id: $id }) {
            event {
                id
                poster
                datetimeStart
                datetimeEnd
                name
                description
                audience
                state
            }
        }
    }
`;

export const ADD_EVENT_FEEDBACK = gql`
    mutation addEventFeedback($eventId: ID!, $message: String!) {
        addEventFeedback(feedbackData: { eventId: $eventId, message: $message }) {
            feedback {
                message
                timestamp
            }
        }
    }
`;

export const CHANGE_POSTER = gql`
    mutation ChangePoster(
        $eventId: ID!
        $poster: Upload
    ) {
        changePoster(
            eventData: {
                id: $eventId
                poster: $poster
            }
        ) {
            event {
                eventId: id
                poster
            }
        }
    }
`;
