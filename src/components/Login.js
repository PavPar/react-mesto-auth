/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import ReactTestUtils from 'react-dom/test-utils';
import { Link, withRouter } from "react-router-dom";
import { useHistory } from "react-router";

import Header from "./Header";
import InfoTooltip from "./InfoTooltip";
import ValidationField from './ValidationField';
import Form from './Form';

import Api_auth from "../utils/api_auth";

import headerLogo from "../images/logo.svg";

function Login({ handleLogin }) {
    const statusErrMsg = {
        400: "Данные не введены",
        401: "Неправильный Email/пароль"
    }
    const [isFormValid, setFormValidity] = React.useState(false);
    const [isLoginValid, setLoginValidity] = React.useState(false);
    const [isPasswordValid, setPasswordValidity] = React.useState(false);

    const [currentLogin, setLogin] = React.useState('');
    const [currentPassword, setPassword] = React.useState('');

    const inputValidity = [
        isLoginValid, isPasswordValid
    ]

    const emailRef = useRef()
    const passwordRef = useRef()

    const [StatusPopupOpen, setStatusPopupOpen] = React.useState(false);

    function closeAllPopups() {
        setStatusPopupOpen(false);
    }

    const [popupMsg, setPopupMsg] = React.useState('');

    useEffect(() => {
        setFormValidity(!inputValidity.some((input) => !input));

    }, [inputValidity])

    const history = useHistory();
    const [isReadyForSubmit, setReadyForSubmit] = React.useState(false)

    useEffect(() => {
        setReadyForSubmit(false)
        if (!isFormValid) {
            return
        }
        handleLogin({ currentLogin, currentPassword })
        .then((res) => {
            history.push('/')
        })
            .catch((err) => {
                console.log(err)
                setPopupMsg(statusErrMsg[err.status] || "Возникла неизвестная ошибка")
                setStatusPopupOpen(true)
            })
    }, [isReadyForSubmit])

    return (
        <>
            <Header src={headerLogo} >
                <Link to="./sign-up" className="header__link">Регистрация</Link>
            </Header>
            <section className="auth">
                <Form
                    title="Вход"
                    btnText="Войти"
                    onSubmit={(event) => {
                        event.preventDefault();
                        ReactTestUtils.Simulate.change(emailRef.current);
                        ReactTestUtils.Simulate.change(passwordRef.current);
                        setReadyForSubmit(true);
                    }}
                    isButtonActive={true}
                >
                    <ValidationField
                        id="user_auth_email"
                        type="email"
                        placeholder="Email"
                        name="email"
                        minLength="2"
                        maxLength="30"
                        required={true}
                        onValidityChange={
                            (state) => {
                                setLoginValidity(state.valid);
                                setLogin(state.value);
                            }
                        }
                        // displayValidity={false}
                        input={emailRef}
                    />
                    <ValidationField
                        id="user_auth_password"
                        type="password"
                        placeholder="Пароль"
                        name="password"
                        required={true}
                        onValidityChange={
                            (state) => {
                                setPasswordValidity(state.valid);
                                setPassword(state.value);
                            }
                        }
                        // displayValidity={false}
                        input={passwordRef}
                    />

                </Form>
                <InfoTooltip
                    onClose={closeAllPopups}
                    isOpen={StatusPopupOpen}
                    isOk={false}
                    msgText={popupMsg}
                />
            </section>

        </>
    );
}

export default withRouter(Login)
