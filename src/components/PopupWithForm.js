import React from 'react';


export default function PopupWithForm({ name, title, isOpen, onClose,btnText, children }) {


    return (
        <section className={`popup ${!isOpen && 'popup_visibility-hidden'} popup-${name}`}>
            <form className={`popup__window popup_type-${name}`} noValidate name={`popup__window popup_type-${name}`}>
                <h2 className="popup__title">{title}</h2>
                {children}
    <button className="popup__button popup__button_type_save" type="submit">{btnText}</button>
                <button className="popup__button popup__button_type_exit" onClick={onClose}></button>
            </form>
        </section>
    );
}




/*


<section className="popup popup-avatar popup_visibility-hidden">
<form className="popup__window popup_type-avatar " novalidate name="popup__avatar-form">
    <h2 className="popup__title">Обновить аватар</h2>

    
    <button className="popup__button popup__button_type_save" type="submit">Сохранить</button>
    <button className="popup__button popup__button_type_exit"></button>
</form>
</section> */
