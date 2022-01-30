import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GET_CLUB_EVENTS, ADMIN_GET_CLUB_EVENTS } from "queries/events";
import EventModel from "models/EventModel";

import UserGroups from "constants/UserGroups";

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

    const targetId = manage && session?.group === UserGroups.club ? session.props.club.id : clubId;

    // fetch events
    const GET_EVENTS = manage ? ADMIN_GET_CLUB_EVENTS : GET_CLUB_EVENTS;
    const { data, loading } = useQuery(GET_EVENTS, { variables: { id: targetId } });
    const [events, setEvents] = useState([]);
    useEffect(() => {
        const targetEvents = manage ? data?.adminClubEvents : data?.clubEvents;
        setEvents(targetEvents?.map((o) => new EventModel(o)));
    }, [data]);

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
        <>
            <EventFormModal controller={[formModal, setFormModal]} {...formProps} />
            <EventDeleteModal controller={[deleteModal, setDeleteModal]} {...deleteProps} />
            <Page full loading={loading} empty={!events?.length}>
                <Box p={3}>
                    <Grid container spacing={2}>
                        {events?.map((event, idx) => (
                            <Grid item md={4} key={idx}>
                                <EventCard {...event} {...cardProps} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Page>
        </>
    );
};

export default Events;
