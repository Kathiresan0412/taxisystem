import React from 'react';
import Layout from '../../components/Layout';
import { Footer } from '../../components/Footer';

const Services = () => {

    return (
        <>
            <Layout />
            <section className="breadcrumb-area relative about-banner" id="home">
                <div className="overlay overlay-bg"></div>
                <div className="container">
                    <div className="row d-flex align-items-center justify-content-center">
                        <div className="about-content col-lg-12">
                            <h3 className="text-white">
                                Services
                            </h3>
                            <p className="text-white link-nav"><a href="/">Home </a> / <span className="lnr lnr-arrow-right"></span>  <span className='current-page'>Services</span></p>
                        </div>
                    </div>
                </div>
            </section>

            <hr className="lg margin-0" />

            <section id="services">
                <div className="container">
                    <h4 className="yellow">Welcome</h4>
                    <h2 className="h1">Our Services</h2>
                    <div className="row">
                        <div className="col-md-3 col-sm-6 col-ms-6 matchHeight">
                            <div className="image"><img src="./images/_services-1.png" alt="Service" /></div>
                            <h5>Rapid city transfer</h5>
                            <p>Get to your destination swiftly with LK Taxi's rapid city transfer service, ensuring you make the most of your time in Sri Lanka.</p>
                        </div>
                        <div className="col-md-3 col-sm-6 col-ms-6 matchHeight">
                            <div className="image"><img src="./images/_services-2.png" alt="Service" /></div>
                            <h5>Booking a hotel</h5>
                            <p>Simplify your travel arrangements by booking your accommodation through LK Taxi, guaranteeing a comfortable stay at your chosen hotel.</p>
                        </div>
                        <div className="col-md-3 col-sm-6 col-ms-6 matchHeight">
                            <div className="image"><img src="./images/_services-3.png" alt="Service" /></div>
                            <h5>Airport transfer</h5>
                            <p>Start or end your journey hassle-free with LK Taxi's reliable airport transfer service, ensuring punctuality and comfort for your travels.</p>
                        </div>
                        <div className="col-md-3 col-sm-6 col-ms-6 matchHeight">
                            <div className="image"><img src="./images/_services-4.png" alt="Service" /></div>
                            <h5>Baggage transport</h5>
                            <p>Trust LK Taxi to safely transport your luggage to your destination, ensuring a seamless travel experience without the burden of carrying heavy bags.</p>
                        </div>
                    </div>
                </div>
            </section>

            <hr className="lg margin-0" />

            <section className="image-gallery-area section-gap">
                <div className="container">
                    <div className="row section-title feature-title-section">
                        <h2>Explore the Ultimate Convenience of <span>LK Taxi</span>:</h2>
                        <h4>Your Go-To Online Taxi Booking Platform in Sri Lanka</h4>
                        <p>Welcome to LK Taxi, your premier choice for hassle-free and efficient transportation solutions across Sri Lanka. With our user-friendly online platform, we've revolutionized the way you book taxis, ensuring a seamless experience from start to finish.</p>
                    </div>
                    <div className="row feature-content-section">
                        <div className="col-lg-4 single-gallery">
                            <div className='sub-about-area'>
                                <div className="custom-hr"></div>
                                <h3>Effortless Booking</h3>
                                <p>
                                    Say goodbye to long waiting times and frustrating phone calls. With LK Taxi, you can book your ride in just a few clicks from the comfort of your home or while on the go.
                                </p>
                            </div>

                            <div className='sub-about-area'>
                                <div className="custom-hr"></div>
                                <h3>24/7 Availability</h3>
                                <p>
                                    Whether it's a late-night flight or an early morning meeting, our services are available round the clock to cater to your transportation needs anytime, anywhere.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4 single-gallery">
                            <div className='sub-about-area'>
                                <div className="custom-hr"></div>
                                <h3>Wide Range of Vehicles</h3>
                                <p>
                                    From sedans to minivans, we offer a diverse fleet of vehicles to suit your specific requirements, ensuring a comfortable and safe journey for individuals and groups alike.
                                </p>
                            </div>

                            <div className='sub-about-area'>
                                <div className="custom-hr"></div>
                                <h3>Transparent Pricing</h3>
                                <p>
                                    No more surprises when it comes to fares. With transparent pricing and no hidden charges, you can easily plan your travel budget with confidence.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4 single-gallery">
                            <div className='sub-about-area'>
                                <div className="custom-hr"></div>
                                <h3>Real-Time Tracking</h3>
                                <p>
                                    Track your ride in real-time and stay informed about your driver's location, estimated time of arrival, and more, providing you with peace of mind throughout your journey.
                                </p>
                            </div>

                            <div className='sub-about-area'>
                                <div className="custom-hr"></div>
                                <h3>Secure Payment Options</h3>
                                <p>
                                    We prioritize your safety and convenience, which is why we offer secure payment options, including cashless transactions, for a hassle-free experience.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

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

export default Services;