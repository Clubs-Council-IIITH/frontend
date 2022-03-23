import EventAudience from "constants/EventAudience";

// convert audience string from API response to a properly formatted string
export const AudienceFormatter = (audienceString) => {
    var audienceList = audienceString?.split(",") || [];
    return audienceList.map((o) => EventAudience[o]).join(", ");
};
