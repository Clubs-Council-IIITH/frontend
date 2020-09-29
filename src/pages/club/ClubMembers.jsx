import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";

import API from "../../api/methods";

import ClubNavigation from "./ClubNavigation";
import LoadingIndicator from "../../components/LoadingIndicator";
import NullIndicator from "../../components/NullIndicator";
import MemberItem from "../../components/items/MemberItem";
import Transition from "../../components/TransitionContainer";
import Searchbar from "../../components/Searchbar";

const ClubMembers = (props) => {
    const [members, setMembers] = useState(false);
    const [filteredList, setFilteredList] = useState(false);

    useEffect(() => {
        async function getMembers() {
            const members_res = await API.view("members", {
                club: props.match.params.id || null,
            });
            setMembers(members_res.data);
            setFilteredList(members_res.data);
        }
        getMembers();
    }, [props.match.params.id]);

    const renderMembers = () => {
        if (!filteredList) return <LoadingIndicator />;
        if (filteredList.length === 0) return <NullIndicator />;
        return (
            <Container fluid className="mt-2 mt-md-5">
                <Row>
                    {filteredList.map((member) => (
                        <Col sm="6" md="4" lg="3" className="my-3 member-card" key={member.id}>
                            <MemberItem {...member.user_info} role={member.role} />
                        </Col>
                    ))}
                </Row>
            </Container>
        );
    };

    return (
        <ClubNavigation match={props.match}>
            <></>
            <Transition>
                <Row className="mt-4 mt-md-5">
                    <Col className="mx-3">
                        <Searchbar
                            className="w-100"
                            dataList={members}
                            setFilteredList={setFilteredList}
                            searchAttr={(obj) => obj.user_info.name}
                        />
                    </Col>
                </Row>
                {renderMembers()}
            </Transition>
        </ClubNavigation>
    );
};

export default ClubMembers;
