import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GET_CLUB_BY_ID } from "queries/clubs";

import UserGroups from "constants/UserGroups";

import { makeStyles, useTheme } from "@mui/styles";
import { Button, Box, Typography, Divider } from "@mui/material";

import Page from "components/Page";
import { TabBar, TabPanels } from "components/Tabs";

import { SessionContext } from "contexts/SessionContext";
import { NavigationContext } from "contexts/NavigationContext";

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

const ActionButton = ({ title, onClick, icon: Icon, color = "primary", component = "button" }) => {
    return (
        <Button
            disableElevation
            variant="contained"
            size="large"
            color={color}
            onClick={onClick}
            component={component}
            sx={{ ml: 1 }}
        >
            <Icon fontSize="small" sx={{ mr: 1 }} />
            {title}
        </Button>
    );
};

const View = ({ manage }) => {
    const classes = useStyles();
    const theme = useTheme();

    const { isTabletOrMobile } = useContext(NavigationContext);

    const { clubId } = useParams();
    const { session } = useContext(SessionContext);

    const targetId = manage && session?.group === UserGroups.club ? session.props.club.id : clubId;

    // fetch club
    const { data: clubData, loading: clubLoading } = useQuery(GET_CLUB_BY_ID, {
        variables: { id: targetId },
    });

    const [actions, setActions] = useState([]);

    useEffect(() => console.log(actions), [actions]);

    const tabController = useState(0);

    const tabProps = {
        manage,
        setActions,
    };

    return (
        <Page full loading={clubLoading}>
            <img src={clubData?.club?.img} alt={clubData?.club?.name} className={classes.cover} />

            <Box p={3} pb={2} display="flex" justifyContent="space-between">
                <Box>
                    <Typography variant={isTabletOrMobile ? "h4" : "h3"}>
                        {clubData?.club?.name}
                    </Typography>
                    <Typography
                        variant={isTabletOrMobile ? "body1" : "h6"}
                        color={theme.palette.secondary.dark}
                        mt={1}
                    >
                        {clubData?.club?.tagline}
                    </Typography>
                </Box>
                <Box>
                    {actions?.map((action) => (
                        <ActionButton {...action} />
                    ))}
                </Box>
            </Box>
            <TabBar tabs={tabs} controller={tabController} tabProps={tabProps} routed />
            <Divider />
            <TabPanels tabs={tabs} controller={tabController} tabProps={tabProps} routed />
        </Page>
    );
};

export default View;
