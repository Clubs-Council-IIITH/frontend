/**
 * Top bar Component to hold title, searchbar and updates button.
 *
 * props:
 *  - title (`string`): Title of the current page.
 */

import "./styles.scss";
import updatesIcon from "./assets/updates.svg";
import Searchbar from "components/Searchbar";

const Topbar = ({ title }) => {
    return (
        <div className="topbar-column">
            <div className="topbar text-light">
                <div className="title-display">
                    {title ? <div className="mr-4">{title}</div> : null}
                    <div className="d-none d-md-block">
                        <Searchbar />
                    </div>
                </div>
                <div className="updates-display">
                    <img src={updatesIcon} alt="updates" className="updates-icon" />
                </div>
            </div>
            <div className="d-md-none mt-3 mb-2">
                <Searchbar />
            </div>
        </div>
    );
};

export default Topbar;
