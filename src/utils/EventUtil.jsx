import { blueGrey, green, blue, red, amber, deepPurple } from "@mui/material/colors";

import EventAudience from "constants/EventAudience";
import EventStates from "constants/EventStates";

// convert audience string from API response to a properly formatted string
export const AudienceFormatter = (audienceString) => {
    var audienceList = audienceString?.split(",") || [];
    return audienceList.map((o) => EventAudience[o]).join(", ");
};

// convert event state into a progressbar percentage
export const StateProgress = (state) => {
    if (state === EventStates.cc_pending)
        return {
            value: 1 * (100 / 6),
            color: blueGrey,
            text: "Waiting for Clubs Council approval",
        };

    if (state === EventStates.fc_pending)
        return {
            value: 2 * (100 / 6),
            color: blue,
            text: "Waiting for Finance Council approval",
        };

    if (state === EventStates.gad_pending)
        return {
            value: 3 * (100 / 6),
            color: blue,
            text: "Waiting for GAD approval",
        };

    if (state === EventStates.slo_pending)
        return {
            value: 4 * (100 / 6),
            color: deepPurple,
            text: "Waiting for SLO approval",
        };

    if (state === EventStates.slc_pending)
        return {
            value: 5 * (100 / 6),
            color: deepPurple,
            text: "Waiting for SLC approval",
        };

    if (state === EventStates.approved)
        return {
            value: 100,
            color: green,
            text: "Approved!",
        };

    if (state === EventStates.completed)
        return {
            value: 100,
            color: amber,
            text: "Completed",
        };

    if (state === EventStates.deleted)
        return {
            value: 100,
            color: red,
            text: "Deleted",
        };
};
