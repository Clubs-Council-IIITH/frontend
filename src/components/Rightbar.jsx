import React, { useState, useEffect } from "react";
import { Button, Row, Col, Navbar, Nav } from "reactstrap";

import API from "../api/methods";

import NullIndicator from "./NullIndicator";
import UpdateItem from "./items/UpdateItem";
import NewUpdateModal from "./NewUpdateModal";
import LoadingIndicator from "./LoadingIndicator";

const Rightbar = (props) => {
    const [updates, setUpdates] = useState(false);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        async function getUpdates() {
            const res = await API.view("updates");
            setUpdates(res.data);
        }

        getUpdates();
    }, []);

    const toggleModal = () => {
        setModal(!modal);
    };

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
            {props.session.usergroup === "cc_admin" ? (
                <NewUpdateModal modal={modal} toggleModal={toggleModal} />
            ) : null}
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
                {props.session.usergroup === "cc_admin" ? (
                    <Button className="mt-4 common-btn new-update-btn py-2" onClick={toggleModal}>
                        + NEW UPDATE
                    </Button>
                ) : null}
                <div className="mt-2 pb-4">{renderUpdates()}</div>
            </Nav>
        </Navbar>
    );
};

export default Rightbar;
