import React from 'react'
import { Link } from 'react-router-dom'
import '../App.scss'
const Header = () => {
  return (
    <nav className='nav'>
        <Link to='/'>
            <div className='nav-link'>Home</div>
        </Link>
        <Link to='groups/'>
            <div className='nav-link'>Forums</div>
        </Link>
        <Link to='new/'>
            <div className='nav-link'>Request New Location</div>
        </Link>
        <Link to='about/'>
            <div className='nav-link'>About</div>
        </Link>
        <Link to='login/'>
            <div className='nav-link'>Login</div>
        </Link>
    </nav>
  )
}

export default Header