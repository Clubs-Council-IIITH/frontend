import React from "react";

import Transition from "../../components/TransitionContainer";

const CALENDAR_URI =
    "https://outlook.office365.com/owa/calendar/46728502c54740bfb04bd9522fdccf17@iiit.ac.in/7d469f1382ef43cc84e65ac4d9e95d8710357110675142350263/calendar.html";

const Calendar = () => {
    return (
        <Transition>
            <div className="calendar-container">
                <iframe
                    title="calendar"
                    src={CALENDAR_URI}
                    frameBorder="0"
                    className="calendar-frame p-1"
                />
            </div>
        </Transition>
    );
};

export default Calendar;
