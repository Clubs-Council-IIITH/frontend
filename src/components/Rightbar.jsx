import React, { useState, useEffect } from "react";
import { Row, Col, Navbar, Nav } from "reactstrap";

import API from "../api/methods";

import NullIndicator from "./NullIndicator";
import LoadingIndicator from "./LoadingIndicator";
import UpdateItem from "./items/UpdateItem";

const Rightbar = (props) => {
    const [updates, setUpdates] = useState(false);

    useEffect(() => {
        async function getUpdates() {
            const res = await API.view("updates");
            setUpdates(res.data);
        }

        getUpdates();
    }, []);

    const renderUpdates = () => {
        if (!updates) return <LoadingIndicator />;
        if (updates.length === 0) return <NullIndicator />;
        return (
            <Row>
                {updates.map((update) => (
                    <Col md="12" className="my-2" key={update.id}>
                        <UpdateItem {...update} />
                    </Col>
                ))}
            </Row>
        );
    };

    return (
        <Navbar
            light
            className={`rightbar overflow-auto nav-light p-4 d-xlp ${
                props.isOpen ? "d-block rightbar-collapse" : ""
            }`}
        >
            <div className="d-flex flex-row justify-content-between">
                <div className="rightbar-title d-flex flex-row">
                    <img className="update-icon" src="/sb-updates-18.svg" alt="updates" />
                    <span className="text-uppercase my-auto mx-2"> Updates </span>
                </div>
                <img
                    className={`nav-close invert clickable d-xlp-none ${
                        props.isOpen ? "d-block" : ""
                    }`}
                    src="/sb-close-18.svg"
                    alt="X"
                    onClick={props.toggle}
                />
            </div>
            <Nav className="m-auto d-flex justify-content-between rightbar-nav" navbar>
                <div className="mt-3 pb-4">{renderUpdates()}</div>
            </Nav>
        </Navbar>
    );
};

export default Rightbar;
