import React, { useEffect, useRef } from "react";
import ReactTestUtils from 'react-dom/test-utils';
import { Link } from 'react-router-dom';
import Header from "./Header";
import headerLogo from "../images/logo.svg";
import App_auth from "../utils/Api_auth"

import Form from './Form';
import ValidationField from './ValidationField';
import InfoTooltip from './InfoTooltip';

export default function Register() {
    const [StatusPopupOpen, setStatusPopupOpen] = React.useState(false);

    function closeAllPopups() {
        setStatusPopupOpen(false);
    }

    const [isFormValid, setFormValidity] = React.useState(false);
    const [isLoginValid, setLoginValidity] = React.useState(false);
    const [isPasswordValid, setPasswordValidity] = React.useState(false);

    const [currentLogin, setLogin] = React.useState('');
    const [currentPassword, setPassword] = React.useState('');

    const [isAuthOk, setAuthStatus] = React.useState(false);

    const inputValidity = [
        isLoginValid, isPasswordValid
    ]

    const emailRef = useRef()
    const passwordRef = useRef()

    useEffect(() => {
        setFormValidity(!inputValidity.some((input) => !input));

    }, [inputValidity])

    return (
        <>
            <Header src={headerLogo} >
                <Link to="./sign-in" className="header__link">Войти</Link>
            </Header>
            <section className="auth">
                <Form
                    name="card"

                    title="Регистрация"
                    btnText="Зарегестрироваться"
                    onSubmit={(event) => {
                        event.preventDefault();

                        setFormValidity(!inputValidity.some((input) => !input));
                        if (!isFormValid) {
                            console.log('bad')

                            ReactTestUtils.Simulate.change(emailRef.current);
                            ReactTestUtils.Simulate.change(passwordRef.current);
                            return
                        }

                        App_auth.registerUser({
                            email: currentLogin,
                            password: currentPassword
                        }).then((res) => {
                            console.log(res);
                            setAuthStatus(true);
                            setStatusPopupOpen(true);
                        }).catch((res) => {
                            console.log(res)
                            setAuthStatus(false);
                            setStatusPopupOpen(true);
                        })
                    }}
                    isButtonActive={true}
                >
                    <ValidationField
                        id="form__input-card-title"
                        type="email"
                        placeholder="Email"
                        name="email"
                        minLength="2"
                        maxLength="30"
                        required={true}
                        onValidityChange={
                            (state) => {
                                setLoginValidity(state.valid)
                                setLogin(state.value)
                            }
                        }
                        input={emailRef}
                    />
                    <ValidationField
                        id="form__input-card-title"
                        type="password"
                        placeholder="Пароль"
                        name="password"
                        required={true}
                        onValidityChange={
                            (state) => {
                                setPasswordValidity(state.valid)
                                setPassword(state.value)
                            }
                        }
                        input={passwordRef}
                    />

                </Form>
                <InfoTooltip
                    onClose={closeAllPopups}
                    isOpen={StatusPopupOpen}
                    isOk={isAuthOk}
                    msgText={isAuthOk ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
                />
                <Link to="/sign-in" className="auth__text">Уже зарегистрированы? Войти</Link>
            </section>

        </>
    );
}