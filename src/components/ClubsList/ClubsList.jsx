import { useEffect, useContext } from "react";
import { Row, Col } from "reactstrap";

import { clubs } from "api/endpoints";
import { handleView } from "api/methods";

import { PageContext } from "components/PageContainer";

import ClubItem from "./ClubItem";

const ClubsList = () => {
    const { searchContent, setSearchContent } = useContext(PageContext);

    useEffect(() => {
        const fetchClubs = async () => {
            const res = await handleView(clubs.VIEW, {});
            setSearchContent(res.data);
        };

        fetchClubs();
    }, [setSearchContent]);

    return (
        <Row className="d-flex">
            {searchContent
                ? searchContent.map((club, idx) => (
                      <Col
                          xs={12}
                          md={6}
                          lg={4}
                          xl={3}
                          key={idx}
                          className="mb-3 px-2 d-flex flex-fill"
                      >
                          <ClubItem {...club} />
                      </Col>
                  ))
                : null}
        </Row>
    );
};

export default ClubsList;
