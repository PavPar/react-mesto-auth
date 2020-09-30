import React from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext';


export default function Card({ card, onCardClick }) {
    const currentUser = React.useContext(CurrentUserContext);

    const name = card['name'];
    const link = card['link'];
    const likes = card['likes'].length;

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `card__button card__button_type-delete ${!isOwn && 'card__button_state-invisible'}`
    );

    function handleClick() {
        onCardClick(card);
    }

    return (
        <div className="card">
            <img draggable="false" className="card__image" src={link} alt={name} onClick={handleClick}></img>
            <h2 className="card__title">{name}</h2>
            <button className="card__button card__button_type-like"></button>
            <p className="card__like-counter">{likes}</p>
            <button className={cardDeleteButtonClassName}></button>
        </div>
    )
} 