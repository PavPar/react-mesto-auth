import React from 'react';

export default function NavBar(props) {
    return (
        <section style={props.style} className={`navbar ${!props.isVisible && 'navbar-hidden'}`}>
            {props.children}
        </section>
    );
}