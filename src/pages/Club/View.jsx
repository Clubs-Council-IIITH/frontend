import { useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GET_CLUB_BY_ID } from "queries/clubs";

import UserGroups from "constants/UserGroups";

import { makeStyles, useTheme } from "@mui/styles";
import { Fab, Button, Box, Typography, Divider, Zoom, IconButton } from "@mui/material";
import { LanguageOutlined as WebsiteIcon } from "@mui/icons-material";
import { SocialIcon } from "react-social-icons";

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
    // {
    //     title: "Members",
    //     panel: <Members />,
    //     route: "/members",
    // },
];

const ActionButton = ({
    title,
    onClick,
    icon: Icon,
    color = "primary",
    component = "button",
    disabled = false,
    link = null,
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
            title={link}
            href={link}
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

    function linkHandle(link) {
        window.open(link, "_blank", "noopener,noreferrer");
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
                        {/* {clubData?.club?.website ? (
                            <ActionButton
                                title="Visit Website"
                                color="success"
                                icon={WebsiteIcon}
                                link={clubData?.club?.website}
                                onClick={() => linkHandle(clubData?.club?.website)}
                            />
                        ) : null} */}
                        {actions?.map((action) => (
                            <ActionButton {...action} />
                        ))}
                    </Box>
                </Box>
            </Box>
            <Box px={2} pb={2} display="flex" justifyContent="space-between">
                <Box>
                    {clubData?.club?.website ? (
                        <IconButton
                            title="Website"
                            component="a"
                            sx={{ mx: 1, backgroundColor: "#097969 !important", color: "#FFFFFF"}}
                            onClick={() => linkHandle(clubData?.club?.website)}
                        >
                            <WebsiteIcon sx={{ height: 20, width: 20 }} />
                        </IconButton>
                    ) : null}

                    {clubData?.club?.instagram ? (
                        <IconButton
                            component="a"
                            sx={{ mx: 0, color: "#C13584" }}
                            onClick={() => linkHandle(clubData?.club?.instagram)}
                        >
                            <SocialIcon
                                network="instagram"
                                title="Instagram"
                                style={{ height: 35, width: 35 }}
                            />
                        </IconButton>
                    ) : null}

                    {clubData?.club?.facebook ? (
                        <IconButton
                            component="a"
                            sx={{ mx: 0, color: "#4267B2" }}
                            onClick={() => linkHandle(clubData?.club?.facebook)}
                        >
                            <SocialIcon
                                network="facebook"
                                title="Facebook"
                                style={{ height: 35, width: 35 }}
                            />
                        </IconButton>
                    ) : null}

                    {clubData?.club?.youtube ? (
                        <IconButton
                            component="a"
                            sx={{ mx: 0, color: "#FF0000" }}
                            onClick={() => linkHandle(clubData?.club?.youtube)}
                        >
                            <SocialIcon
                                network="youtube"
                                title="YouTube"
                                style={{ height: 35, width: 35 }}
                            />
                        </IconButton>
                    ) : null}

                    {clubData?.club?.twitter ? (
                        <IconButton
                            component="a"
                            sx={{ mx: 0, color: "#1DA1F2" }}
                            onClick={() => linkHandle(clubData?.club?.twitter)}
                        >
                            <SocialIcon
                                network="twitter"
                                title="Twitter"
                                style={{ height: 35, width: 35 }}
                            />
                        </IconButton>
                    ) : null}

                    {clubData?.club?.linkedin ? (
                        <IconButton
                            component="a"
                            sx={{ mx: 0, color: "#0077b5" }}
                            onClick={() => linkHandle(clubData?.club?.linkedin)}
                        >
                            <SocialIcon
                                network="linkedin"
                                title="LinkedIn"
                                style={{ height: 35, width: 35 }}
                            />
                        </IconButton>
                    ) : null}

                    {clubData?.club?.discord ? (
                        <IconButton
                            component="a"
                            sx={{ mx: 0, color: "#5865F2" }}
                            onClick={() => linkHandle(clubData?.club?.discord)}
                        >
                            <SocialIcon
                                network="discord"
                                title="Discord"
                                style={{ height: 35, width: 35 }}
                            />
                        </IconButton>
                    ) : null}
                </Box>
            </Box>

            <TabBar tabs={tabs} controller={tabController} tabProps={tabProps} routed />
            <Divider />
            <TabPanels tabs={tabs} controller={tabController} tabProps={tabProps} routed />
        </Page>
    );
};

export default View;
