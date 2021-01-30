/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import ReactTestUtils from 'react-dom/test-utils';
import { Link, withRouter } from 'react-router-dom';
import Header from "./Header";
import headerLogo from "../images/logo.svg";

import Form from './Form';
import ValidationField from './ValidationField';
import InfoTooltip from './InfoTooltip';

function Register({handleRegister}) {
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

    const [isReadyForSubmit, setReadyForSubmit] = React.useState(false)

    useEffect(() => {
        setReadyForSubmit(false)
        if (!isFormValid) {
            return
        }
        handleRegister({currentLogin,currentPassword})
            .then((res) => {
                setAuthStatus(true);

            })
            .then(() => {
                setStatusPopupOpen(true);
            })
            .catch((res) => {
                setAuthStatus(false);
                setStatusPopupOpen(true);
                return res
            })
        setFormValidity(false)

    }, [isReadyForSubmit])

    return (
        <>
            <Header src={headerLogo} >
                <Link to="./sign-in" className="header__link">Войти</Link>
            </Header>
            <section className="auth">
                <Form
                    title="Регистрация"
                    btnText="Зарегестрироваться"
                    onSubmit={(event) => {
                        event.preventDefault();
                        console.log('submit called')
                        ReactTestUtils.Simulate.change(emailRef.current);
                        ReactTestUtils.Simulate.change(passwordRef.current);

                        if (!inputValidity.some((input) => !input)) {
                            setFormValidity(true)
                            setReadyForSubmit(true)
                        }else{
                        }
                            


                    }}
                    isButtonActive={true}
                >
                    <ValidationField
                        id="user_register_email"
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
                        id="user_register_password"
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

export default withRouter(Register)