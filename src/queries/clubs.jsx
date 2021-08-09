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

export const CREATE_CLUB = gql`
    mutation createClubMutation(
        $name: String!
        $mail: String!
        $website: String
        $category: String
        $state: String
    ) {
        createClub(
            clubData: {
                name: $name
                mail: $mail
                website: $website
                category: $category
                state: $state
            }
        ) {
            club {
                id
                name
                mail
                website
                category
                state
            }
        }
    }
`;

export const UPDATE_CLUB = gql`
    mutation updateClubMutation(
        $id: ID!
        $name: String!
        $mail: String!
        $website: String
        $category: String
    ) {
        updateClub(
            clubData: { id: $id, name: $name, mail: $mail, website: $website, category: $category }
        ) {
            club {
                id
                name
                mail
                website
                category
            }
        }
    }
`;

export const DELETE_CLUB = gql`
    mutation updateClubMutation($id: ID!) {
        updateClub(clubData: { id: $id }) {
            club {
                id
                name
                mail
                website
                category
                state
            }
        }
    }
`;
