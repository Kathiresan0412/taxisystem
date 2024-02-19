import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useLocation } from 'react-router-dom';

export const Header = () => {
    const [token, setToken] = useState("");
    const [user, setUser] = useState();
    const navigate = useNavigate()

    const location = useLocation();

    const getProtectedData = async (accessToken) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/protected`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        const storedToken = JSON.parse(localStorage.getItem('token'));
        if (storedToken) {
            setToken(storedToken);
        }
    }, [])

    useEffect(() => {
        if (token) {
            const fetchData = async () => {
                try {
                    const user = await getProtectedData(token);
                    console.log(user);
                    setUser(user);

                } catch (error) {
                    console.log(error);

                }
            };

            fetchData();
        }
    }, [token]);

    return (
        // <header id="header">
        //     <div className="header-top">
        //     </div>
        //     <div className="container main-menu">
        //         <div className="row align-items-center justify-content-between d-flex">
        //             <a href="/"><img className='header-logo' src="img/lanka-cabz-logo.png" alt="" title="" /></a>
        //             <nav id="nav-menu-container">
        //                 <ul className="nav-menu nav-menu-ul">
        //                     <li className="menu-active"><a href="/">Home</a></li>
        //                     <li><a href="/about">About</a></li>
        //                     <li><a href="/services">Services</a></li>

        //                     {/* <li className="menu-has-children"><a href="">Blog</a>
        //                         <ul>
        //                             <li><a href="blog-home.html">Blog Home</a></li>
        //                             <li><a href="blog-single.html">Blog Single</a></li>
        //                             <li className="menu-has-children"><a href="">Level 2</a>
        //                                 <ul>
        //                                     <li><a href="#">Item One</a></li>
        //                                     <li><a href="#">Item Two</a></li>
        //                                 </ul>
        //                             </li>
        //                         </ul>
        //                     </li> */}

        //                     {/* <li><a href="/contact-us">Contact</a></li> */}
        //                     {!user && <li><a href="/log-in" className="btn header-login-btn">LOGIN</a></li>}
        //                     {user &&
        //                         <li className="menu-has-children">
        //                             <a href="#" className='profile-btn'>
        //                                 <i className='fa fa-user'></i>
        //                             </a>
        //                             <ul>
        //                                 <li><a href="/Dashboard" className='text-white'><i className='fa fa-dashboard mr-1'></i> DASHBOARD</a></li>
        //                                 <li
        //                                     onClick={() => {
        //                                         localStorage.removeItem("token");
        //                                         navigate("/log-in")
        //                                     }}><a href="" className='text-danger'><i className='fa fa-sign-out mr-1'></i> LOGOUT</a></li>
        //                             </ul>
        //                         </li>}
        //                 </ul>
        //             </nav>
        //         </div>
        //     </div>
        // </header>

        <div className="navbar-gray-yellow-transparent">
            <div className="nav-wrapper" id="nav-wrapper">
                <nav className="navbar navbar-static navbar-affix" data-spy="affix">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar top-bar"></span>
                                <span className="icon-bar middle-bar"></span>
                                <span className="icon-bar bottom-bar"></span>
                            </button>
                            <a className="logo" href="/">
                                <img src="./images/logo-inner.png" alt="TaxiPark" />
                            </a>
                        </div>
                        <div id="navbar" className="navbar-collapse collapse">
                            <button type="button" className="navbar-toggle collapsed">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar top-bar"></span>
                                <span className="icon-bar middle-bar"></span>
                                <span className="icon-bar bottom-bar"></span>
                            </button>
                            <ul className="nav navbar-nav">
                                <li id='home_page' className={location.pathname === '/' ? 'current_page_item' : ''}><a href="/">Home</a></li>
                                <li id='about_page' className={location.pathname === '/about' ? 'current_page_item' : ''}><a href="/about">About</a></li>
                                <li id='service_page' className={location.pathname === '/services' ? 'current_page_item' : ''}><a href="/services">Services</a></li>
                                {/* <li class="hasSub">
                                    <a href="#">Our blog</a>
                                    <ul class="sub-menu">
                                        <li><a href="blog.html">Classic Blog</a></li>
                                        <li><a href="blog-3.html">Blog without Sidebar</a></li>
                                        <li><a href="post.html">Blog Post</a></li>
                                    </ul>
                                </li> */}
                                {/* <li><a href="#">Testimonials</a></li> */}
                                <li id='contact_page' className={location.pathname === '/contact-us' ? 'current_page_item' : ''}><a href="/contact-us">Contacts</a></li>
                                {!user && <li className='header-button-area'><a href="/log-in" className="btn header-login-btn">LOGIN</a></li>}
                                {user &&
                                    <li className="hasSub header-button-area">
                                        <a href="#" className='profile-btn'>
                                            <i className='fa fa-user'></i>
                                        </a>
                                        <ul className="sub-menu">
                                            <li><a href="/Dashboard"><i className='fa fa-dashboard mr-1'></i> DASHBOARD</a></li>
                                            <li
                                                onClick={() => {
                                                    localStorage.removeItem("token");
                                                    navigate("/log-in")
                                                }}>
                                                <a href="" className='text-danger'><i className='fa fa-sign-out mr-1'></i>
                                                    LOGOUT
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Header