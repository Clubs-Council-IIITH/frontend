/**
 * Navbar component that holds logo, buttons and logged in user profile.
 */

import { useContext } from "react";

import { Nav } from "reactstrap";
import "./styles.scss";

import CCLogo from "./assets/cc_logo.svg";
import CCLogoSmall from "./assets/cc_logo_sm.svg";
import HomeIcon from "./assets/home.svg";
import ClubsIcon from "./assets/clubs.svg";
import CalendarIcon from "./assets/calendar.svg";
import DashboardIcon from "./assets/dashboard.svg";

import { SessionContext } from "App";
import { useWindowDimensions } from "utils/WindowDimensions";

import Profile from "../Profile";
import NavigationItem from "./NavigationItem";

const NavItems = [
    {
        title: "home",
        path: "/",
        exact: true,
        icon: HomeIcon,
    },
    {
        title: "clubs",
        path: "/clubs",
        icon: ClubsIcon,
    },
    {
        title: "calendar",
        path: "/calendar",
        icon: CalendarIcon,
    },
];

const ContextNavItem = () => {
    const { session } = useContext(SessionContext);

    const ContextItems = {
        cc_admin: {
            title: "dashboard",
            path: "/admin",
            icon: DashboardIcon,
        },
        organizer: {
            title: "manage club",
            path: "/club",
            icon: DashboardIcon,
        },
    };

    if (!session.user.group) return null;
    return <NavigationItem {...ContextItems[session.user.group]} />;
};

const Navigation = () => {
    const { width } = useWindowDimensions();

    return (
        <div className="navigation-col text-light">
            <div className="d-flex flex-column justify-content-start p-4 h-100">
                <div>
                    <img
                        src={width < 992 ? CCLogoSmall : CCLogo}
                        alt="Clubs Council"
                        className="navlogo"
                    />
                </div>
                <Nav className="navitems-container p-0 mt-5">
                    {NavItems.map((item, idx) => (
                        <NavigationItem {...item} key={idx} />
                    ))}
                    <ContextNavItem />
                </Nav>
            </div>
            <div className="navprofile-container d-none d-lg-block">
                <Profile />
            </div>
        </div>
    );
};

export default Navigation;
