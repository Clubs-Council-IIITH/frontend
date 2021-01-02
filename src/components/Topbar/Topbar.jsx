import "./styles.scss";
import updatesIcon from "./assets/updates.svg";

const Topbar = ({ title }) => {
    return (
        <div className="topbar text-light">
            <div className="title-display">{title}</div>
            <div className="updates-display">
                <img src={updatesIcon} alt="updates" className="updates-icon" />
            </div>
        </div>
    );
};

export default Topbar;
