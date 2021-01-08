import "./styles.scss";
import ErrorIcon from "./assets/error.svg";

const ErrorPage = ({ status, data }) => {
    return (
        <div className="error-container">
            <img src={ErrorIcon} alt="" className="error-icon mb-2" />
            <div className="font-weight-bold h3 mt-3">{status}</div>
            <div className="error-msg mt-n2">{data}</div>
        </div>
    );
};

export default ErrorPage;
