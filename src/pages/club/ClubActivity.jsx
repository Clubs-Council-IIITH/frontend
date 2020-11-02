import React, { useState, useEffect } from "react";
import { Container, Col } from "reactstrap";

import API from "../../api/methods";

import ClubNavigation from "./ClubNavigation";
import LoadingIndicator from "../../components/LoadingIndicator";
import NullIndicator from "../../components/NullIndicator";
import LogItem from "../../components/items/LogItem";
import { isSameDay } from "../../utils/DateTimeFormatter";
import Transition from "../../components/TransitionContainer";

const ClubActivity = (props) => {
    const [logs, setLogs] = useState(false);

    useEffect(() => {
        async function getLogs() {
            const logs_res = await API.view("logs", { club: props.match.params.id });
            setLogs(logs_res.data);
        }
        getLogs();
    }, [props.match.params.id]);

    const renderActivity = () => {
        if (!logs) return <LoadingIndicator />;
        if (logs.length === 0) return <NullIndicator />;
        var prevDate = logs[0].datetime;
        logs[0]["datebreak"] = true;
        logs.forEach(function (log) {
            if (!isSameDay(prevDate, log.datetime)) {
                log["datebreak"] = true;
                prevDate = log.datetime;
            }
        });
        return (
            <Container fluid>
                <div className="mt-4">
                    {logs.map((log) => (
                        <Col md="12" className="my-1">
                            <LogItem
                                datetime={log.datetime}
                                creator={log.actor}
                                action={log.action}
                                event={log.event.name}
                                datebreak={log.datebreak}
                            />
                        </Col>
                    ))}
                </div>
            </Container>
        );
    };

    return (
        <ClubNavigation match={props.match}>
            <Transition>{renderActivity()}</Transition>
        </ClubNavigation>
    );
};

export default ClubActivity;
