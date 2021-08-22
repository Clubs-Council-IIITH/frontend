import { gql } from "@apollo/client";

export const CREATE_CLUB = gql`
    mutation createClubMutation(
        $img: Upload
        $name: String!
        $mail: String!
        $website: String
        $category: String
        $state: String
        $tagline: String
        $description: String
    ) {
        createClub(
            clubData: {
                img: $img
                name: $name
                mail: $mail
                website: $website
                category: $category
                state: $state
                tagline: $tagline
                description: $description
            }
        ) {
            club {
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
    }
`;

export const UPDATE_CLUB = gql`
    mutation updateClubMutation(
        $id: ID!
        $img: Upload
        $name: String!
        $mail: String!
        $website: String
        $category: String
        $tagline: String
        $description: String
    ) {
        updateClub(
            clubData: {
                id: $id
                img: $img
                name: $name
                mail: $mail
                website: $website
                category: $category
                tagline: $tagline
                description: $description
            }
        ) {
            club {
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
    }
`;

export const DELETE_CLUB = gql`
    mutation deleteClubMutation($id: ID!) {
        deleteClub(clubData: { id: $id }) {
            club {
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
    }
`;
