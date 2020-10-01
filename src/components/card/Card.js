import React from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext';


export default function Card({ card, onCardClick, onCardLike}) {
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

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = `card__button card__button_type-like ${isLiked && 'card__button_state-selected'}`;

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick(){
        onCardLike(card)
    }

    return (
        <div className="card">
            <img draggable="false" className="card__image" src={link} alt={name} onClick={handleClick}></img>
            <h2 className="card__title">{name}</h2>
            <button className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
            <p className="card__like-counter">{likes}</p>
            <button className={cardDeleteButtonClassName}></button>
        </div>
    )
} 