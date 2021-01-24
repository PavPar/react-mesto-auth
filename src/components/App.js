import React, { useEffect } from "react";
import { Route, Switch, Redirect, BrowserRouter, useHistory } from 'react-router-dom';
import Mesto from "./Mesto";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import Api_auth from "../utils/api_auth";


function App() {


    const [userInfo, setUserInfo] = React.useState({});


    function handleLogin({ currentLogin, currentPassword }) {
        changeLoggedIn(true);
        return Api_auth.authUser({
            email: currentLogin,
            password: currentPassword
        })
    }

    function handleRegiser({ currentLogin, currentPassword }) {
        return Api_auth.registerUser({
            email: currentLogin,
            password: currentPassword
        })
    }

    function handleLogout() {
        localStorage.removeItem('jwt')
        changeLoggedIn(false);
    }

    function handleTokenCheck() {
        if (localStorage.getItem('jwt')) {
            const jwt = localStorage.getItem('jwt');

            return Api_auth.checkToken(jwt)
                .then((res) => {
                    setUserInfo({
                        email: res.data.email
                    })
                    // changeLoggedIn(true);
                    return true;
                })
                .catch((err) => {
                    console.log(err);
                    // changeLoggedIn(false);
                    return false;
                });
        }
        return false
    }

    const [loggedIn, changeLoggedIn] = React.useState(() => {
        return handleTokenCheck()
    });

    return (
        <BrowserRouter>
            <Switch>
                <ProtectedRoute
                    loggedIn={loggedIn}
                    path="/mesto"
                    component={Mesto}
                    redirectTo="./sign-up"
                    handleLogout={handleLogout}
                    userInfo={userInfo}
                >
                </ProtectedRoute>
                <Route path="/sign-in">
                    <Login handleLogin={handleLogin} />
                </Route>
                <Route path="/sign-up">
                    <Register handleRegister={handleRegiser} />
                </Route>
                <Route exact path="/">
                    {loggedIn ? <Redirect to="/mesto" /> : <Redirect to="/sign-up" />}
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
