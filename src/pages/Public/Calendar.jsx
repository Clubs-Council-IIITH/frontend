import Page from "components/Page";

import EventCalendar from "components/EventCalendar";

const Calendar = () => {
    return (
        <Page noToolbar header={"Event Calendar"} loading={false} empty={false}>
            <EventCalendar />
        </Page>
    );
};

export default Calendar;
