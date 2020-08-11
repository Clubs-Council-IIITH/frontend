import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

const SecondaryNavbar = (props) => {
    const buttonList = [
        { text: "clubs", page: "clubs", link: "/admin/clubs" },
        { text: "users", page: "users", link: "/admin/users" },
        // { text: "council", page: "council", link: "/admin/council" },
    ];

    return (
        <div className="secondary-nav mb-3">
            {buttonList.map((button) => (
                <Button
                    tag={Link}
                    to={button.link}
                    className={
                        "text-uppercase mx-3 px-3 py-2 nav-btn" +
                        (props.page === button.page ? "-active" : "")
                    }
                >
                    {button.text}
                </Button>
            ))}
        </div>
    );
};

export default SecondaryNavbar;
