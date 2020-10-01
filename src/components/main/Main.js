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
        const isLiked = card.likes.some(i => i._id === userData ._id);
        
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
          const newCards = cards.map((c) => c._id === card._id ? newCard : c);
          setCards(newCards);
        });
    } 

    function handleCardDelete(card){
        api.deleteCard(card._id).then(()=>{
            const NewCards = cards.filter((c)=>{
                return c._id !== card._id
            })

            setCards(NewCards);
        })
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
                            <Card 
                            key={card['_id']} 
                            card={card} 
                            onCardClick={onCardClick} 
                            onCardLike={handleCardLike}
                            onCardDelete={handleCardDelete}
                            ></Card>
                        );
                    })
                }
            </section>
        </main>
    );
}

