import { useState } from "react";

import Page from "components/Page";
import { TabBar, TabPanels } from "components/Tabs";

import { Divider, Typography } from "@mui/material";

import EventSchedule from "./EventsSchedule";
import COC from "./COC";
// import Handbook from "./Handbook";

const tabs = [
    // {
    //     title: "Club Handbook",
    //     panel: <Handbook />,
    //     route: "/handbook",
    // },
    {
        title: "Schedule",
        panel: <EventSchedule />,
        route: "/events",
    },
    {
        title: "Clash of Clusters",
        panel: <COC />,
        route: "/point-table",
    },
];

const InductionPage = () => {
    const [actions, setActions] = useState([]);

    const tabController = useState(0);

    let manage = 0;

    const tabProps = {
        manage,
        setActions,
    };

    return (
        <Page full>
            <Typography variant="h3" pt={12} pb={3} px={4}>
                Induction 2022
            </Typography>
            <TabBar tabs={tabs} controller={tabController} tabProps={tabProps} routed />
            <Divider />
            <TabPanels tabs={tabs} controller={tabController} tabProps={tabProps} routed />
        </Page>
    );
};

export default InductionPage;
