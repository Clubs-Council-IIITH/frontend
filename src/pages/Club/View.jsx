import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Box, Typography, Divider } from "@material-ui/core";

import Page from "components/Page";
import { TabBar, TabPanels } from "components/Tabs";

import ClubService from "services/ClubService";

import About from "./About";
import Events from "./Events";
// import Members from "./Members";

const tabs = [
    {
        title: "About",
        panel: <About />,
        route: "/about",
    },
    {
        title: "Events",
        panel: <Events />,
        route: "/events",
    },
    // {
    //     title: "Members",
    //     panel: <Members />,
    //     route: "/members",
    // },
];

const View = () => {
    const { clubId } = useParams();

    const [club, setClub] = useState({ loading: true });

    // fetch club details from API
    useEffect(() => {
        (async () => setClub(await ClubService.getClubById(clubId)))();
    }, [clubId]);

    const tabController = useState(0);

    return (
        <Page full loading={club?.loading}>
            <img
                src={club?.data?.img}
                alt={club?.data?.name}
                style={{ width: "100%", height: "30vh" }}
            />
            <Box px={3} pt={4} pb={3}>
                <Typography variant="h2">{club?.data?.name}</Typography>
            </Box>
            <TabBar tabs={tabs} controller={tabController} routed />
            <Divider />
            <TabPanels tabs={tabs} controller={tabController} routed />
        </Page>
    );
};

export default View;
