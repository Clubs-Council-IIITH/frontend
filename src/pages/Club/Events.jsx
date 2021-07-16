import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import EventService from "services/EventService";

import { Box, Grid } from "@material-ui/core";
import { AddOutlined as AddIcon } from "@material-ui/icons";

import { SessionContext } from "contexts/SessionContext";
import { SecondaryActionButton } from "components/buttons";

import Page from "components/Page";
import EventFormModal from "components/modals/EventFormModal";
import EventDeleteModal from "components/modals/EventDeleteModal";
import { EventCard } from "components/cards";

const Events = ({ manage, setActions }) => {
    const { clubId } = useParams();
    const { session } = useContext(SessionContext);

    const [events, setEvents] = useState({ loading: true });

    // create/edit event form modal
    const [formProps, setFormProps] = useState({});
    const [formModal, setFormModal] = useState(null);

    // delete confirmation modal
    const [deleteProps, setDeleteProps] = useState({});
    const [deleteModal, setDeleteModal] = useState(null);

    // open edit modal and autofill data of event with given `id`
    const triggerEdit = (id) => {
        setFormProps({ event: events?.data?.find((event) => event.id === id) });
        setFormModal(true);
    };

    // open edit modal and autofill data of event with given `id`
    const triggerDelete = (id) => {
        setDeleteProps({ event: events?.data?.find((event) => event.id === id) });
        setDeleteModal(true);
    };

    // fetch list of events from API
    useEffect(() => {
        (async () => {
            if (manage && session?.user?.club) {
                setEvents(await EventService.getEventsByClubId(session.user.club));
            } else {
                setEvents(await EventService.getEventsByClubId(clubId));
            }
        })();
    }, [clubId, manage, session?.user?.club]);

    // set/clear action buttons if `manage` is set
    useEffect(() => {
        setActions(
            manage ? (
                <SecondaryActionButton
                    noPadding
                    size="large"
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                        setFormProps({});
                        setFormModal(true);
                    }}
                >
                    <Box display="flex" mr={1}>
                        <AddIcon fontSize="small" />
                    </Box>
                    New Event
                </SecondaryActionButton>
            ) : null
        );
    }, [manage]);

    const cardProps = {
        manage,
        triggerEdit,
        triggerDelete,
    };

    return (
        <Page full loading={events?.loading} empty={!events?.data?.length}>
            <EventFormModal controller={[formModal, setFormModal]} {...formProps} />
            <EventDeleteModal controller={[deleteModal, setDeleteModal]} {...deleteProps} />

            <Box p={3}>
                <Grid container spacing={2}>
                    {events?.data?.map((event, idx) => (
                        <Grid item md={4} key={idx}>
                            <EventCard {...event} {...cardProps} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Page>
    );
};

export default Events;
