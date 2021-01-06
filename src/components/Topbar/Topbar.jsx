/**
 * Top bar Component to hold title, searchbar and updates button.
 *
 * props:
 *  - title (`string`): Title of the current page.
 *  - component (`component`): Optional. Custom component to render
 *                             on the topbar.
 */

import "./styles.scss";
import updatesIcon from "./assets/updates.svg";

const Topbar = ({ title, component }) => {
    return (
        <div className="topbar-column">
            <div className="topbar text-light">
                <div className="title-display">
                    {title ? <div className="mr-4">{title}</div> : null}
                    <div className="d-none d-md-block">{component}</div>
                </div>
                <div className="updates-display">
                    <img src={updatesIcon} alt="updates" className="updates-icon" />
                </div>
            </div>
            <div className="d-md-none mt-3 mb-2">{component}</div>
        </div>
    );
};

export default Topbar;
