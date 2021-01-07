import "./styles.scss";
import { Spinner } from "reactstrap";

const Loading = () => {
    return (
        <div className="loading-container">
            <Spinner color="dark" />
        </div>
    );
};

export default Loading;
