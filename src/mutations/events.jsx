import { gql } from "@apollo/client";

export const CREATE_EVENT = gql`
    mutation createEventMutation(
        $poster: Upload
        $datetimeStart: DateTime
        $datetimeEnd: DateTime
        $name: String!
        $description: String
        $venue: String
        $audience: String
        $lastEditedBy: String!
        $financialRequirements: String!
    ) {
        createEvent(
            eventData: {
                poster: $poster
                datetimeStart: $datetimeStart
                datetimeEnd: $datetimeEnd
                name: $name
                description: $description
                venue: $venue
                audience: $audience
                lastEditedBy: $lastEditedBy
                financialRequirements: $financialRequirements
            }
        ) {
            event {
                poster
                datetimeStart
                datetimeEnd
                name
                description
                venue
                audience
                lastEditedBy
                financialRequirements
            }
        }
    }
`;
