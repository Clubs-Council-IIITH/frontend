import { gql } from "@apollo/client";

export const CREATE_EVENT = gql`
    mutation createEventMutation(
        $poster: Upload
        $start: DateTime
        $end: DateTime
        $name: String!
        $description: String
        $venue: String
        $audience: String
        $last_edited_by: String!
    ) {
        createEvent(
            eventData: {
                poster: $poster
                start: $start
                end: $end
                name: $name
                description: $description
                venue: $venue
                audience: $audience
                lastEditedBy: $last_edited_by
            }
        ) {
            event {
                poster
                start
                end
                name
                description
                venue
                audience
                lastEditedBy
            }
        }
    }
`;
