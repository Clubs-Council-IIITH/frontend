import { gql } from "@apollo/client";

// public queries
export const ROOM_BY_EVENT_ID = gql`
    query roomByEventId ( $eventId: Int! ) {
        roomByEventId ( eventId: $eventId ) {
            room
        }
    }
`;

// admin queries
export const ADMIN_AVAILABLE_ROOMS = gql`
    query adminAvailableRooms ( $eventId: Int! ) {
        adminAvailableRooms ( eventId: $eventId ) {
            room
            available            
        }
    }
`;

export const ADMIN_ROOM_BY_EVENT_ID = gql`
    query adminRoomByEventId ( $eventId: Int! ) {
        adminRoomByEventId ( eventId: $eventId ) {
            room
            population
            equipment
            additional
        }
    }
`;
