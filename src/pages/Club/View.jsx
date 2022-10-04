import { useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GET_CLUB_BY_ID } from "queries/clubs";

import UserGroups from "constants/UserGroups";

import { makeStyles, useTheme } from "@mui/styles";
import { Fab, Button, Box, Typography, Divider, Zoom } from "@mui/material";
import { LanguageOutlined as WebsiteIcon } from "@mui/icons-material";

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

const ActionButton = ({
    title,
    onClick,
    icon: Icon,
    color = "primary",
    component = "button",
    disabled = false,
}) => {
    const { isTabletOrMobile } = useContext(NavigationContext);

    return isTabletOrMobile ? (
        <Zoom key={title} in={true}>
            <Fab
                variant="extended"
                color={color}
                onClick={onClick}
                component={component}
                disabled={disabled}
                sx={{ ml: 1, mt: 1 }}
            >
                <Icon fontSize="small" sx={{ mr: 1 }} />
                {title}
            </Fab>
        </Zoom>
    ) : (
        <Button
            disableElevation
            variant="contained"
            size="large"
            color={color}
            onClick={onClick}
            component={component}
            disabled={disabled}
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

    const tabController = useState(0);

    const tabProps = {
        manage,
        setActions,
    };

    const web = clubData?.club?.website;

    function websiteHandle() {
        window.open(web, "_blank", "noopener,noreferrer");
    }

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
                <Box
                    position={isTabletOrMobile ? "fixed" : "static"}
                    display={isTabletOrMobile ? "flex" : "block"}
                    flexDirection="column"
                    bottom={70}
                    right={10}
                    sx={{
                        "& > :not(style)": { m: 1 },
                        zIndex: 999,
                    }}
                >
                    <Box>
                        {web ? (
                            <ActionButton
                                title="Visit Website"
                                color="success"
                                icon={WebsiteIcon}
                                onClick={(e) => websiteHandle(e)}
                            />
                        ) : null}
                        {actions?.map((action) => (
                            <ActionButton {...action} />
                        ))}
                    </Box>
                </Box>
            </Box>
            <TabBar tabs={tabs} controller={tabController} tabProps={tabProps} routed />
            <Divider />
            <TabPanels tabs={tabs} controller={tabController} tabProps={tabProps} routed />
        </Page>
    );
};

export default View;
