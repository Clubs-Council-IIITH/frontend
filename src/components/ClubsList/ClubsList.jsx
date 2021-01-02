import { useEffect, useContext } from "react";
import { Container } from "reactstrap";

import { clubs } from "api/endpoints";
import { handleView } from "api/methods";

import { PageContext } from "components/PageContainer";

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
        <Container fluid>
            {searchContent
                ? searchContent.map((club, idx) => <div key={idx}>{club.name}</div>)
                : null}
        </Container>
    );
};

export default ClubsList;
