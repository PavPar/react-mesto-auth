import React from 'react';


export default function ImagePopup(props) {


    return (
        <section className="popup popup_type-imgZoom popup_visibility-hidden">
            <div className="popup__container">
                <img className="popup__image"></img>
                <button className="popup__button popup__button_type_exit"></button>
                <h2 className="popup__subtitle"></h2>
            </div>
        </section>
    );
}



