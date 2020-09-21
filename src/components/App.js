import React from 'react';
import headerLogo from '../images/logo.svg';
import Header from './header/Header';
import Main from './main/Main';
import Footer from './footer/Footer';
import PopupWithForm from './popupWithForm/PopupWithForm';
import ImagePopup from './imagePopup/ImagePopup';
import Api from './utils/Api';

function App() {

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

    function closeAllPopups(event) {
        event.preventDefault();
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
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

    return (
        <>
            <Header src={headerLogo}></Header>
            
            <Main 
            onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick} 
            onEditAvatar={handleEditAvatarClick}
            userName={}
            userDescription={}
            userAvatar={}
            >

            </Main>
            <Footer></Footer>

            <PopupWithForm onClose={closeAllPopups} isOpen={false} name="confirm" title="Вы уверены?"></PopupWithForm>
            <PopupWithForm onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen} name="avatar" title="Обновить аватар"></PopupWithForm>
            <PopupWithForm onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} name="profile" title="Редактировать профиль"></PopupWithForm>
            <PopupWithForm onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} name="card" title="Новое место"></PopupWithForm>
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
