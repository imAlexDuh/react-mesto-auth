import React from 'react';
import logo from '../images/vector.svg';

function Header() {
    return (
        <header className="header">
            <img src={logo} alt="лого" className="header__logo" />
        </header>
    )
}

export default Header;