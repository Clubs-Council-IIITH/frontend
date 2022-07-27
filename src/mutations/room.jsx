import { gql } from "@apollo/client";

export const ADMIN_BOOK_ROOM = gql`
    mutation addRoomDetails(
        $eventId: ID!
        $room: String
        $population: Int
        $equipment: String
        $additional: String
    ) {
        addRoomDetails(
            roomData: {
                eventId: $eventId
                room: $room
                population: $population
                equipment: $equipment
                additional: $additional
            }
        ) {
            event {
                id
            }
        }
    }
`;
