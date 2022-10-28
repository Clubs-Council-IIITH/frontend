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
            state
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
            state
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
                img
                name
            }
            poster
            name
            datetimeStart
            description
            audience
            state
        }
    }
`;

export const ADMIN_APPROVED_EVENTS = gql`
    query adminApprovedEvents {
        adminApprovedEvents {
            id
            club {
                id
                img
                name
            }
            poster
            name
            datetimeStart
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
            state
        }
    }
`;

export const ADMIN_GET_EVENT_DISCUSSION = gql`
    query adminEventDiscussionThread($eventId: Int) {
        eventDiscussionThread(eventId: $eventId) {
            user {
                username
                firstName
            }
            timestamp
            message
        }
    }
`;

export const ADMIN_GET_EVENT_STATE = gql`
    query getEventById($id: Int) {
        event(eventId: $id) {
            id
            state
        }
    }
`;

export const ADMIN_CC_PENDING_EVENTS = gql`
    query adminCcPendingEvents {
        adminCcPendingEvents {
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
            state
        }
    }
`;

export const ADMIN_FC_PENDING_EVENTS = gql`
    query adminFcPendingEvents {
        adminFcPendingEvents {
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
            state
        }
    }
`;

export const ADMIN_GAD_PENDING_EVENTS = gql`
    query adminGadPendingEvents {
        adminGadPendingEvents {
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
            state
        }
    }
`;

export const ADMIN_SLO_PENDING_EVENTS = gql`
    query adminSloPendingEvents {
        adminSloPendingEvents {
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
            state
        }
    }
`;

export const ADMIN_SLC_PENDING_EVENTS = gql`
    query adminSlcPendingEvents {
        adminSlcPendingEvents {
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
            state
        }
    }
`;
