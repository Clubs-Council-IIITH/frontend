import { gql } from "@apollo/client";

// admin queries
export const ADMIN_GET_ROOMS = gql`
    query adminGetRooms ( $eventId: Int! ) {
        adminGetRooms ( eventId: $eventId ) {
            room
            available            
        }
    }
`;
