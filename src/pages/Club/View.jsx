import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GET_CLUB_BY_ID } from "queries/clubs";
import ClubModel from "models/ClubModel";

import UserGroups from "constants/UserGroups";

import { makeStyles } from "@mui/styles";
import { Box, Typography, Divider } from "@mui/material";

import Page from "components/Page";
import { TabBar, TabPanels } from "components/Tabs";

import { SessionContext } from "contexts/SessionContext";

import About from "./About";
import Events from "./Events";
import Members from "./Members";

// styles {{{
const useStyles = makeStyles({
    cover: {
        height: "30vh",
        width: "100%",
        objectFit: "cover",
        filter: "blur(0.4em)",
        transform: "scale(1.05)",
    },
});
// }}}

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
    {
        title: "Members",
        panel: <Members />,
        route: "/members",
    },
];

const View = ({ manage }) => {
    const classes = useStyles();

    const { clubId } = useParams();
    const { session } = useContext(SessionContext);

    const targetId = manage && session?.group === UserGroups.club ? session.props.club.id : clubId;

    // fetch club
    const { data, loading } = useQuery(GET_CLUB_BY_ID, { variables: { id: targetId } });
    const [club, setClub] = useState([]);
    useEffect(() => setClub(new ClubModel(data?.club)), [data]);

    const [actions, setActions] = useState(null);

    const tabController = useState(0);

    const tabProps = {
        manage,
        setActions,
    };

    return (
        <Page full loading={loading}>
            <img src={club?.img} alt={club?.name} className={classes.cover} />
            <Box px={3} pt={4} pb={3} display="flex" justifyContent="space-between">
                <Typography variant="h2">{club?.name}</Typography>
                <Box>{actions || null}</Box>
            </Box>
            <TabBar tabs={tabs} controller={tabController} tabProps={tabProps} routed />
            <Divider />
            <TabPanels tabs={tabs} controller={tabController} tabProps={tabProps} routed />
        </Page>
    );
};

export default View;
