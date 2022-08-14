import { useTheme } from "@mui/styles";

import { Grid, Box, Divider, Typography, Link, IconButton } from "@mui/material";

import IIITLogo from "assets/img/iiit_logo_white.png";
import TwitterIcon from "assets/img/twitter.png";
import FacebookIcon from "assets/img/facebook.png";
import InstagramIcon from "assets/img/instagram.png";

const PRIVACY_POLICY_URL = "https://www.iiit.ac.in/privacy-policy/";
const TWITTER_URL = "https://twitter.com/iiit_hyderabad";
const FACEBOOK_URL = "https://www.facebook.com/IIITH";
const INSTAGRAM_URL = "https://www.instagram.com/iiit.hyderabad/";

const Footer = () => {
    const theme = useTheme();

    return (
        <Box px={5} backgroundColor={theme.palette.primary.main}>
            <Divider sx={{ borderColor: theme.palette.grey[800] }} />
            <Box px={3}>
                <Grid container py={8}>
                    <Grid item xs={4} alignItems="flex-start">
                        <Box display="flex" alignItems="center">
                            <Box mr={3}>
                                <img src={IIITLogo} height={50} />
                            </Box>
                            <Typography variant="h4" fontWeight={500} color="secondary">
                                CC
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs>
                        <Box width="100%" display="flex" justifyContent="flex-end">
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
                        </Box>
                    </Grid>
                </Grid>
                <Grid container pb={8}>
                    <Grid item xs={4}>
                        <Typography
                            variant="body1"
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
                                variant="body1"
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
