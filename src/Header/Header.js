import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css';

function Header(){
    return(
        <header className="header">
            <Link to="/"><h1>Welcome to Petful!</h1></Link>
        </header>
    )
}

export default Header