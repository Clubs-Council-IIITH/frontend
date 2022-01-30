import { gql } from "@apollo/client";

// public queries
export const GET_ALL_EVENTS = gql`
    query getAllEvents {
        allEvents {
            id
            club
            poster
            name
            description
            audience
        }
    }
`;

export const GET_EVENT_BY_ID = gql`
    query getEventById($id: Int) {
        event(eventId: $id) {
            id
            club
            poster
            name
            start
            end
            description
            venue
            audience
        }
    }
`;

export const GET_CLUB_EVENTS = gql`
    query getClubEvents($id: Int) {
        clubEvents(clubId: $id) {
            id
            start
            end
            poster
            name
            audience
        }
    }
`;

// admin queries
export const ADMIN_GET_ALL_EVENTS = gql`
    query adminAllEvents {
        adminAllEvents {
            id
            club
            poster
            name
            description
            audience
            state
        }
    }
`;

export const ADMIN_GET_CLUB_EVENTS = gql`
    query adminGetClubEvents($id: Int) {
        adminClubEvents(clubId: $id) {
            id
            start
            end
            poster
            name
            audience
            state
        }
    }
`;
