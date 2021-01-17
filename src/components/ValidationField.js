import React from "react";

export default function ValidationField(
    {
        name,
        placeholder,
        type,
        id,
        minLength,
        maxLength,
        required = false
    }) {

    const test = React.createRef();
    const [state, setState] = React.useState('');
    return (
        <div className="validationfield">
            <input
                required={required}
                className="validationfield__input"
                id={id}
                type={type}
                placeholder={placeholder}
                name={name}
                minLength={minLength}
                maxLength={maxLength}
                ref={test}
                onChange={() => { setState(test.current.value); console.log(state) }}
            >
            </input>

            <label
                htmlFor={id}
                className="popup__errmsg"
            >
                {state}
            </label>

        </div>
    );
}