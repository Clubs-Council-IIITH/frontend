import { gql } from "@apollo/client";

export const CREATE_EVENT = gql`
    mutation createEventMutation(
        $datetimeStart: DateTime
        $datetimeEnd: DateTime
        $name: String!
        $description: String
        $audience: String
    ) {
        newEventDescription(
            eventData: {
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
        $datetimeStart: DateTime
        $datetimeEnd: DateTime
        $name: String!
        $description: String
        $audience: String
    ) {
        updateEvent(
            eventData: {
                id: $id
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

export const UPDATE_AUDIENCE = gql`
    mutation updateAudienceMutation(
        $id: ID!
        $audience: String
    ) {
        updateAudience(
            eventData: {
                id: $id
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

export const SLC_REMINDER = gql`
    mutation slcReminder($id: ID!) {
        slcReminder(eventData: { id: $id }) {
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

export const SLO_REMINDER = gql`
    mutation sloReminder($id: ID!) {
        sloReminder(eventData: { id: $id }) {
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

export const SEND_DISCUSSION_MESSAGE = gql`
    mutation sendDiscussionMessage($eventId: ID!, $message: String!) {
        sendDiscussionMessage(discussionData: { eventId: $eventId, message: $message }) {
            discussion {
                message
                timestamp
            }
        }
    }
`;

export const CHANGE_POSTER = gql`
    mutation ChangePoster($eventId: ID!, $img: Upload, $deletePrev: Boolean) {
        changePoster(posterData: { eventId: $eventId, img: $img, deletePrev: $deletePrev }) {
            event {
                eventId: id
                poster
            }
        }
    }
`;

export const BYPASS_BUDGET = gql`
    mutation bypassBudget($id: ID!) {
        bypassBudgetApproval(eventData: { id: $id }) {
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
