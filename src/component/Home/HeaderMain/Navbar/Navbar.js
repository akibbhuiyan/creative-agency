import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../../App';
import logo from '../../../../images/logos/logo.png'
import './Navbar.css'
const Navbar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    return (
        <>
            <nav class="navbar navbar-expand-lg ">
                <div class="container">
                    <Link to="/home" className='navbar-brand'>
                        <img src={logo} alt='LOGO' width='150px' />
                    </Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 navbar-link">
                            <li class="nav-item">
                                <Link class="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/portfolio" className='nav-link'>Our PortFolio</Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/service" className='nav-link'>Dashboard</Link>
                            </li>
                            <li class="nav-item">
                                <a href="#contact" className='nav-link'>Contact Us</a>
                            </li>
                            <li class="nav-item">
                                {
                                    loggedInUser.name ? <p className='pt-2'>{loggedInUser.name}</p> : <Link to='/login' className='btn btn-dark text-white px-4'>Login</Link>
                                }
                            </li>

                        </ul>

                    </div>
                </div>
            </nav>

        </>
    );
};

export default Navbar;