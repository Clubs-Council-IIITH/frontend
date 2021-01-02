import "./styles.scss";
import CCLogo from "./assets/cc_logo.svg";
import CCLogoSmall from "./assets/cc_logo_sm.svg";
import HomeIcon from "./assets/home.svg";
import ClubsIcon from "./assets/clubs.svg";
import CalendarIcon from "./assets/calendar.svg";

import { Nav } from "reactstrap";

import NavigationItem from "./NavigationItem";

const NavItems = [
    {
        title: "home",
        link: "/",
        icon: HomeIcon,
    },
    {
        title: "clubs",
        link: "/clubs",
        icon: ClubsIcon,
    },
    {
        title: "calendar",
        link: "/calendar",
        icon: CalendarIcon,
    },
];

const Navigation = () => {
    return (
        <div className="navigation-col text-light">
            <div className="d-flex flex-column justify-content-between p-4 h-100">
                <div>
                    <img src={CCLogo} alt="Clubs Council" className="navlogo" />
                </div>
                <Nav className="navitems-container p-0 m-0">
                    {NavItems.map((item, idx) => (
                        <NavigationItem {...item} key={idx} />
                    ))}
                </Nav>
            </div>
            <div className="navprofile-container p-3">profile</div>
        </div>
    );
};

export default Navigation;
