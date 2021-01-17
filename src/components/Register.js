import React from "react";
import Header from "./Header";
import headerLogo from "../images/logo.svg";
import Form from './Form';
import ValidationField from './ValidationField';

export default function Register() {

    return (
        <>
            <Header src={headerLogo} >
                <p className="header__link">Регистрация</p>
            </Header>

            <Form
                name="card"

                title="Новое место"
                btnText="Добавить"
                onSubmit={() => {

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
        </>
    );
}