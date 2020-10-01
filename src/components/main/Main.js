import React from 'react';
import Card from '../card/Card';

import { CurrentUserContext } from '../../context/CurrentUserContext';
import api from '../utils/Api';


export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

    const userData = React.useContext(CurrentUserContext);
    const [cards, setCards] = React.useState([]);

    const userName = userData['name'];
    const userAvatar = userData['avatar'];
    const userDesc = userData['about'];

    React.useEffect(() => {
        Promise.all([
            api.getUserInfo(),
            api.getInitialCards()
        ])
            .then((values) => {
                const [userData, cards] = values;
                // setUserData(userData);
                setCards(cards);
            })
            .catch((err) => {
                console.log(err);
            })

    }, [])


    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === userData ._id);
        
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
          const newCards = cards.map((c) => c._id === card._id ? newCard : c);
          // Обновляем стейт
          setCards(newCards);
        });
    } 

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container" onClick={onEditAvatar}>
                    <img className="profile__avatar" src={userAvatar} alt="Аватар"></img>
                    <button className="profile__button profile__button_type_pen" ></button>
                </div>
                <div className="profile__info">
                    <h2 className="profile__title">{userName}</h2>
                    <p className="profile__subtitle">{userDesc}</p>
                    <button className="profile__button profile__button_type_edit" onClick={onEditProfile}></button>
                </div>
                <button className="profile__button profile__button_type_add" onClick={onAddPlace}></button>
            </section>
            <section className="cards">
                {
                    cards.map((card) => {
                        return (
                            <Card key={card['_id']} card={card} onCardClick={onCardClick} onCardLike={handleCardLike}></Card>
                        );
                    })
                }
            </section>
        </main>
    );
}

