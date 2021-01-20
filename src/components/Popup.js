import React from 'react';


export default function Popup({ name, isOpen, onClose, children, }) {
    function handleClose(e) {
        e.preventDefault();
        onClose();
    }
    
    return (
        <section style={{ visibility: "hidden" }} className={`popup ${!isOpen && 'popup_visibility-hidden'} popup-${name}`}>

            <form noValidate
                className={`popup__window popup_type-${name}`}
                name={`popup__window popup_type-${name}`}>

                {children}

                <button
                    className="popup__button popup__button_type_exit"
                    onClick={handleClose}>
                </button>
            </form>
        </section >
    );
}




/*


<section className="popup popup-avatar popup_visibility-hidden">
<form className="popup__window popup_type-avatar " novalidate name="popup__avatar-form">
    <h2 className="popup__title">Обновить аватар</h2>


    <button className="popup__button popup__button_type_save" type="submit">Сохранить</button>
    <button className="popup__button popup__button_type_exit"></button>
</form>
</section> */
