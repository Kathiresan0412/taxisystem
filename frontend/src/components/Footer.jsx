import React from 'react';
import './index.css'

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <>
            <section id="block-footer">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 col-ms-6">
                            <h4>About us</h4>
                            <p>Experience hassle-free travel with LK Taxi, your trusted online taxi booking service in Sri Lanka. Our commitment to reliability and convenience ensures seamless journeys for every passenger. Trust LK Taxi for efficient booking, professional drivers, and a comfortable ride every time.</p>

                            {/* <div class="social-small social-yellow">
                                <a href="#" class="fa fa-twitter"></a>
                                <a href="#" class="fa fa-facebook"></a>
                                <a href="#" class="fa fa-instagram"></a>
                                <a href="#" class="fa fa-google-plus"></a>
                                <a href="#" class="fa fa-pinterest"></a>
                            </div> */}
                        </div>
                        <div class="col-lg-5 col-md-5 hidden-md hidden-sm hidden-xs hidden-ms">
                            <h4>Explore</h4>
                            <div class="row">
                                <div class="col-md-12">
                                    <ul class="nav navbar-nav">
                                        <li><a href="/about">About Us</a></li>
                                        <li><a href="/services">Services</a></li>
                                        <li><a href="/contact-us">Contact Us</a></li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-6 col-ms-6">
                            <h4>Contact Us</h4>
                            <p><span class="yellow">Address : </span>107 Dam Street, 12, Colombo, Sri Lanka.</p>

                            <ul class="address">
                                <li><span class="fa fa-phone"></span>077-000-0000</li>
                                <li><span class="fa fa-envelope"></span><a href="#">lktaxi@gmail.com</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <footer>
                <div class="container">
                    <a href="#">LK Taxi</a> {currentYear} © All Rights Reserved
                    <a href="#" class="go-top hidden-xs hidden-ms"></a>
                </div>
            </footer>
        </>
    )
}

export default Footer;