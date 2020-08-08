import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

const SecondaryNavbar = (props) => {
    return (
        <div className="secondary-nav mb-3">
            <Button
                tag={Link}
                to="./clubs"
                className={"mx-3 px-3 py-2 nav-btn" + (props.page === "clubs" ? "-active" : "")}
                color="secondary"
            >
                CLUBS
            </Button>
            <Button
                tag={Link}
                to="./users"
                className={"mx-3 px-3 py-2 nav-btn" + (props.page === "users" ? "-active" : "")}
                color="secondary"
            >
                USERS
            </Button>
            <Button
                tag={Link}
                to="./council"
                className={"mx-3 px-3 py-2 nav-btn" + (props.page === "council" ? "-active" : "")}
                color="secondary"
            >
                COUNCIL
            </Button>
        </div>
    );
};

export default SecondaryNavbar;
