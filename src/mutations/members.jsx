import { gql } from "@apollo/client";

export const CREATE_USER = gql`
    mutation createUserMutation(
        $img: Upload
        $firstName: String!
        $lastName: String!
        $mail: String!
        $rollno: Int!
        $batch: String!
    ) {
        createUser(
            userData: {
                img: $img
                firstName: $firstName
                lastName: $lastName
                mail: $mail
                rollno: $rollno
                batch: $batch
            }
        ) {
            user {
                id
                img
                firstName
                lastName
                mail
                rollno
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
    mutation updateMemberMutation($id: ID!, $role: String!, $year: Int!) {
        updateMember(memberData: { id: $id, role: $role, year: $year }) {
            member {
                id
                role
                year
            }
        }
    }
`;

export const REMOVE_MEMBER = gql`
    mutation removeMemberMutation($id: ID!) {
        removeMember(memberData: { id: $id }) {
            member {
                id
            }
        }
    }
`;

export const ADMIN_APPROVE_MEMBER = gql`
    mutation adminApproveMemberMutation($id: ID!) {
        adminApproveMember(memberData: { id: $id }) {
            member {
                id
            }
        }
    }
`;
