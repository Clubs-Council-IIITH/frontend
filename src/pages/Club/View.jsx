import { useState, useEffect, useContext } from "react";
import { useParams, Redirect, Route, useNavigate } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GET_CLUB_BY_ID } from "queries/clubs";
import ClubModel from "models/ClubModel";

import UserGroups from "constants/UserGroups";

import { makeStyles, useTheme } from "@mui/styles";
import { Box, Typography, Divider, Button } from "@mui/material";
import { LanguageOutlined as WebsiteIcon } from "@mui/icons-material";

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
    const theme = useTheme();

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

    let web = club?.website;

    function websiteHandle() {
        window.open(web, "_blank", "noopener,noreferrer");
    }

    return (
        <Page full loading={loading}>
            <img src={club?.img} alt={club?.name} className={classes.cover} />

            <Box px={3} pt={4} pb={2} display="flex" justifyContent="space-between">
                <Box>
                    <Typography variant="h3">{club?.name}</Typography>
                    <Typography variant="h6" color={theme.palette.secondary.dark} mt={1}>
                        {club?.tagline}
                    </Typography>
                </Box>
                {web ? (
                    <Box>
                        {actions || null}
                        <Button
                            variant="outlined"
                            component="label"
                            size="large"
                            sx={{ mr: 1 }}
                            onClick={(e) => websiteHandle(e)}
                        >
                            <WebsiteIcon fontSize="small" sx={{ mr: 1 }} />
                            Visit Website
                        </Button>
                    </Box>
                ) : null}
            </Box>
            <TabBar tabs={tabs} controller={tabController} tabProps={tabProps} routed />
            <Divider />
            <TabPanels tabs={tabs} controller={tabController} tabProps={tabProps} routed />
        </Page>
    );
};

export default View;
