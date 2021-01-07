import "./styles.scss";
import backIcon from "./assets/back.svg";
import { Button } from "reactstrap";

const BackButton = () => {
    return (
        <Button color="light" className="back-btn rounded-circle">
            <img src={backIcon} alt="back" className="back-icon" />
        </Button>
    );
};

export default BackButton;
