import React from "react";

export default function ValidationField(
    {
        name,
        placeholder,
        type,
        id,
        minLength,
        maxLength,
        required = false,
        displayValidity = true,
        onValidityChange,
        input
    }) {

    const [state, setState] = React.useState('');

    const validation = () => {
        setState({
            valid: input.current.validity.valid,
            msg: input.current.validationMessage,
            value: input.current.value
        });
        onValidityChange(state);
    }
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
                ref={input}
                onChange={
                    validation
                }
                onBlur={
                    validation
                }
            >
            </input>

            <label
                htmlFor={id}
                className="popup__errmsg"
            >
                {displayValidity && state.msg}
            </label>

        </div>
    );
}