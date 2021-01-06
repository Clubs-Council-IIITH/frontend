/**
 * View component to render a single navigation item.
 *
 * props:
 *  - title (`string`): Button text.
 *  - path (`string`): To where the button leads.
 *  - icon (`image`): Icon prefixing the text.
 */

import { NavLink as Link } from "react-router-dom";
import { NavItem, NavLink } from "reactstrap";

const NavigationItem = ({ icon, title, path, exact }) => {
    return (
        <NavItem>
            <NavLink
                tag={Link}
                to={path}
                exact={exact}
                activeClassName="active navitem-active"
                className="navitem my-3"
            >
                <img src={icon} alt={title} className="navitem-icon mx-auto mx-lg-0" />
                <div className="navitem-title ml-3 d-none d-lg-block">{title}</div>
            </NavLink>
        </NavItem>
    );
};

export default NavigationItem;
