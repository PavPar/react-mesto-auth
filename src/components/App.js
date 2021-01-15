import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Mesto from "./Mesto";
function App() {
    const [loggedIn] = React.useState(false);
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/sign-up">
                </Route>
                <Route path="/sign-in">
                </Route>
                <Route exact path="/">
                    {() => loggedIn ? <Mesto /> : <Redirect to="/sign-up" />}
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
