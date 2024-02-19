import React from 'react';
import Layout from '../../components/Layout';
import { Footer } from '../../components/Footer';

import './About.css';

const Home = () => {

    return (
        <>
            <Layout />
            <section className="breadcrumb-area relative about-banner" id="home">
                <div className="overlay overlay-bg"></div>
                <div className="container">
                    <div className="row d-flex align-items-center justify-content-center">
                        <div className="about-content col-lg-12">
                            <h3 className="text-white">
                                About Us
                            </h3>
                            <p className="text-white link-nav"><a href="/">Home </a> / <span className="lnr lnr-arrow-right"></span>  <span className='current-page'> About Us</span></p>
                        </div>
                    </div>
                </div>
            </section>
            <hr className="lg margin-0" />

            <section id="car-block">
                <div className="car-right animation-block">
                    <img src="./images/_car-big-side.png" alt="Car" /></div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-7">
                            <h4 className="yellow">About Us</h4>
                            <h2 className="h1 margin-0">About LK Taxi</h2>
                        </div>
                        <div className="col-md-6">
                            <h6 className='margin-top-0'>Your Trusted Partner in Transportation</h6>
                            <p>
                            At LK Taxi, we pride ourselves on being the premier online taxi booking company in Sri Lanka, dedicated to providing top-notch transportation services tailored to our customers' needs. With a focus on reliability, convenience, and customer satisfaction, we strive to make every journey with us a seamless and enjoyable experience. From our easy-to-use booking platform to our diverse fleet of vehicles and highly-trained drivers, we are committed to ensuring that our passengers reach their destinations safely and comfortably. With LK Taxi, you can trust us to deliver exceptional service and peace of mind every step of the way.</p>

                            <ul className="check two-col strong">
                                <li>Efficient Booking</li>
                                <li>24/7 Availability</li>
                                <li>Diverse Fleet</li>
                                <li>Professional Drivers</li>
                                <li>Transparent Pricing</li>
                                <li>Real-Time Tracking</li>
                                <li>Secure Payments</li>
                                <li>Dedicated Support</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <hr className="lg margin-0" />
            <section className="home-calltoaction-area relative">
                <div className="container">
                    <div className="overlay overlay-bg"></div>
                    <div className="row align-items-center section-gap">
                        <div className="col-lg-12">
                            <h2 className='text-center'>LK Taxi: Your Trusted Travel Companion in Sri Lanka</h2>
                            <p className='text-center'>
                                Experience seamless transportation solutions with LK Taxi, the premier online taxi booking platform in Sri Lanka. Whether you're exploring the city, heading to the airport, or booking a hotel, trust LK Taxi for reliable service, trained drivers, and hassle-free travel experiences tailored to your comfort and convenience. Book your ride today and discover the ultimate in travel ease with LK Taxi.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Home;