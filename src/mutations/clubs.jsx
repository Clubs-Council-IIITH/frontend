import { gql } from "@apollo/client";

export const ADMIN_CREATE_CLUB = gql`
    mutation AdminCreateClubMutation(
        $img: Upload
        $name: String!
        $mail: String!
        $website: String
        $category: String
        $state: String
        $tagline: String
        $description: String
        $instagram: String
        $facebook: String
        $youtube: String
        $twitter: String
        $linkedin: String
        $discord: String
    ) {
        adminCreateClub(
            clubData: {
                img: $img
                name: $name
                mail: $mail
                website: $website
                category: $category
                state: $state
                tagline: $tagline
                description: $description
                instagram: $instagram
                facebook: $facebook
                youtube: $youtube
                twitter: $twitter
                linkedin: $linkedin
                discord: $discord
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
                instagram
                facebook
                youtube
                twitter
                linkedin
                discord
            }
        }
    }
`;

export const ADMIN_UPDATE_CLUB = gql`
    mutation adminUpdateClubMutation(
        $id: ID!
        $img: Upload
        $name: String!
        $mail: String!
        $website: String
        $category: String
        $tagline: String
        $description: String
        $instagram: String
        $facebook: String
        $youtube: String
        $twitter: String
        $linkedin: String
        $discord: String
    ) {
        adminUpdateClub(
            clubData: {
                id: $id
                img: $img
                name: $name
                mail: $mail
                website: $website
                category: $category
                tagline: $tagline
                description: $description
                instagram: $instagram
                facebook: $facebook
                youtube: $youtube
                twitter: $twitter
                linkedin: $linkedin
                discord: $discord
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
                instagram
                facebook
                youtube
                twitter
                linkedin
                discord
            }
        }
    }
`;

export const UPDATE_CLUB = gql`
    mutation updateClubMutation(
        $id: ID!
        $img: Upload
        $name: String
        $website: String
        $tagline: String
        $description: String
        $instagram: String
        $facebook: String
        $youtube: String
        $twitter: String
        $linkedin: String
        $discord: String
    ) {
        updateClub(
            clubData: {
                id: $id
                img: $img
                name: $name
                website: $website
                tagline: $tagline
                description: $description
                instagram: $instagram
                facebook: $facebook
                youtube: $youtube
                twitter: $twitter
                linkedin: $linkedin
                discord: $discord
            }
        ) {
            club {
                id
                img
                name
                website
                tagline
                description
                instagram
                facebook
                youtube
                twitter
                linkedin
                discord
            }
        }
    }
`;

export const ADMIN_DELETE_CLUB = gql`
    mutation adminDeleteClubMutation($id: ID!) {
        adminDeleteClub(clubData: { id: $id }) {
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
                instagram
                facebook
                youtube
                twitter
                linkedin
                discord
            }
        }
    }
`;
