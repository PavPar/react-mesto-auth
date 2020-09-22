import React from 'react';


export default function ImagePopup({image,subtitle}) {


    return (
        <section className="popup popup_type-imgZoom popup_visibility-hidden">
            <div className="popup__container">
                <img className="popup__image" alt={subtitle} src={image}></img>
                <button className="popup__button popup__button_type_exit"></button>
                <h2 className="popup__subtitle">{subtitle}</h2>
            </div>
        </section>
    );
}



