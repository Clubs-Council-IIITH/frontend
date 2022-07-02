import { gql } from "@apollo/client";

// public queries
export const GET_ALL_EVENTS = gql`
    query getAllEvents {
        allEvents {
            id
            club {
                id
                name
                img
            }
            datetimeStart
            datetimeEnd
            poster
            name
            audience
            description
            mode
        }
    }
`;

export const GET_EVENT_BY_ID = gql`
    query getEventById($id: Int) {
        event(eventId: $id) {
            id
            club {
                id
                name
            }
            poster
            name
            datetimeStart
            datetimeEnd
            description
            audience
            description
            mode
        }
    }
`;

export const GET_CLUB_EVENTS = gql`
    query getClubEvents($id: Int) {
        clubEvents(clubId: $id) {
            id
            club {
                id
                name
                img
            }
            datetimeStart
            datetimeEnd
            poster
            name
            audience
            description
            mode
        }
    }
`;

// admin queries
export const ADMIN_GET_ALL_EVENTS = gql`
    query adminAllEvents {
        adminAllEvents {
            id
            club {
                id
                name
            }
            poster
            name
            datetimeStart
            description
            audience
            mode
            stateKey
            stateRemarks
        }
    }
`;

export const ADMIN_GET_CLUB_EVENTS = gql`
    query adminGetClubEvents($id: Int) {
        adminClubEvents(clubId: $id) {
            id
            club {
                id
                name
                img
            }
            datetimeStart
            datetimeEnd
            poster
            name
            audience
            description
            mode
            stateKey
            stateRemarks
        }
    }
`;
