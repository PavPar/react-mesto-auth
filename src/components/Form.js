import React from 'react';

export default function Form({ title, onSubmit, btnText,isButtonActive=true, children }) {
    return (

        <form noValidate className={`form`}>
            <h2 className="form__title">{title}</h2>

            {children}

            <button
                className={`form__submit ${!isButtonActive&&'form__submit_state-disabled'}`}
                type="submit"
                disabled={!isButtonActive}
                onClick={onSubmit}>
                {btnText}
            </button>

        </form>
    );
}
