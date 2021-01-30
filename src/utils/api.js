class Api {
    constructor(options) {
        this._options = options;
    }

    //Вывод сообщения об ошибке в консоль
    errorMsgHandler(err) {
        console.log(err)
    }

    //Произвести обращение к серверу без тела запроса
    _accessServer(method, url) {
        return fetch(this._options.baseUrl + url, {
            headers: this._options.headers,
            method: method
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
            .then((result) => {
                return result;
            })
    }

    //Отправка данных на сервер с телом запроса
    _sendDataToServer(method, url, bodyObj) {
        return fetch(this._options.baseUrl + url, {
            method: method,
            headers: this._options.headers,
            body: JSON.stringify(bodyObj)
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject({ status: res.status, msg: res.statusText });
        })
    }

    //Получить массив исходных карточек
    getInitialCards() {
        return this._accessServer("GET", "/cards");
    }

    //Получить информацию о пользователе
    getUserInfo() {
        return this._accessServer("GET", "/users/me");
    }

    //Изменить информацию о пользователе
    changeUserInfo({ name, about }) {
        return this._sendDataToServer("PATCH", "/users/me", {
            name: name,
            about: about
        })
    }

    //Добавить новую карточку на серевер
    addNewCard({ name, link }) {
        return this._sendDataToServer("POST", "/cards", {
            name: name,
            link: link
        })
    }

    //Поставить лайк карточке
    likeCard(cardId) {
        return this._accessServer("PUT", `/cards/likes/` + cardId)
    }

    //Поставить дизлайк карточке
    dislikeCard(cardId) {
        return this._accessServer("DELETE", "/cards/likes/" + cardId)
    }

    changeLikeCardStatus(cardId, liked) {
        return liked ?
            this.likeCard(cardId) :
            this.dislikeCard(cardId)
    }

    //Удалить карточку
    deleteCard(cardId) {
        return this._accessServer("DELETE", "/cards/" + cardId)
    }

    //Изменить аватар пользователя
    changeUserAvatar(newAvatar) {
        return this._sendDataToServer("PATCH", "/users/me/avatar", newAvatar)
    }

    resetToken(){
        this._options.headers.authorization = `Bearer ${localStorage.getItem('jwt')}`
    }
}

export default new Api({
    baseUrl: 'https://api.paramonoff.students.nomoredomains.icu',
    headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
    }
});;