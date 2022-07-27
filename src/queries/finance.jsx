import { gql } from "@apollo/client";

// admin queries
export const ADMIN_GET_EVENT_BUDGET = gql`
    query adminEventBudget($eventId: Int) {
        adminEventBudget(eventId: $eventId) {
            id
            amount
            description
            reimbursable
        }
    }
`;
