import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Button } from "reactstrap";

import { formatDateTime } from "../../utils/DateTimeFormatter";

const ProposalItem = (props) => {
    return (
        <Card className="proposal-card dash-card elevate">
            <CardBody>
                <div className="proposal-club"> {props.name} </div>
                <div className="proposal-date">
                    {props.datetime && formatDateTime(props.datetime).date}
                </div>
                <div className="proposal-time">
                    {props.datetime && formatDateTime(props.datetime).time}
                </div>
                {/* <div className="proposal-link mt-3"> */}
                {/*     <InputGroup> */}
                {/*         <Input type="text" value={props.link} readonly /> */}
                {/*         <InputGroupAddon addonType="append" className="proposal-link-btn"> */}
                {/*             <Button */}
                {/*                 color="secondary" */}
                {/*                 className="common-btn" */}
                {/*                 onClick={() => window.open(props.link, "_blank")} */}
                {/*             > */}
                {/*                 <img src="/open-18.svg" className="btn-icon mb-1 mr-1" alt="O" /> */}
                {/*                 <span> OPEN </span> */}
                {/*             </Button> */}
                {/*         </InputGroupAddon> */}
                {/*     </InputGroup> */}
                {/* </div> */}
                <div className="proposal-pdf mt-3">
                    <Button
                        size="lg"
                        tag={Link}
                        target="_blank"
                        to={props.pdf}
                        className="common-btn w-100"
                    >
                        <img src="/view-18.svg" className="btn-icon mb-1 mr-1" alt="V" />
                        <span> VIEW PDF </span>
                    </Button>
                </div>
            </CardBody>
        </Card>
    );
};

export default ProposalItem;
