import React from 'react';

export default function Form({ title, onSubmit, btnText, children }) {

    return (

        <form noValidate className={`form`}>
            <h2 className="form__title">{title}</h2>

            {children}

            <button
                className="form__submit"
                type="submit"
                onClick={onSubmit}>
                {btnText}
            </button>

        </form>
    );
}
