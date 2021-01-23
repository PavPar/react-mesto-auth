import React from 'react'
import PopupWithForm from './PopupWithForm'

export default function EditAvatarPopup({ isOpen, onClose, onUpdateUrl }) {
    const inputRef = React.useRef("");

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUrl({
            avatar: inputRef.current.value
        });
        inputRef.current.value='';
    }

    return (
        <PopupWithForm
            name="avatar"
            btnText="Обновить"
            onClose={onClose}
            isOpen={isOpen}
            onSubmit={handleSubmit}
            title="Обновить аватар"
            children={(<>
                <input
                    required
                    className="popup__input popup__input-avatar-link"
                    id="popup__input-avatar-link"
                    type="url"
                    placeholder="Ссылка на изображение"
                    name="src"
                    ref={inputRef}
                ></input>
                <label
                    htmlFor="popup__input-title"
                    className="popup__errmsg"
                    id="popup__input-avatar-link"
                ></label>
            </>)}
        ></PopupWithForm>
    )
}