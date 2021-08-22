import { gql } from "@apollo/client";

// public queries
export const GET_ALL_CLUBS = gql`
    query getAllClubs {
        clubs {
            id
            img
            name
            mail
            website
            category
            tagline
            description
        }
    }
`;

export const GET_CLUB_BY_ID = gql`
    query getClubById($id: Int) {
        club(clubId: $id) {
            img
            name
            mail
            website
            category
            tagline
            description
        }
    }
`;

// admin queries
export const ADMIN_GET_ALL_CLUBS = gql`
    query adminGetAllClubs {
        adminClubs {
            id
            img
            name
            mail
            website
            category
            state
            tagline
            description
        }
    }
`;
