class Api_auth {
    constructor(options) {
        this._options = options;
    }

    //Вывод сообщения об ошибке в консоль
    errorMsgHandler({ status, statusText }) {
        console.log('Status : ' + status)
        console.log('MSG : ' + statusText)
    }

    //Произвести обращение к серверу без тела запроса
    _accessServer(method, url,headers=this._options.headers) {
        return fetch(this._options.baseUrl + url, {
            headers: headers,
            method: method
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res);
            })
            .then((result) => {
                return result;
            })
    }

    //Отправка данных на сервер с телом запроса
    _sendDataToServer(method, url,bodyObj, headers=this._options.headers) {
        return fetch(this._options.baseUrl + url, {
            method: method,
            headers: headers,
            body: JSON.stringify(bodyObj)
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject({ status: res.status, msg: res.statusText });
        })
    }

    registerUser({email,password}){
        return this._sendDataToServer("POST","/signup",{email,password})
    }

    authUser({email,password}){
        return this._sendDataToServer("POST","/signin",{email,password})
        .then((data)=>{
            localStorage.setItem('jwt', data.token);
            return data;
        })
    }

    checkToken(token){
        return this._accessServer("GET","/users/me",{
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
        })
    }
}

export default new Api_auth({
    baseUrl: 'https://auth.nomoreparties.co',
    headers: {"Content-Type": "application/json"}
});;