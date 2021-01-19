import React, { useEffect } from "react";
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
                <p className="header__link">Регистрация</p>
            </Header>
            <section className="auth">
                <Form
                    name="card"

                    title="Новое место"
                    btnText="Добавить"
                    onSubmit={(event) => {
                        event.preventDefault();
                        setFormValidity(!inputValidity.some((input) => !input));
                        if(!isFormValid){
                            return
                        }
                        setStatusPopupOpen(true);
                    }}
                    isButtonActive={true}
                >
                    <ValidationField
                        id="form__input-card-title"
                        type="text"
                        placeholder="Название"
                        name="title"
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
                        required={true}
                        id="form__input-card-link"
                        type="url"
                        placeholder="Ссылка на изображение"
                        name="src"
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
                <p className="auth__text">Уже зарегистрированы? Войти</p>
            </section>

        </>
    );
}