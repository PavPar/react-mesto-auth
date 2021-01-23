import React from "react";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup"
import EditAvatarPopup from "./EditAvatarPopup"
import AddPlacePopup from "./AddPlacePopup"
import api from '../utils/api';
import NavBar from "./NavBar";
import headerLogo from "../images/logo.svg";

import { CurrentUserContext } from '../context/CurrentUserContext';

export default function Mesto({ userInfo, handleLogout }) {
    const [selectedCard, setSelectedCard] = React.useState({});

    const [currentUser, setUserData] = React.useState({});
    const [cards, setCards] = React.useState([]);

    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

    const [isNavBarVisible, setNavBarVisible] = React.useState(false);

    function closeAllPopups() {
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

    function handleAvatarUpdate(newAvatar) {
        api.changeUserAvatar(newAvatar).then((res) => {
            setUserData(res);
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
                setCards(cards);
            })
            .catch((err) => {
                console.log(err);
            })

    }, [])

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            const newCards = cards.map((c) => c._id === card._id ? newCard : c);
            setCards(newCards);
        }).catch((err) => {
            console.log(err);
        })
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id).then(() => {
            const newCards = cards.filter((c) => {
                return c._id !== card._id
            })

            setCards(newCards);
        }).catch((err) => {
            console.log(err);
        })
    }

    function handleCardAdd(сard) {
        api.addNewCard(сard).then((newCard) => {
            setCards([newCard, ...cards]);
            closeAllPopups();
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <>

            <Header src={headerLogo} type="header_type-nav">
                <NavBar
                    isVisible={isNavBarVisible}>
                    <p className="navbar__info">{userInfo.email}</p>
                    <button to="./sign-up" className="navbar__link" onClick={handleLogout}>Выйти</button>
                </NavBar>

                <button
                    className={`header__menu ${isNavBarVisible&&"header__menu_type-close"}`}
                    onClick={() => {
                        setNavBarVisible(!isNavBarVisible)
                    }} />
            </Header>
            <CurrentUserContext.Provider value={currentUser}>
                <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    onCardClick={handleCardClick}
                ></Main>

                <EditProfilePopup
                    onClose={closeAllPopups}
                    isOpen={isEditProfilePopupOpen}
                    onUpdateUser={handleUserUpdate}
                >
                </EditProfilePopup>

                <EditAvatarPopup
                    onClose={closeAllPopups}
                    isOpen={isEditAvatarPopupOpen}
                    onUpdateUrl={handleAvatarUpdate}
                >
                </EditAvatarPopup>

                <AddPlacePopup
                    onClose={closeAllPopups}
                    isOpen={isAddPlacePopupOpen}
                    onCardAdd={handleCardAdd}
                >
                </AddPlacePopup>

            </CurrentUserContext.Provider>

            <Footer></Footer>

            <ImagePopup
                onClose={closeAllPopups}
                isOpen={isImagePopupOpen}
                card={selectedCard}
            ></ImagePopup>

        </>
    );
}
