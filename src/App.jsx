import { Route, Switch } from "react-router-dom";

import * as Public from "pages/public";

const App = () => {
    return (
        <Switch>
            <Route exact path="/" component={Public.Home} />
            <Route path="/clubs" component={Public.Clubs} />
            <Route path="/calendar" component={Public.Calendar} />
        </Switch>
    );
};

export default App;
