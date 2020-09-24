import React from 'react';


export default function ImagePopup({ card, isOpen, onClose }) {


    return (
        <section className={`popup popup_type-imgZoom ${!isOpen && 'popup_visibility-hidden'}`}>
            <div className="popup__container">
                <img className="popup__image" alt={card['name']} src={card['link']}></img>
                <button className="popup__button popup__button_type_exit" onClick={onClose}></button>
                <h2 className="popup__subtitle">{card['name']}</h2>
            </div>
        </section>
    );
}



