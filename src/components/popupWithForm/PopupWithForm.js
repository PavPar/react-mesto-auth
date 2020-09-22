import React from 'react';


export default function PopupWithForm({name, title,isOpen,onClose, children}) {


    return (
        <section className= {`popup ${!isOpen && 'popup_visibility-hidden'} popup-${name}`}>
            <form className={`popup__window popup_type-${name}`} noValidate name={`popup__window popup_type-${name}`}>
                <h2 className="popup__title">{title}</h2>


                <button className="popup__button popup__button_type_save" type="submit">Сохранить</button>
                <button className="popup__button popup__button_type_exit" onClick={onClose}></button>
            </form>
        </section>
    );
}




/* 
<section className="popup popup-profile popup_visibility-hidden">
<form className="popup__window" novalidate name="popup__profile-form">
    <h2 className="popup__title">Редактировать профиль</h2>

    <input className="popup__input popup__input-title" id="popup__input-title" type="text" required minlength="2"
        maxlength="40" name="userName"></input>
    <label for="popup__input-title" className="popup__errmsg" id="popup__input-title-errmsg"></label>

    <input className="popup__input popup__input-subtitle" id="popup__input-subtitle" type="text" required
        minlength="2" maxlength="200" name="userInfo"></input>
    <label for="popup__input-subtitle" className="popup__errmsg" id="popup__input-subtitle-errmsg"></label>

    <button className="popup__button popup__button_type_save" type="submit">Сохранить</button>
    <button className="popup__button popup__button_type_exit"></button>
</form>
</section>


<section className="popup popup-card popup_visibility-hidden">
<form className="popup__window" novalidate name="popup__card-form">
    <h2 className="popup__title">Новое место</h2>

    <input className="popup__input popup__input-card-title" id="popup__input-card-title" type="text" required
        placeholder="Название" minlength="2" maxlength="30" name="title"></input>
    <label for="popup__input-card-title" className="popup__errmsg" id="popup__input-card-title-errmsg"></label>

    <input className="popup__input popup__input-card-link" id="popup__input-card-link" type="url" required
        placeholder="Ссылка на изображение" name="src"></input>
    <label for="popup__input-title" className="popup__errmsg" id="popup__input-card-link-errmsg"></label>

    <button className="popup__button popup__button_type_save" type="submit">Создать</button>
    <button className="popup__button popup__button_type_exit"></button>
</form>
</section>



<section className="popup popup-confirm popup_visibility-hidden">
<form className="popup__window popup_type-confirm" novalidate name="popup__confirm-form">
    <h2 className="popup__title popup__title_mod-confirm">Вы уверены?</h2>

    <button className="popup__button popup__button_type_save" type="submit">Да</button>
    <button className="popup__button popup__button_type_exit"></button>
</form>
</section>

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
