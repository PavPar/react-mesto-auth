import React from 'react';

export default function Main(props){
    return(
        <main className="content">
        <section className="profile">
            <div className="profile__avatar-container">
                <img className="profile__avatar" src="./images/avatar.png" alt="Аватар"></img>
                <button className="profile__button profile__button_type_pen"></button>
            </div>
            <div className="profile__info">
                <h2 className="profile__title">Жак-Ив Кусто</h2>
                <p className="profile__subtitle">Исследователь океана</p>
                <button className="profile__button profile__button_type_edit"></button>
            </div>
            <button className="profile__button profile__button_type_add"></button>
        </section>
        <section className="cards"></section>
    </main>
    );
}