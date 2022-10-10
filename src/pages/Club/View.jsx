import { useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GET_CLUB_BY_ID } from "queries/clubs";

import UserGroups from "constants/UserGroups";

import { makeStyles, useTheme } from "@mui/styles";
import { Fab, Button, Box, Typography, Divider, Zoom, createSvgIcon, Tooltip, IconButton } from "@mui/material";
import { LanguageOutlined as WebsiteIcon, Instagram, Twitter, YouTube } from "@mui/icons-material";

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

const Discord = createSvgIcon(
    <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />,
    'Discord',
);
const Linkedin = createSvgIcon(
    <path d="M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 0 1-1.548-1.549 1.548 1.548 0 1 1 1.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.003z" />,
    'Linkedin',
);
const Facebook = createSvgIcon(
    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />,
    "Facebook",
);

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
    const instagram = clubData?.club?.instagram;
    const facebook = clubData?.club?.facebook;
    const youtube = clubData?.club?.youtube;
    const twitter = clubData?.club?.twitter;
    const linkedin = clubData?.club?.linkedin;
    const discord = clubData?.club?.discord;
    const is_social = instagram || facebook || youtube || twitter || linkedin || discord;

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
                        {web ? (
                            <ActionButton
                                title="Visit Website"
                                color="success"
                                icon={WebsiteIcon}
                                link={web}
                                onClick={(e) => linkHandle(web)}
                            />
                        ) : null}
                        {actions?.map((action) => (
                            <ActionButton {...action} />
                        ))}
                    </Box>
                </Box>
            </Box>
            {
                is_social ?
                    (<Box pl={2} pb={2} display="flex" justifyContent="space-between">
                        <Box>
                            {instagram ? (
                                <Tooltip title="Instagram" TransitionComponent={Zoom} followCursor={false} arrow>
                                    <IconButton
                                        component="a"
                                        sx={{ mx: 0, color: "#C13584" }}
                                        onClick={() => linkHandle(instagram)}
                                        size="large"
                                    >
                                        <Instagram />
                                    </IconButton>
                                </Tooltip>
                            ) : null}
                            {facebook ? (
                                <Tooltip title="Facebook" TransitionComponent={Zoom} followCursor={false} arrow>
                                    <IconButton
                                        component="a"
                                        sx={{ mx: 0, color: "#4267B2" }}
                                        onClick={() => linkHandle(facebook)}
                                        size="large"
                                    >
                                        <Facebook />
                                    </IconButton>
                                </Tooltip>
                            ) : null}
                            {youtube ? (
                                <Tooltip title="YouTube" TransitionComponent={Zoom} followCursor={false} arrow>
                                    <IconButton
                                        component="a"
                                        sx={{ mx: 0, color: "#FF0000" }}
                                        onClick={() => linkHandle(youtube)}
                                        size="large"
                                    >
                                        <YouTube />
                                    </IconButton>
                                </Tooltip>
                            ) : null}
                            {twitter ? (
                                <Tooltip title="Twitter" TransitionComponent={Zoom} followCursor={false} arrow>
                                    <IconButton
                                        component="a"
                                        sx={{ mx: 0, color: "#1DA1F2" }}
                                        onClick={() => linkHandle(twitter)}
                                        size="large"
                                    >
                                        <Twitter />
                                    </IconButton>
                                </Tooltip>
                            ) : null}
                            {linkedin ? (
                                <Tooltip title="Linkedin" TransitionComponent={Zoom} followCursor={false} arrow>
                                    <IconButton
                                        component="a"
                                        sx={{ mx: 0, color: "#0077b5" }}
                                        onClick={() => linkHandle(linkedin)}
                                        size="large"
                                    >
                                        <Linkedin />
                                    </IconButton>
                                </Tooltip>
                            ) : null}
                            {discord ? (
                                <Tooltip title="Discord" TransitionComponent={Zoom} followCursor={false} arrow>
                                    <IconButton
                                        component="a"
                                        sx={{ mx: 0, color: "#5865F2" }}
                                        onClick={() => linkHandle(discord)}
                                        size="large"
                                    >
                                        <Discord />
                                    </IconButton>
                                </Tooltip>
                            ) : null}
                        </Box>
                    </Box>)
                    : null
            }

            <TabBar tabs={tabs} controller={tabController} tabProps={tabProps} routed />
            <Divider />
            <TabPanels tabs={tabs} controller={tabController} tabProps={tabProps} routed />
        </Page>
    );
};

export default View;