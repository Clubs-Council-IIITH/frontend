import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";

import API from "../api/methods";

import Page from "../components/PageContainer";
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
        console.log(filteredList);
        if (!filteredList) return <LoadingIndicator />;
        if (filteredList.length === 0) return <NullIndicator />;
        return (
            <Page>
                <Row className="mt-4">
                    {filteredList.map((club) => (
                        <Col md="6" lg="4" className="my-3" key={club.id}>
                            <ClubItem {...club} link={props.match.url + "/" + club.id} />
                        </Col>
                    ))}
                </Row>
            </Page>
        );
    };

    return (
        <Page fluid>
            <Container fluid className="actionbar-container py-4 p-md-5 rounded-lg">
                <Page header>
                    <span className="actionbar-title p-2">Clubs</span>
                </Page>
                <Page className="mt-5">
                    <Searchbar
                        className="w-100"
                        dataList={clubList}
                        setFilteredList={setFilteredList}
                    />
                </Page>
            </Container>
            {renderClubs()}
        </Page>
    );
};

export default Clubs;
