import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
    return (
        <header>
            <Link to="/">홈</Link>
            <Link to="/Sub201">Sub201</Link>
            <Link to="/Sub404">Sub404</Link>
        </header>
    );
}

export default Header;