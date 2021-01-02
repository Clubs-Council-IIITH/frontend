import "./styles.scss";
import updatesIcon from "./assets/updates.svg";
import Searchbar from "components/Searchbar";

const Topbar = ({ title }) => {
    return (
        <div className="topbar text-light">
            <div className="title-display">
                <div className="mr-4">{title}</div>
                <Searchbar />
            </div>
            <div className="updates-display">
                <img src={updatesIcon} alt="updates" className="updates-icon" />
            </div>
        </div>
    );
};

export default Topbar;
