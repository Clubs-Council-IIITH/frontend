import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

const SecondaryNavbar = (props) => {
    const organizerButtonList = [
        { text: "events", page: "events", link: "/organizer/events" },
        { text: "budget", page: "budget", link: "/organizer/budget" },
    ];

    const adminButtonList = [
        { text: "clubs", page: "clubs", link: "/admin/clubs" },
        { text: "users", page: "users", link: "/admin/users" },
        { text: "budgets", page: "budgets", link: "/admin/budgets" },
        // { text: "council", page: "council", link: "/admin/council" },
    ];

    const buttonList = props.admin ? adminButtonList : organizerButtonList;

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
