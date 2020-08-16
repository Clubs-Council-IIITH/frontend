import React from "react";

import Page from "../components/PageContainer";

const CALENDAR_URI = "";

const Calendar = () => {
    return (
        <Page fluid>
            <div className="calendar-container">
                <iframe
                    title="calendar"
                    src={CALENDAR_URI}
                    frameborder="0"
                    className="calendar-frame p-2"
                />
            </div>
        </Page>
    );
};

export default Calendar;
