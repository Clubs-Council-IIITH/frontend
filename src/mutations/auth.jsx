import { gql } from "@apollo/client";

export const DELETE_COOKIE = gql`
    mutation {
        deleteToken {
            deleted
        }
    }
`;
