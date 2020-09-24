import React from 'react';
import headerLogo from '../images/logo.svg';
import Header from './header/Header';
import Main from './main/Main';
import Footer from './footer/Footer';
import PopupWithForm from './popupWithForm/PopupWithForm';
import ImagePopup from './imagePopup/ImagePopup';

function App() {
    const [selectedCard, setSelectedCard] = React.useState({})
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

    return (
        <>
            <Header src={headerLogo}></Header>

            <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
            >

            </Main>
            <Footer></Footer>

            <PopupWithForm onClose={closeAllPopups} isOpen={false} name="confirm" title="Вы уверены?"></PopupWithForm>
            <PopupWithForm onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen} name="avatar" title="Обновить аватар"></PopupWithForm>
            <PopupWithForm onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} name="profile" title="Редактировать профиль"></PopupWithForm>
            <PopupWithForm onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} name="card" title="Новое место"></PopupWithForm>
            <ImagePopup onClose={closeAllPopups} isOpen={isImagePopupOpen} card={selectedCard}></ImagePopup>

        </>
    );
}

export default App;
