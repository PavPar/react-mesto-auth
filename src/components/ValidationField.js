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
        onValidityChange
    }) {

    const input = React.createRef();
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
                ref={input}
                onChange={() => {
                    setState({
                        valid: input.current.validity.valid,
                        msg: input.current.validationMessage
                    });
                    onValidityChange(state);
                }}
                onBlur={() => {
                    setState({
                        valid: input.current.validity.valid,
                        msg: input.current.validationMessage
                    });
                    onValidityChange(state);
                }}
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