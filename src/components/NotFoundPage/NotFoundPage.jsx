import "./styles.scss";
import NotFoundIcon from "./assets/notfound.svg";

const NotFoundPage = () => {
    return (
        <div className="notfound-container">
            <img src={NotFoundIcon} alt="" className="notfound-icon mb-2" />
            <div className="font-weight-bold h3 mt-3">404</div>
            <div className="notfound-msg mt-n2">Not Found</div>
        </div>
    );
};

export default NotFoundPage;
