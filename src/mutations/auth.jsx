import { gql } from "@apollo/client";

export const VERIFY_JWT = gql`
    mutation VerifyToken() {
        verifyToken() {
            payload
        }
    }
`;
