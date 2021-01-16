import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Mesto from "./Mesto";
import Login from "./Login";
import Register from "./Register";

function App() {
    const [loggedIn] = React.useState(false);
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/sign-in">
                    <Login />
                </Route>
                <Route path="/sign-up">
                    <Register />
                </Route>
                <Route exact path="/">
                    {() => loggedIn ? <Mesto /> : <Redirect to="/sign-up" />}
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
