import React from 'react';
import api from '../utils/Api';

export default function Main({ onEditProfile, onAddPlace, onEditAvatar }) {

    const [userName, setUserName] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [userDesc, setUserDesc] = React.useState('');

    React.useEffect(() => {
        api.getUserInfo()
            .then((values) => {
                const userData = values;
                setUserName(userData['name'])
                setUserAvatar(userData['avatar'])
                setUserDesc(userData['about'])
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
            <section className="cards"></section>
        </main>
    );
}

