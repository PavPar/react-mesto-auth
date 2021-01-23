import React from 'react';

export default function NavBar(props) {
    return (
        <section style={props.style} className={`navbar ${!props.isVisible && 'navbar_visibility-hidden'}`}>
            {props.children}
        </section>
    );
}