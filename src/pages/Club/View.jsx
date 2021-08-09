import { useState, useContext } from "react";
import { useParams } from "react-router-dom";

// import useSWR from "swr";
import { GetClubById } from "services/ClubService";

import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Divider } from "@material-ui/core";

import Page from "components/Page";
import { TabBar, TabPanels } from "components/Tabs";

import { SessionContext } from "contexts/SessionContext";

import About from "./About";
import Events from "./Events";
// import Members from "./Members";

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
    // {
    //     title: "Members",
    //     panel: <Members />,
    //     route: "/members",
    // },
];

const View = ({ manage }) => {
    const classes = useStyles();

    const { clubId } = useParams();
    const { session } = useContext(SessionContext);

    const targetId = manage && session?.user?.club ? session.user.club : clubId;
    // const { data: club, isValidating } = useSWR(`clubs/${targetId}`, () =>
    //     ClubService.getClubById(targetId)
    // );
    const { data: club, loading } = GetClubById(targetId);

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
