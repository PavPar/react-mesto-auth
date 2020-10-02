import React from "react";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup"

import api from '../utils/Api';


import headerLogo from "../images/logo.svg";


import { CurrentUserContext } from '../context/CurrentUserContext';
function App() {
    const [selectedCard, setSelectedCard] = React.useState({});

    const [currentUser, setUserData] = React.useState({});


    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);


    function closeAllPopups() {
        // event.preventDefault();
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsImagePopupOpen(false);
    }

    function handleEditAvatarClick(event) {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick(event) {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick(event) {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(cardData) {
        setSelectedCard(cardData);
        setIsImagePopupOpen(true);
    }

    function handleUserUpdate(newUserData) {
        api.changeUserInfo(newUserData).then((res) => {
            setUserData(res)
            closeAllPopups();
        })
    }

    React.useEffect(() => {
        Promise.all([
            api.getUserInfo(),
            api.getInitialCards()
        ])
            .then((values) => {
                const [userData, cards] = values;
                setUserData(userData);
                // setCards(cards);
            })
            .catch((err) => {
                console.log(err);
            })

    }, [])

    return (
        <>
            <Header src={headerLogo}></Header>
            <CurrentUserContext.Provider value={currentUser}>
                <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                ></Main>

                <EditProfilePopup
                    onClose={closeAllPopups}
                    isOpen={isEditProfilePopupOpen}
                    onUpdateUser={handleUserUpdate}
                >
                </EditProfilePopup>

            </CurrentUserContext.Provider>

            <Footer></Footer>

            <PopupWithForm
                btnText="Да"
                onClose={closeAllPopups}
                isOpen={false}
                name="confirm"
                title="Вы уверены?"
            ></PopupWithForm>


            {/* <PopupWithForm
                btnText="Обновить"
                onClose={closeAllPopups}
                isOpen={isEditAvatarPopupOpen}
                name="avatar"
                title="Обновить аватар"
                children={(<>
                    <input className="popup__input popup__input-avatar-link" id="popup__input-avatar-link" type="url" required
                        placeholder="Ссылка на изображение" name="src"></input>
                    <label htmlFor="popup__input-title" className="popup__errmsg" id="popup__input-avatar-link-errmsg"></label>
                </>)}
            ></PopupWithForm> */}
            {/* 
            <PopupWithForm
                name="avatar"
                btnText="Обновить"
                onClose={onClose}
                isOpen={isOpen}
                title="Обновить аватар"
                children={(<>
                    <input
                        required
                        className="popup__input popup__input-avatar-link"
                        id="popup__input-avatar-link"
                        type="url"
                        placeholder="Ссылка на изображение"
                        name="src"
                        onChange
                    ></input>
                    <label
                        htmlFor="popup__input-title"
                        className="popup__errmsg"
                        id="popup__input-avatar-link-errmsg"
                    ></label>
                </>)}
            ></PopupWithForm> */}

            <PopupWithForm
                btnText="Добавить"
                onClose={closeAllPopups}
                isOpen={isAddPlacePopupOpen}
                name="card"
                title="Новое место"
                children={(<>
                    <input className="popup__input popup__input-card-title" id="popup__input-card-title" type="text" required
                        placeholder="Название" minLength="2" maxLength="30" name="title"></input>
                    <label htmlFor="popup__input-card-title" className="popup__errmsg" id="popup__input-card-title-errmsg"></label>

                    <input className="popup__input popup__input-card-link" id="popup__input-card-link" type="url" required
                        placeholder="Ссылка на изображение" name="src"></input>
                    <label htmlFor="popup__input-title" className="popup__errmsg" id="popup__input-card-link-errmsg"></label>
                </>)}
            ></PopupWithForm>

            <ImagePopup
                onClose={closeAllPopups}
                isOpen={isImagePopupOpen}
                card={selectedCard}
            ></ImagePopup>
        </>
    );
}

export default App;
