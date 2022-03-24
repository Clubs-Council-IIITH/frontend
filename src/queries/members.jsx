import { gql } from "@apollo/client";

// public queries
export const GET_CLUB_MEMBERS = gql`
    query getClubMembers($id: Int) {
        clubMembers(clubId: $id) {
            id
            user {
                id
                firstName
                lastName
                mail
                batch
            }
            role
            year
        }
    }
`;

// admin queries
export const ADMIN_GET_CLUB_MEMBERS = gql`
    query adminGetClubMembers {
        adminClubMembers {
            id
            user {
                id
                firstName
                lastName
                mail
                batch
            }
            role
            year
            approved
        }
    }
`;
