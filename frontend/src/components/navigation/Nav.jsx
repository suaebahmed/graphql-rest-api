import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
    return (
        <header>
            <ul>
                <li><Link to="/">home</Link></li>
                <li><Link to="/auth">auth</Link></li>
                <li><Link to="/booking">booking</Link></li>
                <li><Link to="/events">events</Link></li>
            </ul>
        </header>
    )
}

export default Nav
