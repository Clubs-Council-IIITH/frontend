import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { HandleSession } from "api/session";

import * as Public from "pages/public";

const App = () => {
    const [session, fetchSession, dispatch] = HandleSession();
    useEffect(() => fetchSession(), []); // eslint-disable-line

    console.log(session);

    return (
        <Switch>
            {/* <div> */}
            {/*     <Button onClick={() => dispatch({ type: "LOGIN" })}> login </Button> */}
            {/*     <Button onClick={() => dispatch({ type: "LOGOUT" })}> logout </Button> */}
            {/* </div> */}
            <Route exact path="/">
                <Public.Home />
            </Route>
            <Route path="/clubs">
                <Public.Clubs />
            </Route>
            <Route path="/calendar">
                <Public.Calendar />
            </Route>
        </Switch>
    );
};

export default App;
