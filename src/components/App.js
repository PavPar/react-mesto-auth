import React from 'react';
import headerLogo from '../images/logo.svg';
import Header from './header/Header';
import Main from './main/Main';
import Footer from './footer/Footer';
import PopupWithForm from './popupWithForm/PopupWithForm';
import ImagePopup from './imagePopup/ImagePopup';

function App() {
    // function setPopupVisible(popupSelector) {
    //     const popup = document.querySelector(popupSelector);
    //     popup.classList.remove('popup_visibility-hidden');
    // }
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    


    function handleEditAvatarClick(event) {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick(event) {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick(event) {
        setIsAddPlacePopupOpen(true);
    }

    return (
        <>
            <Header src={headerLogo}></Header>
            <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} ></Main>
            <Footer></Footer>

            {/* <PopupWithForm name="confirm" title="Вы уверены?"></PopupWithForm> */}
            {isEditProfilePopupOpen && <PopupWithForm name="profile" title="Редактировать профиль"></PopupWithForm>}
            {isAddPlacePopupOpen && <PopupWithForm name="card" title="Новое место"></PopupWithForm>}
            {isEditAvatarPopupOpen && <PopupWithForm name="avatar" title="Обновить аватар"></PopupWithForm>}
            <ImagePopup></ImagePopup>



            <template id="card-template">
                <div className="card">
                    <img draggable="false" className="card__image"></img>
                    <h2 className="card__title"></h2>
                    <button className="card__button card__button_type-like"></button>
                    <p className="card__like-counter"></p>
                    <button className="card__button card__button_type-delete"></button>
                </div>
            </template>
        </>
    );
}

export default App;
