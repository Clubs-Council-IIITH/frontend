import { Route, Switch } from "react-router-dom";

import * as Public from "pages/public";
import * as Club from "pages/club";

const App = () => {
    return (
        <Switch>
            <Route exact path="/" component={Club.View} />
            <Route path="/clubs" component={Public.Clubs} />
            <Route path="/calendar" component={Public.Calendar} />
        </Switch>
    );
};

export default App;
