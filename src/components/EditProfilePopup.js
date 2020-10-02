import React from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../context/CurrentUserContext'

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState('');
    const [desc, setDesc] = React.useState('');

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescChange(e) {
        setDesc(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();

        onUpdateUser({
            name,
            about:desc
        })
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDesc(currentUser.about);
    }, [currentUser])

    return (
        <PopupWithForm
            btnText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            name="profile"
            title="Редактировать профиль"
            children={(<>
                <input
                    required
                    name="userName"
                    className="popup__input popup__input-title"
                    id="popup__input-title"
                    type="text"
                    minLength="2"
                    maxLength="40"
                    onChange={handleNameChange}
                    value={name || ''}
                ></input>

                <label htmlFor="popup__input-title"
                    className="popup__errmsg"
                    id="popup__input-title-errmsg"
                ></label>

                <input
                    name="userInfo"
                    required
                    className="popup__input popup__input-subtitle"
                    id="popup__input-subtitle"
                    type="text"
                    minLength="2"
                    maxLength="200"
                    onChange={handleDescChange}
                    value={desc || ''}
                ></input>

                <label
                    htmlFor="popup__input-subtitle"
                    className="popup__errmsg"
                    id="popup__input-subtitle-errmsg"
                ></label>

            </>)}
        ></PopupWithForm>

    )
}