import React from 'react';

export default function Card({ card, onCardClick }) {
    const name = card['name'];
    const link = card['link'];
    const likes = card['likes'].length;

    function handleClick() {
        onCardClick(card);
    }

    return (
        <div className="card">
            <img draggable="false" className="card__image" src={link} alt={name} onClick={handleClick}></img>
            <h2 className="card__title">{name}</h2>
            <button className="card__button card__button_type-like"></button>
            <p className="card__like-counter">{likes}</p>
            <button className="card__button card__button_type-delete"></button>
        </div>
    )
} 