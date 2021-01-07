/**
 * Component to display list of clubs
 *
 * context:
 *  - setContent (`list`): List of club objects to render, set by an API call.
 *  - searchContent (`list`): Filtered list as output by the searchbar.
 */

import { useEffect, useContext } from "react";
import { Row, Col } from "reactstrap";

import { clubs } from "api/endpoints";
import { HandleView } from "api/methods";

import { PageContext } from "components/PageContainer";

import ClubItem from "./ClubItem";
import Loading from "components/Loading";
import ErrorPage from "components/ErrorPage";

const ClubsList = () => {
    const { setContent, searchContent } = useContext(PageContext);

    const [{ loading, data: clubsList, error }, fetchClubs] = HandleView(clubs.VIEW, {});
    useEffect(() => fetchClubs(), []); // eslint-disable-line

    useEffect(() => {
        setContent(clubsList);
    }, [clubsList, setContent]);

    if (loading) return <Loading />;
    if (error) return <ErrorPage {...error} />;
    return (
        <Row className="d-flex mt-2">
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
