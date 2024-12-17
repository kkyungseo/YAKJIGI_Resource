import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
    return (
        <header>
            <Link to="/">홈</Link>
            <Link to="/MyBasicBoardRecords">Records</Link>
            <Link to="/MyBasicBoardRecordsWrite">Write</Link>
            <Link to="/MyBasicBoardRecordsDetail">Detail</Link>
        </header>
    );
}

export default Header;