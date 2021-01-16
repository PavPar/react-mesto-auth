import React from 'react';

export default function Header(props) {
    return (
        <header className="header">
            <img className="header__logo" src={props.src} alt="Лого"></img>
            {props.children}
        </header>
    );
}