import "./styles.scss";
import updatesIcon from "./assets/updates.svg";
import { Button } from "reactstrap";

const Updates = () => {
    return (
        <Button color="light" className="updates-btn rounded-circle">
            <img src={updatesIcon} alt="updates" className="updates-icon" />
        </Button>
    );
};

export default Updates;
