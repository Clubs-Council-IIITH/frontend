/**
 * View component to render a single club item.
 *
 * props:
 *  - id (`int`): Unique identifier of the club.
 *  - name (`string`): Name of the club.
 *  - img (`string`): Club image's source.
 *
 * context:
 *  - privilege (`string`): Optional, must belong to ["admin", ].
 *                          If "admin", renders action buttons.
 */

import "./styles.scss";
import { useContext } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Button, Card, CardImg, CardBody, CardFooter } from "reactstrap";

import { PageContext } from "components/PageContainer";
import placeholderImg from "./assets/club-img-placeholder.jpg";

const ClubItem = ({ id, name, img }) => {
    const { privilege } = useContext(PageContext);
    const { path } = useRouteMatch();

    return (
        <Card className="d-flex flex-fill club-item elevate clickable">
            <Link to={`${path}/${id}`} className="invisible-link">
                <CardImg src={img || placeholderImg} alt={name} height="180px" />
                <CardBody className="d-flex flex-fill justify-content-end align-items-center pb-3">
                    <div className="h4 text-right font-weight-bold">{name}</div>
                </CardBody>
            </Link>

            {/* display actions only to admins */}
            {privilege === "admin" ? (
                <CardFooter className="d-flex justify-content-between px-2">
                    <Button color="warning" className="flex-fill mx-2">
                        EDIT
                    </Button>
                    <Button color="danger" className="flex-fill mx-2">
                        DELETE
                    </Button>
                </CardFooter>
            ) : null}
        </Card>
    );
};

export default ClubItem;
