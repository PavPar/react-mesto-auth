import React from "react";
import Header from "./Header";
import headerLogo from "../images/logo.svg";
import errLogo from "../images/err.svg";
import sucLogo from "../images/suc.svg";

import Form from './Form';
import ValidationField from './ValidationField';
import Popup from './Popup';

export default function Register() {
    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);

    function closeAllPopups() {
        setIsImagePopupOpen(false);
    }

    const loginSuccsess = {
        name: 'test',
        link: 'test'
    }
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
                        setIsImagePopupOpen(true);
                    }}

                >
                    <ValidationField
                        id="form__input-card-title"
                        type="text"
                        placeholder="Название"
                        name="title"
                        minLength="2"
                        maxLength="30"
                        required={true}
                    />
                    <ValidationField
                        required={true}
                        id="form__input-card-link"
                        type="url"
                        placeholder="Ссылка на изображение"
                        name="src"
                    />

                </Form>
                <p className="auth__text">Уже зарегистрированы? Войти</p>
            </section>

            <Popup
                onClose={closeAllPopups}
                isOpen={isImagePopupOpen}
                name={'message'}
            >
                <img className="popup__image" src={sucLogo} alt="fuck"></img>
                <h2 className="popup__title">{"Все путем!"}</h2>
            </Popup>
        </>
    );
}