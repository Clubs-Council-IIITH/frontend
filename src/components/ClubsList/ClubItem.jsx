import "./styles.scss";
import { useContext } from "react";
import { Card, CardBody, CardFooter } from "reactstrap";

import { PageContext } from "components/PageContainer";

const ClubItem = ({ id, name, mail }) => {
    const { privilege } = useContext(PageContext);

    return (
        <Card className="d-flex flex-fill club-item">
            <CardBody className="d-flex flex-fill justify-content-center align-items-center">
                <div className="h4 text-center font-weight-bold">{name}</div>
            </CardBody>
        </Card>
    );
};

export default ClubItem;
