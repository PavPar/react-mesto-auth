import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import Mesto from "./Mesto";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import Api_auth from "../utils/Api_auth";


function App() {
    const [loggedIn, changeLoggedIn] = React.useState(()=>{
        return localStorage.getItem('jwt')
    });
    const history = useHistory();


    function handleLogin(res) {
        changeLoggedIn(true);
        console.log(res);
    }

    function handleLogout() {
        localStorage.removeItem('jwt')
        changeLoggedIn(false);
    }

    function handleTokenCheck() {

        if (localStorage.getItem('jwt')) {
            const jwt = localStorage.getItem('jwt');

            Api_auth.checkToken(jwt)
                .then((res) => {
                    changeLoggedIn(true);
                })
                .catch((err) => {
                    console.log(err);
                    changeLoggedIn(false);
                });
        }
    }

    useEffect(()=>{
        handleTokenCheck()
    }, [])


    return (
        <BrowserRouter>
            <Switch>
                <ProtectedRoute
                    loggedIn={loggedIn}
                    path="/mesto"
                    component={Mesto}
                    redirectTo="./sign-up"
                    handleLogout={handleLogout}
                >
                </ProtectedRoute>
                <Route path="/sign-in">
                    <Login handleLogin={handleLogin} />
                </Route>
                <Route path="/sign-up">
                    <Register />
                </Route>
                <Route exact path="/">
                    {loggedIn ? <Redirect to="/mesto" /> : <Redirect to="/sign-up" />}
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
