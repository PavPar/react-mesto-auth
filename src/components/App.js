import React from 'react';
import headerLogo from '../images/logo.svg';
import Header from './header/Header';
import Main from './main/Main';
import Footer from './footer/Footer';
import PopupWithForm from './popupWithForm/PopupWithForm';
import ImagePopup from './imagePopup/ImagePopup';

function App() {

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

            <PopupWithForm isOpen={false} name="confirm" title="Вы уверены?"></PopupWithForm>
            <PopupWithForm isOpen={isEditAvatarPopupOpen} name="avatar" title="Обновить аватар"></PopupWithForm>
            <PopupWithForm isOpen={isEditProfilePopupOpen} name="profile" title="Редактировать профиль"></PopupWithForm>
            <PopupWithForm isOpen={isAddPlacePopupOpen} name="card" title="Новое место"></PopupWithForm>
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
