import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'


function Header(props) {
    let auth = useSelector(state => state.auth)


    const handleLogout = () => {
        console.log('yyyyyyyy');
    }
    return (
        <div>
            <header class="header_section">
                <nav class="navbar navbar-expand-lg custom_nav-container ">
                    <a class="navbar-brand" href="index.html">
                        <span>
                            Giftos
                        </span>
                    </a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class=""></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav  ">
                            {/* <li><NavLink className="nav-link scrollto" to="/">Home</NavLink></li> */}
                            <li>
                                <NavLink className="nav-link scrollto" to="/">Home</NavLink>
                            </li>

                            <li>
                                <NavLink className="nav-link scrollto" to="shop">Shop</NavLink>

                            </li>
                            <li>
                                <NavLink className="nav-link scrollto" to="why">Why Us</NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink className="nav-link scrollto" to="testimonial">Testimonial</NavLink>
                            </li>
                            <li>
                                <NavLink className="nav-link scrollto" to="contact">Contact</NavLink>
                            </li>
                        </ul>
                       
                        <div class="user_option">
                            {auth.user ? <NavLink to={"/"}><span onClick={handleLogout()}>Logout</span></NavLink> :
                                <NavLink to={"/auth"}><span>Login/ Signup</span></NavLink>
                            }
                            <a href="">
                                <i class="fa fa-shopping-bag" aria-hidden="true"></i>
                            </a>
                            <form class="form-inline ">
                                <button class="btn nav_search-btn" type="submit">
                                    <i class="fa fa-search" aria-hidden="true"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
}

export default Header;