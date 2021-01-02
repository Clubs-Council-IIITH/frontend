import "./styles.scss";
import { useContext } from "react";
import { Card, CardImg, CardBody, CardFooter } from "reactstrap";

import { PageContext } from "components/PageContainer";
import placeholderImg from "./assets/club-img-placeholder.jpg";

const ClubItem = ({ id, name, mail, img }) => {
    const { privilege } = useContext(PageContext);

    return (
        <Card className="d-flex flex-fill club-item">
            <CardImg src={img || placeholderImg} alt={name} height="180px" />
            <CardBody className="d-flex flex-fill justify-content-end align-items-center">
                <div className="h4 text-right font-weight-bold">{name}</div>
            </CardBody>
        </Card>
    );
};

export default ClubItem;
