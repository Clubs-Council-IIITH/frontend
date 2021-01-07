import { useHistory } from "react-router-dom";

import "./styles.scss";
import backIcon from "./assets/back.svg";
import { Button } from "reactstrap";

const BackButton = () => {
    const history = useHistory();

    return (
        <Button color="light" className="back-btn rounded-circle" onClick={() => history.goBack()}>
            <img src={backIcon} alt="back" className="back-icon" />
        </Button>
    );
};

export default BackButton;
