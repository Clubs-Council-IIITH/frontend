import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";

import API from "../api/methods";

import Transition from "../components/TransitionContainer";
import Searchbar from "../components/Searchbar";
import LoadingIndicator from "../components/LoadingIndicator";
import NullIndicator from "../components/NullIndicator";
import ClubItem from "../components/items/ClubItem";

const Clubs = (props) => {
    const [clubList, setClubList] = useState(false);
    const [filteredList, setFilteredList] = useState(false);

    useEffect(() => {
        async function getClubList() {
            const res = await API.view("clubs", {});
            setClubList(res.data.filter((club) => club.state !== "deleted"));
            setFilteredList(res.data.filter((club) => club.state !== "deleted"));
        }

        getClubList();
    }, []);

    const renderClubs = () => {
        if (!filteredList) return <LoadingIndicator />;
        if (filteredList.length === 0) return <NullIndicator />;
        return (
            <Container fluid>
                <Row className="mt-4">
                    {filteredList.map((club) => (
                        <Col md="6" lg="4" className="my-3 d-flex" key={club.id}>
                            <ClubItem {...club} link={props.match.url + "/" + club.id} />
                        </Col>
                    ))}
                </Row>
            </Container>
        );
    };

    return (
        <Transition>
            <Container fluid className="actionbar-container rounded-lg">
                <Row>
                    <Col md="6">
                        <span className="actionbar-title p-2">Clubs</span>
                    </Col>
                    <Col className="my-3 my-md-auto">
                        <Searchbar
                            className="w-100 my-auto"
                            dataList={clubList}
                            setFilteredList={setFilteredList}
                        />
                    </Col>
                </Row>
            </Container>
            {renderClubs()}
        </Transition>
    );
};

export default Clubs;
