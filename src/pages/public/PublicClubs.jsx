import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "reactstrap";

import API from "../../api/methods";

import Searchbar from "../../components/Searchbar";
import ClubItem from "../../components/items/ClubItem";
import NullIndicator from "../../components/NullIndicator";
import Transition from "../../components/TransitionContainer";
import LoadingIndicator from "../../components/LoadingIndicator";
import { PageContext } from "../../components/Navigation";

const Clubs = (props) => {
    const [clubList, setClubList] = useState(false);
    const [filteredList, setFilteredList] = useState(false);

    const pageContext = useContext(PageContext);

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
            <Container fluid className="mt-2 mt-md-5">
                <Row>
                    {filteredList.map((club) => (
                        <Col
                            md="6"
                            xl={pageContext.rightbarEnabled ? "4" : "3"}
                            className="my-3 d-flex"
                            key={club.id}
                        >
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
                        <span className="actionbar-title ml-md-2">Clubs</span>
                    </Col>
                    <Col className="my-4 my-md-auto">
                        <Searchbar
                            className="w-100 my-auto"
                            dataList={clubList}
                            setFilteredList={setFilteredList}
                            searchAttr={(obj) => obj.name}
                        />
                    </Col>
                </Row>
            </Container>
            {renderClubs()}
        </Transition>
    );
};

export default Clubs;
