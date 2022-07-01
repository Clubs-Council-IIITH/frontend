import { useState, useEffect, createContext } from "react";

export const EventFormContext = createContext();

const EventFormContextProvider = ({ open, event = null, stepperMethods, children }) => {
    const [stepper, setStepper] = useState(stepperMethods);
    const [activeEvent, setActiveEvent] = useState(event);

    // update currently active event every time modal opens
    useEffect(() => setActiveEvent(event), [open]);

    return (
        <EventFormContext.Provider value={{ stepper, setStepper, activeEvent, setActiveEvent }}>
            {children}
        </EventFormContext.Provider>
    );
};

export default EventFormContextProvider;
