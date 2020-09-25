import React from "react";
import headerLogo from "../images/logo.svg";
import Header from "./header/Header";
import Main from "./main/Main";
import Footer from "./footer/Footer";
import PopupWithForm from "./popupWithForm/PopupWithForm";
import ImagePopup from "./imagePopup/ImagePopup";

function App() {
    const [selectedCard, setSelectedCard] = React.useState({});
    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
        false
    );
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
        false
    );
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

    return (
        <>
            <Header src={headerLogo}></Header>

            <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
            ></Main>

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
                    <label for="popup__input-title" className="popup__errmsg" id="popup__input-avatar-link-errmsg"></label>
                </>)}
            ></PopupWithForm>

            <PopupWithForm
                btnText="Сохранить"
                onClose={closeAllPopups}
                isOpen={isEditProfilePopupOpen}
                name="profile"
                title="Редактировать профиль"
                children={(<>
                    <input className="popup__input popup__input-title" id="popup__input-title" type="text" required minlength="2"
                        maxlength="40" name="userName"></input>
                    <label for="popup__input-title" className="popup__errmsg" id="popup__input-title-errmsg"></label>
                    <input className="popup__input popup__input-subtitle" id="popup__input-subtitle" type="text" required
                        minlength="2" maxlength="200" name="userInfo"></input>
                    <label for="popup__input-subtitle" className="popup__errmsg" id="popup__input-subtitle-errmsg"></label>
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
                        placeholder="Название" minlength="2" maxlength="30" name="title"></input>
                    <label for="popup__input-card-title" className="popup__errmsg" id="popup__input-card-title-errmsg"></label>

                    <input className="popup__input popup__input-card-link" id="popup__input-card-link" type="url" required
                        placeholder="Ссылка на изображение" name="src"></input>
                    <label for="popup__input-title" className="popup__errmsg" id="popup__input-card-link-errmsg"></label>
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
