import { gql } from "@apollo/client";

export const GET_COC_SCOREBOARD = gql`
    query getCOCScoreboard {
        scoreboard {
            cluster
            score
        }
    }
`;
