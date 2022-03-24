import { gql } from "@apollo/client";

export const CREATE_USER = gql`
    mutation createUserMutation(
        $img: Upload
        $firstName: String!
        $lastName: String!
        $mail: String!
        $batch: String!
    ) {
        createUser(
            userData: {
                img: $img
                firstName: $firstName
                lastName: $lastName
                mail: $mail
                batch: $batch
            }
        ) {
            user {
                id
                img
                firstName
                lastName
                mail
                batch
            }
        }
    }
`;

export const ADD_MEMBER = gql`
    mutation addMemberMutation($userId: ID!, $role: String!, $year: Int!) {
        addMember(memberData: { userId: $userId, role: $role, year: $year }) {
            member {
                id
                role
                year
            }
        }
    }
`;

export const UPDATE_MEMBER = gql`
    mutation addMemberMutation($id: ID!, $role: String!, $year: Int!) {
        addMember(memberData: { role: $role, year: $year }) {
            member {
                id
                role
                year
            }
        }
    }
`;
