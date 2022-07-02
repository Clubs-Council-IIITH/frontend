import { blueGrey, green, blue, red, amber, deepPurple } from "@mui/material/colors";

import EventAudience from "constants/EventAudience";
import EventStates from "constants/EventStates";

// convert audience string from API response to a properly formatted string
export const AudienceFormatter = (audienceString) => {
    var audienceList = audienceString?.split(",") || [];
    return audienceList.map((o) => EventAudience[o]).join(", ");
};

// convert event state into a progressbar percentage
export const StateProgress = (stateKey) => {
    if (stateKey === EventStates.cc_pending)
        return {
            value: 1 * (100 / 6),
            color: blueGrey,
            text: "Waiting for Clubs Council approval",
        };

    if (stateKey === EventStates.fc_pending)
        return {
            value: 2 * (100 / 6),
            color: blue,
            text: "Waiting for Finance Council approval",
        };

    if (stateKey === EventStates.gad_pending)
        return {
            value: 3 * (100 / 6),
            color: blue,
            text: "Waiting for GAD approval",
        };

    if (stateKey === EventStates.slc_pending)
        return {
            value: 4 * (100 / 6),
            color: deepPurple,
            text: "Waiting for SLC approval",
        };

    if (stateKey === EventStates.slo_pending)
        return {
            value: 5 * (100 / 6),
            color: deepPurple,
            text: "Waiting for SLO approval",
        };

    if (stateKey === EventStates.approved)
        return {
            value: 100,
            color: green,
            text: "Approved!",
        };

    if (stateKey === EventStates.completed)
        return {
            value: 100,
            color: amber,
            text: "Completed",
        };

    if (stateKey === EventStates.deleted)
        return {
            value: 100,
            color: red,
            text: "Deleted",
        };
};
