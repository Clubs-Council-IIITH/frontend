import { gql } from "@apollo/client";

export const ADMIN_ADD_POC = gql`
    mutation addPocDetails(
        $eventId: ID!
        $pocName: String!
        $pocRollno: String!
        $pocMobile: String!
        $pocEmail: String!
    ) {
        addPocDetails(
            pocData: {
                eventId: $eventId
                pocName: $pocName
                pocRollno: $pocRollno
                pocMobile: $pocMobile
                pocEmail: $pocEmail
            }
        ) {
            event {
                id
            }
        }
    }
`;
