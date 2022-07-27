import { gql } from "@apollo/client";

export const CREATE_BUDGET_REQUIREMENT = gql`
    mutation createBudgetRequirement(
        $eventId: ID!
        $amount: Decimal!
        $description: String!
        $reimbursable: Boolean
    ) {
        createBudgetRequirement(
            budgetRequirementData: {
                eventId: $eventId
                amount: $amount
                description: $description
                reimbursable: $reimbursable
            }
        ) {
            budgetRequirement {
                id
            }
        }
    }
`;

export const DELETE_BUDGET_REQUIREMENT = gql`
    mutation deleteBudgetRequirement($eventId: ID!, $id: ID!) {
        deleteBudgetRequirement(budgetRequirementData: { eventId: $eventId, id: $id }) {
            budgetRequirement {
                id
            }
        }
    }
`;
