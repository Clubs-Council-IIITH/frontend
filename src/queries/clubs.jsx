import { gql } from "@apollo/client";

export const GET_ALL_CLUBS = gql`
    query getAllClubs {
        clubs {
            id
            name
            mail
            website
            category
            state
        }
    }
`;

export const GET_CLUB_BY_ID = gql`
    query getClubById($id: Int) {
        club(clubId: $id) {
            name
            mail
            website
            category
            state
        }
    }
`;
