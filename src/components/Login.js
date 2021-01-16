import React from "react";
import Header from "./Header";
import headerLogo from "../images/logo.svg";

export default function Login() {

    return (
        <Header src={headerLogo} >
            <p className="header__link">Войти</p>
        </Header>
    );
}