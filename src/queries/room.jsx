import { gql } from "@apollo/client";

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
