import React from 'react';

export default function Card({ title, image}) {
    return (
        <div className="card">
            <img draggable="false" className="card__image" src={image} alt={title}></img>
            <h2 className="card__title">{title}</h2>
            <button className="card__button card__button_type-like"></button>
            <p className="card__like-counter"></p>
            <button className="card__button card__button_type-delete"></button>
        </div>
    )
}