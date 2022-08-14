import { gql } from "@apollo/client";

// public queries
export const GET_USER = gql`
    query getUser($mail: String!) {
        user(mail: $mail) {
            id
            img
            firstName
            lastName
            mail
            batch
        }
    }
`;

export const GET_CLUB_MEMBERS = gql`
    query getClubMembers($id: Int!) {
        clubMembers(clubId: $id) {
            id
            user {
                id
                img
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
export const ADMIN_GET_ALL_USERS = gql`
    query adminGetAllUsers {
        adminAllUsers {
            id
            img
            firstName
            lastName
            mail
            batch
        }
    }
`;

export const ADMIN_GET_PENDING_MEMBERS = gql`
    query adminGetPendingMembers {
        adminPendingMembers {
            id
            user {
                id
                img
                firstName
                lastName
                mail
                batch
            }
            club {
                id
                name
            }
            role
            year
            approved
        }
    }
`;

export const ADMIN_GET_CLUB_MEMBERS = gql`
    query adminGetClubMembers {
        adminClubMembers {
            id
            user {
                id
                img
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
