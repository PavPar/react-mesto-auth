import React from 'react';
import Card from '../card/Card';

import { CurrentUserContext } from '../../context/CurrentUserContext';
import { CurrentCardsContext } from '../../context/CurrentCardsContext';


export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

    const userData = React.useContext(CurrentUserContext);
    const cards = React.useContext(CurrentCardsContext);

    const userName = userData['name'];
    const userAvatar = userData['avatar'];
    const userDesc = userData['about'];

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container" onClick={onEditAvatar}>
                    <img className="profile__avatar" src={userAvatar} alt="Аватар"></img>
                    <button className="profile__button profile__button_type_pen" ></button>
                </div>
                <div className="profile__info">
                    <h2 className="profile__title">{userName}</h2>
                    <p className="profile__subtitle">{userDesc}</p>
                    <button className="profile__button profile__button_type_edit" onClick={onEditProfile}></button>
                </div>
                <button className="profile__button profile__button_type_add" onClick={onAddPlace}></button>
            </section>
            <section className="cards">
                {
                    cards.map((card) => {
                        return (<Card key={card['_id']} card={card} onCardClick={onCardClick}></Card>);
                    })
                }
            </section>
        </main>
    );
}

