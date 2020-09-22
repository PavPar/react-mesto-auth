import React from 'react';
import api from '../utils/Api';
import Card from '../card/Card';

export default function Main({ onEditProfile, onAddPlace, onEditAvatar }) {

    const [userName, setUserName] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [userDesc, setUserDesc] = React.useState('');
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([
            api.getUserInfo(),
            api.getInitialCards()
        ])
            .then((values) => {
                const [userData, cards] = values;
                setUserName(userData['name'])
                setUserAvatar(userData['avatar'])
                setUserDesc(userData['about'])
                setCards(cards.slice());
            })
            .catch((err) => {
                console.log(err);
            })

    })

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container">
                    <img className="profile__avatar" src={userAvatar} alt="Аватар"></img>
                    <button className="profile__button profile__button_type_pen" onClick={onEditAvatar}></button>
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
                    cards.map((card,i) => {
                        return(<Card key={i} title={card['name']} image={card['link']}></Card>);
                    })
                }
            </section>
        </main>
    );
}

