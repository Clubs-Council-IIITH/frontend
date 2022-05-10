import { useState, createContext } from "react";

export const EventFormContext = createContext();

const EventFormContextProvider = ({ stepperMethods, children }) => {
    const [stepper, setStepper] = useState(stepperMethods);

    return (
        <EventFormContext.Provider value={{ stepper, setStepper }}>
            {children}
        </EventFormContext.Provider>
    );
};

export default EventFormContextProvider;
