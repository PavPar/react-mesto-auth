import React from 'react';

export default function Main({ onEditProfile, onAddPlace, onEditAvatar }) {

   

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container">
                    <img className="profile__avatar" src="./images/avatar.png" alt="Аватар"></img>
                    <button className="profile__button profile__button_type_pen" onClick={onEditAvatar}></button>
                </div>
                <div className="profile__info">
                    <h2 className="profile__title">Жак-Ив Кусто</h2>
                    <p className="profile__subtitle">Исследователь океана</p>
                    <button className="profile__button profile__button_type_edit" onClick={onEditProfile}></button>
                </div>
                <button className="profile__button profile__button_type_add" onClick={onAddPlace}></button>
            </section>
            <section className="cards"></section>
        </main>
    );
}

