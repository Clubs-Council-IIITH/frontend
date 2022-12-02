import { gql } from "@apollo/client";


export const ADMIN_POC_BY_EVENT_ID = gql`
    query adminPocByEventId ( $eventId: Int! ) {
        adminPocByEventId ( eventId: $eventId ) {
            pocName
            pocEmail
            pocRollno
            pocMobile
        }
    }
`;
