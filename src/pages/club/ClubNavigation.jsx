import React, { useContext } from "react";

import { SessionContext } from "../../api/SessionContext";

import AdminClubNavigation from "../admin/AdminClubNavigation";
import OrganizerNavigation from "../organizer/OrganizerNavigation";

const ClubNavigation = (props) => {
    const { session } = useContext(SessionContext);
    if (session.usergroup === "cc_admin") {
        return <AdminClubNavigation match={props.match}>{props.children}</AdminClubNavigation>;
    } else {
        return <OrganizerNavigation match={props.match}>{props.children}</OrganizerNavigation>;
    }
};

export default ClubNavigation;
