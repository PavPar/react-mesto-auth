import React,{useEffect} from "react";
import {Link } from 'react-router-dom';
import Header from "./Header";
import headerLogo from "../images/logo.svg";

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

    const inputValidity = [
        isLoginValid, isPasswordValid
    ]

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
                            return
                        }
                        setStatusPopupOpen(true);
                    }}
                    isButtonActive={true}
                >
                    <ValidationField
                        id="form__input-card-title"
                        type="text"
                        placeholder="Email"
                        name="email"
                        minLength="2"
                        maxLength="30"
                        required={true}
                        onValidityChange={
                            (state) => {
                                setLoginValidity(state.valid)
                            }
                        }
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
                            }
                        }
                    />

                </Form>
                <InfoTooltip
                    onClose={closeAllPopups}
                    isOpen={StatusPopupOpen}
                    isOk={isFormValid}
                    okMsg={'Вы успешно зарегистрировались!'}
                    errMsg={'Что-то пошло не так! Попробуйте ещё раз.'}
                />
                <Link to="/sign-in" className="auth__text">Уже зарегистрированы? Войти</Link>
            </section>

        </>
    );
}