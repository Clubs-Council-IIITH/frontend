import { useState } from "react";

import Page from "components/Page";
import { TabBar, TabPanels } from "components/Tabs";

import { Divider, Typography } from "@mui/material";

import ProgressList from "./ProgressList";

const tabs = [
    {
        title: "Website v1 (Current)",
        panel: <ProgressList id="v1"/>,
        route: "/v1",
    },
    {
        title: "Website v2 (Upcoming)",
        panel: <ProgressList id="v2"/>,
        route: "/v2",
    },
];

const ProgressPage = () => {
    const tabController = useState(0);

    const tabProps = {};

    return (
        <Page full>
            <Typography variant="h3" pt={12} pb={3} px={4}>
                Progress Updates Page - Tech Team
            </Typography>
            <TabBar tabs={tabs} controller={tabController} tabProps={tabProps} routed />
            <Divider />
            <TabPanels tabs={tabs} controller={tabController} tabProps={tabProps} routed />
        </Page>
    );
};

export default ProgressPage;
