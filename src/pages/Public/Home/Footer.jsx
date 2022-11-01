import { useContext } from "react";
import { useTheme } from "@mui/styles";

import { Grid, Box, Divider, Typography, Link, IconButton } from "@mui/material";

import { NavigationContext } from "contexts/NavigationContext";

import IIITLogo from "assets/img/iiit_logo_white.png";
import TwitterIcon from "assets/img/twitter.png";
import FacebookIcon from "assets/img/facebook.png";
import InstagramIcon from "assets/img/instagram.png";
import DiscordIcon from "assets/img/discord.png";

import LogoFull from "assets/img/logo_full.svg";

const PRIVACY_POLICY_URL = "https://www.iiit.ac.in/privacy-policy/";
const TWITTER_URL = "https://twitter.com/iiit_hyderabad";
const FACEBOOK_URL = "https://www.facebook.com/IIITH";
const INSTAGRAM_URL = "https://www.instagram.com/iiit.hyderabad/";
const DISCORD_URL = "https://discord.gg/V8C7QSRtat";

const Footer = () => {
    const theme = useTheme();
    const { isTabletOrMobile } = useContext(NavigationContext);

    return (
        <Box px={3} backgroundColor={theme.palette.primary.main}>
            <Divider sx={{ borderColor: theme.palette.grey[800] }} />
            <Box px={2}>
                <Grid container py={6} spacing={2} justifyContent="space-between">
                    <Grid
                        item
                        xs={12}
                        lg
                        display="flex"
                        alignItems="center"
                        justifyContent={isTabletOrMobile ? "center" : "flex-start"}
                    >
                        <Box mr={3}>
                            <img src={IIITLogo} height={50} />
                        </Box>
                        <Box>
                            <img src={LogoFull} height={50} />
                        </Box>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        lg
                        display="flex"
                        alignItems="center"
                        justifyContent={isTabletOrMobile ? "center" : "flex-end"}
                    >
                        <IconButton
                            component="a"
                            href={DISCORD_URL}
                            color="secondary"
                            sx={{ mx: 1 }}
                        >
                            <img src={DiscordIcon} height={20} />
                        </IconButton>
                        <IconButton
                            component="a"
                            href={TWITTER_URL}
                            color="secondary"
                            sx={{ mx: 1 }}
                        >
                            <img src={TwitterIcon} height={20} />
                        </IconButton>
                        <IconButton
                            component="a"
                            href={FACEBOOK_URL}
                            color="secondary"
                            sx={{ mx: 1 }}
                        >
                            <img src={FacebookIcon} height={20} />
                        </IconButton>
                        <IconButton
                            component="a"
                            href={INSTAGRAM_URL}
                            color="secondary"
                            sx={{ mx: 1 }}
                        >
                            <img src={InstagramIcon} height={20} />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid container pb={6}>
                    <Grid item xs>
                        <Typography
                            variant={isTabletOrMobile ? "body2" : "body1"}
                            fontWeight={500}
                            color={theme.palette.secondary.dark}
                        >
                            © 2022, IIIT Hyderabad
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Box width="100%" display="flex" justifyContent="flex-end">
                            <Link
                                href={PRIVACY_POLICY_URL}
                                underline="hover"
                                variant={isTabletOrMobile ? "body2" : "body1"}
                                fontWeight={500}
                                color={theme.palette.secondary.main}
                            >
                                Privacy Policy
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Footer;
