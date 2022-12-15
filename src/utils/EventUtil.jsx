import { blueGrey, green, blue, red, amber, deepPurple, indigo } from "@mui/material/colors";

import EventAudience from "constants/EventAudience";
import EventStates from "constants/EventStates";

// convert audience string from API response to a properly formatted string
export const AudienceFormatter = (audienceString) => {
    var audienceList = audienceString?.split(",") || [];
    return audienceList.map((o) => EventAudience[o]).join(", ");
};

// convert event state into a progressbar percentage
export const StateProgress = (state, budgetApproved, roomApproved) => {
    if (state === EventStates["incomplete"]) {
        return {
            value: 1 * (100 / 5),
            color: blueGrey,
            text: "Not submitted",
        };
    } else if (state === EventStates["cc_pending"]) {
        return {
            value: 1 * (100 / 5),
            color: blue,
            text: "Waiting for Clubs Council approval",
        };
    } else if (state === EventStates["room|budget_pending"] && !budgetApproved && !roomApproved) {
        return {
            value: 1 * (100 / 5),
            color: deepPurple,
            text: "Waiting for SLC & SLO approval",
        };
    } else if (state === EventStates["room|budget_pending"] && !budgetApproved) {
        return {
            value: 1 * (100 / 5),
            color: deepPurple,
            text: "Waiting for SLC approval",
        };
    } else if (state === EventStates["room|budget_pending"] && !roomApproved) {
        return {
            value: 1 * (100 / 5),
            color: deepPurple,
            text: "Waiting for SLO approval",
        };
    } else if (state === EventStates["approved"]) {
        return {
            value: 1 * (100 / 5),
            color: green,
            text: "Approved",
        };
    } else if (state === EventStates["completed"]) {
        return {
            value: 1 * (100 / 5),
            color: amber,
            text: "Completed",
        };
    } else if (state === EventStates["deleted"]) {
        return {
            value: 1 * (100 / 5),
            color: red,
            text: "Deleted",
        };
    }
};
