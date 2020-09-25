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

    <input className="popup__input popup__input-avatar-link" id="popup__input-avatar-link" type="url" required
        placeholder="Ссылка на изображение" name="src"></input>
    <label for="popup__input-title" className="popup__errmsg" id="popup__input-avatar-link-errmsg"></label>

    <button className="popup__button popup__button_type_save" type="submit">Сохранить</button>
    <button className="popup__button popup__button_type_exit"></button>
</form>
</section> */
