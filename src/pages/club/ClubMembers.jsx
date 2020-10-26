import React, { useState, useEffect } from "react";
import {
    Button,
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Container,
    Row,
    Col,
} from "reactstrap";

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
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        async function getMembers() {
            const members_res = await API.view("members", {
                club: props.match.params.id || null,
            });
            setMembers(members_res.data.sort((a, b) => b.active_year - a.active_year));
            setFilteredList(members_res.data.sort((a, b) => b.active_year - a.active_year));
        }
        getMembers();
    }, [props.match.params.id]);

    const renderMembers = () => {
        if (!filteredList) return <LoadingIndicator />;
        if (filteredList.length === 0) return <NullIndicator />;
        const yearList = filteredList.map((obj) => obj.active_year);
        const yearSet = [...new Set(yearList)];

        return (
            <Container fluid className="mt-2 mt-md-5">
                <div className="mb-3 mt-4 mt-md-0 d-flex flex-row justify-content-start align-items-stretch">
                    <UncontrolledButtonDropdown>
                        <DropdownToggle
                            className="text-uppercase viewclub-members-year common-btn py-3 px-4"
                            color="light"
                            caret
                        >
                            {currentYear} &nbsp;
                        </DropdownToggle>
                        <DropdownMenu>
                            {yearSet.map((year) => (
                                <DropdownItem
                                    className="common-btn text-uppercase w-100"
                                    onClick={() => setCurrentYear(year)}
                                >
                                    {year}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </UncontrolledButtonDropdown>
                    <Button className="font-weight-bold common-btn mx-2 px-4" color="dark">
                        + NEW MEMBER
                    </Button>
                </div>
                <Row>
                    {filteredList.map((member) => (
                        <>
                            {member.active_year === currentYear ? (
                                <Col
                                    sm="6"
                                    md="4"
                                    lg="3"
                                    className="my-3 member-card"
                                    key={member.id}
                                >
                                    <MemberItem {...member.user_info} role={member.role} />
                                </Col>
                            ) : null}
                        </>
                    ))}
                </Row>
            </Container>
        );
    };

    return (
        <ClubNavigation match={props.match}>
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
