import React from "react";
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Mesto from "./Mesto";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import ApiAuth from "../utils/apiAuth";


function App(props) {
    const history = useHistory();
    const [userInfo, setUserInfo] = React.useState({});

    function handleLogin({ currentLogin, currentPassword }) {
        changeLoggedIn(true);
        return ApiAuth.authUser({
            email: currentLogin,
            password: currentPassword
        })
    }

    function handleRegiser({ currentLogin, currentPassword }) {
        return ApiAuth.registerUser({
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

            return ApiAuth.checkToken(jwt)
                .then((res) => {
                    setUserInfo({
                        email: res.data.email
                    })
                    history.push('/')
                    return true;
                })
                .catch((err) => {
                    console.log(err);
                    return false;
                });
        }
        return false
    }

    const [loggedIn, changeLoggedIn] = React.useState(() => {
        return handleTokenCheck()
    });

    return (
        <Switch>
            <Route path="/sign-in">
                <Login handleLogin={handleLogin} />
            </Route>
            <Route path="/sign-up">
                <Register handleRegister={handleRegiser} />
            </Route>
            <ProtectedRoute
                loggedIn={loggedIn}
                path="/"
                component={Mesto}
                redirectTo="./sign-up"
                handleLogout={handleLogout}
                userInfo={userInfo}
            >
            </ProtectedRoute>
        </Switch>
    );
}

export default App;
