import "./styles.scss";
import ErrorIcon from "./assets/error.svg";

const ErrorPage = ({ status, data }) => {
    return (
        <div className="error-container">
            <img src={ErrorIcon} alt="" className="error-icon mb-2" />
            <div className="font-weight-bold h3">{status}</div>
            <div className="error-msg">{data}</div>
        </div>
    );
};

export default ErrorPage;
