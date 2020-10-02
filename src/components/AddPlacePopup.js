import React from 'react'
import PopupWithForm from './PopupWithForm'

export default function EditAvatarPopup({ isOpen, onClose, onCardAdd }) {
    const nameInptRef = React.useRef("");
    const linkInptRef = React.useRef("");

    function handleSubmit(e) {
        e.preventDefault();

        onCardAdd({
            name: nameInptRef.current.value,
            link: linkInptRef.current.value
        })

        nameInptRef.current.value = '';
        linkInptRef.current.value = '';
    }


    return (
        <PopupWithForm
            name="card"
            onClose={onClose}
            isOpen={isOpen}
            title="Новое место"
            btnText="Добавить"
            onSubmit={handleSubmit}
            children={(<>
                <input
                    required
                    className="popup__input popup__input-card-title"
                    id="popup__input-card-title"
                    type="text"
                    placeholder="Название"
                    minLength="2"
                    maxLength="30"
                    name="title"
                    ref={nameInptRef}>
                </input>

                <label
                    htmlFor="popup__input-card-title"
                    className="popup__errmsg"
                    id="popup__input-card-title-errmsg">
                </label>

                <input
                    required
                    className="popup__input popup__input-card-link"
                    id="popup__input-card-link"
                    type="url"
                    placeholder="Ссылка на изображение"
                    name="src"
                    ref={linkInptRef}>
                </input>

                <label
                    htmlFor="popup__input-title"
                    className="popup__errmsg"
                    id="popup__input-card-link-errmsg">
                </label>

            </>)}
        ></PopupWithForm>
    )
}