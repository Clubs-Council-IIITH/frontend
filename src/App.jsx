import { Route, Switch } from "react-router-dom";

import * as Public from "pages/public";

const App = () => {
    return (
        <Switch>
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
