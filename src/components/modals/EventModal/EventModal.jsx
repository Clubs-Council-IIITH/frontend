import { useState, useEffect } from "react";
import {
    Skeleton,
    Divider,
    Button,
    Box,
    Card,
    CardMedia,
    CardActionArea,
    CardActions,
} from "@mui/material";

import { useLazyQuery } from "@apollo/client";
import { GET_EVENT_BY_ID } from "queries/events";

import { Modal, ModalBody, ModalFooter } from "components/modals";
import { TabBar, TabPanels } from "components/Tabs";

import Details from "./Details";
import Budget from "./Budget";
import Venue from "./Venue";
import Discussion from "./Discussion";

const EVENT_POSTER_PLACEHOLDER =
    "https://lands-tube.it.landsd.gov.hk/AVideo/view/img/notfound_portrait.jpg";

const EventModal = ({ manage, eventId = null, actions = [], controller: [open, setOpen] }) => {
    // tab list and controller
    const tabs = [
        { title: "Details", panel: <Details /> },
        { title: "Budget", panel: <Budget /> },
        { title: "Venue", panel: <Venue /> },
        { title: "Discussion", panel: <Discussion /> },
    ];
    const tabController = useState(0);
    useEffect(() => open && tabController[1](0), [open]);

    // modal states
    const [activeEventId, setActiveEventId] = useState(eventId);
    const [editing, setEditing] = useState(!eventId);
    const [deleting, setDeleting] = useState(false);
    const [currentPoster, setCurrentPoster] = useState(EVENT_POSTER_PLACEHOLDER);

    // fetch event details
    const [getEventData, { data: eventData, loading: eventLoading }] = useLazyQuery(
        GET_EVENT_BY_ID,
        { variables: { id: activeEventId } }
    );

    // update all states whenever eventId changes
    useEffect(() => setActiveEventId(eventId), [eventId, open]);
    useEffect(() => setEditing(!eventId), [eventId, open]);
    useEffect(() => setDeleting(false), [eventId, open]);
    useEffect(
        () => setCurrentPoster(eventData?.event?.poster || EVENT_POSTER_PLACEHOLDER),
        [eventData, open]
    );

    // fetch new event details whenever active event id changes
    useEffect(() => getEventData(), [activeEventId]);

    // pass down props to each tab
    const tabProps = {
        activeEventId,
        setActiveEventId,
        eventData,
        eventLoading,
        editing,
        setEditing,
        deleting,
        setDeleting,
        currentPoster,
        setCurrentPoster,
    };

    // action handlers
    const handleCancel = () => {
        if (!activeEventId) setOpen(false);
        else if (editing) setEditing(false);
        else if (deleting) setDeleting(false);
    };

    const handleEdit = () => {
        setEditing(true);
    };

    const handleDelete = () => {
        setDeleting(true);
    };

    const handleDeleteConfirm = () => {
        handleCancel();
    };

    const handleApprove = () => {
        return;
    };

    // map action keys to buttons
    const actionButtons = {
        cancel: (
            <Button key="cancel" variant="outlined" onClick={handleCancel}>
                Cancel
            </Button>
        ),
        save: (
            <Button
                key="save"
                type="submit"
                form="ActiveEventForm"
                variant="contained"
                color="info"
                disableElevation
            >
                Save
            </Button>
        ),
        edit: (
            <Button key="edit" variant="outlined" color="warning" onClick={handleEdit}>
                Edit
            </Button>
        ),
        delete: (
            <Button key="delete" variant="outlined" color="error" onClick={handleDelete}>
                Delete
            </Button>
        ),
        deleteConfirm: (
            <Button
                key="save"
                variant="contained"
                color="error"
                disableElevation
                onClick={handleDeleteConfirm}
            >
                Yes, Delete it
            </Button>
        ),
        approve: (
            <Button key="approve" variant="outlined" color="success" onClick={handleApprove}>
                Approve
            </Button>
        ),
    };

    return (
        <Modal controller={[open, setOpen]}>
            <Card variant="none">
                <Box component={editing ? "div" : CardActionArea}>
                    <CardMedia
                        component="img"
                        height={140}
                        image={eventLoading ? EVENT_POSTER_PLACEHOLDER : currentPoster}
                    />
                </Box>

                <ModalBody full>
                    {manage && activeEventId ? (
                        <>
                            <TabBar tabs={tabs} controller={tabController} tabProps={tabProps} />
                            <Divider />
                        </>
                    ) : null}

                    <TabPanels tabs={tabs} controller={tabController} tabProps={tabProps} />
                </ModalBody>

                {editing || deleting || actions.length ? (
                    <>
                        <Divider />
                        <ModalFooter>
                            <Box display="flex" justifyContent="flex-end" width="100%">
                                <CardActions sx={{ p: 0, m: 0 }}>
                                    {!activeEventId || editing ? (
                                        <>{actionButtons["save"]}</>
                                    ) : deleting ? (
                                        <>
                                            {actionButtons["cancel"]}
                                            {actionButtons["deleteConfirm"]}
                                        </>
                                    ) : (
                                        actions.map((action) => actionButtons[action])
                                    )}
                                </CardActions>
                            </Box>
                        </ModalFooter>
                    </>
                ) : null}
            </Card>
        </Modal>
    );
};

export default EventModal;
