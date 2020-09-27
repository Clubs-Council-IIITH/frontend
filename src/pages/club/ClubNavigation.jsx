import React, { useContext } from "react";

import { SessionContext } from "../../api/SessionContext";

import AdminClubNavigation from "../admin/AdminClubNavigation";
import CoordNavigation from "../coordinator/CoordNavigation";

const ClubNavigation = (props) => {
    const { session } = useContext(SessionContext);
    if (session.usergroup === "cc_admin") {
        return <AdminClubNavigation match={props.match}>{props.children}</AdminClubNavigation>;
    } else {
        return <CoordNavigation match={props.match}>{props.children}</CoordNavigation>;
    }
};

export default ClubNavigation;
