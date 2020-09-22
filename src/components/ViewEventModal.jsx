import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, Row, Col, Input } from "reactstrap";

import { formatAudience } from "../utils/AudienceFormatter";
import { formatDateTime } from "../utils/DateTimeFormatter";

const ViewEventModal = (props) => {
    const [hasLink, setHasLink] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line no-useless-escape
        const urlPattern = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;
        setHasLink(urlPattern.test(props.instance.venue));
    }, [props.instance.venue]);

    if (props.id === 0) return null;
    return (
        <Modal isOpen={props.modal} toggle={props.toggleModal} className="modal-lg">
            <ModalHeader className="blank-modal-header" toggle={props.toggleModal} />
            <ModalBody className="common-modal instance-modal px-4 px-md-5 pb-4 pb-md-5 pt-0">
                <div className="event-view-name">{props.instance.name}</div>
                <div className="event-view-datetime mb-3">
                    {formatDateTime(props.instance.datetime).datetime}
                </div>
                <Row>
                    <Col lg="8" className="mb-2">
                        <div className="event-view-description my-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                            occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                            mollit anim id est laborum.
                        </div>
                    </Col>
                    <Col className="ml-lg-2">
                        <div className="event-view-duration my-2 d-flex flex-row">
                            <img className="card-icon my-auto" src="/clock-18.svg" alt="D" />
                            {props.instance.duration}
                        </div>
                        <div className="event-view-audience my-3 d-flex flex-row">
                            <span className="my-auto">
                                <img className="card-icon" src="/audience-18.svg" alt="A" />
                            </span>
                            {formatAudience(props.instance.audience)}
                        </div>
                        <div className="event-view-venue my-2 d-flex flex-row">
                            <span className="my-auto">
                                <img className="card-icon" src="/venue-18.svg" alt="V" />
                            </span>
                            {hasLink ? (
                                <Input
                                    id="linkfield"
                                    type="text"
                                    value={props.instance.venue}
                                    readonly
                                />
                            ) : (
                                props.instance.venue
                            )}
                        </div>
                    </Col>
                </Row>
            </ModalBody>
        </Modal>
    );
};

export default ViewEventModal;
