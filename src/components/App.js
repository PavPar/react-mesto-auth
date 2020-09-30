import React from "react";
import headerLogo from "../images/logo.svg";
import Header from "./header/Header";
import Main from "./main/Main";
import Footer from "./footer/Footer";
import PopupWithForm from "./popupWithForm/PopupWithForm";
import ImagePopup from "./imagePopup/ImagePopup";
import api from './utils/Api';

import { CurrentUserContext } from '../context/CurrentUserContext';
import { CurrentCardsContext } from '../context/CurrentCardsContext'
function App() {
    const [selectedCard, setSelectedCard] = React.useState({});

    const [currentUser, setUserData] = React.useState({});
    const [currentCards, setCards] = React.useState([]);

    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);


    function closeAllPopups(event) {
        event.preventDefault();
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

    React.useEffect(() => {
        Promise.all([
            api.getUserInfo(),
            api.getInitialCards()
        ])
            .then((values) => {
                const [userData, cards] = values;
                setUserData(userData);
                setCards(cards);
            })
            .catch((err) => {
                console.log(err);
            })

    }, [])

    return (
        <>
            <Header src={headerLogo}></Header>
            <CurrentUserContext.Provider value={currentUser}>
                <CurrentCardsContext.Provider value={currentCards}>
                    <Main
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                    ></Main>
                </CurrentCardsContext.Provider>
            </CurrentUserContext.Provider>

            <Footer></Footer>

            <PopupWithForm
                btnText="Да"
                onClose={closeAllPopups}
                isOpen={false}
                name="confirm"
                title="Вы уверены?"
            ></PopupWithForm>

            <PopupWithForm
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
            ></PopupWithForm>

            <PopupWithForm
                btnText="Сохранить"
                onClose={closeAllPopups}
                isOpen={isEditProfilePopupOpen}
                name="profile"
                title="Редактировать профиль"
                children={(<>
                    <input className="popup__input popup__input-title" id="popup__input-title" type="text" required minLength="2"
                        maxLength="40" name="userName"></input>
                    <label htmlFor="popup__input-title" className="popup__errmsg" id="popup__input-title-errmsg"></label>
                    <input className="popup__input popup__input-subtitle" id="popup__input-subtitle" type="text" required
                        minLength="2" maxLength="200" name="userInfo"></input>
                    <label htmlFor="popup__input-subtitle" className="popup__errmsg" id="popup__input-subtitle-errmsg"></label>
                </>)}
            ></PopupWithForm>

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
