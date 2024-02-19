import React from 'react';
import Layout from '../../components/Layout';
import { Footer } from '../../components/Footer';

const Contact = () => {

    return (
        <>
            <Layout />
            <section className="breadcrumb-area relative about-banner" id="home">
                <div className="overlay overlay-bg"></div>
                <div className="container">
                    <div className="row d-flex align-items-center justify-content-center">
                        <div className="about-content col-lg-12">
                            <h3 className="text-white">
                                Contact Us
                            </h3>
                            <p className="text-white link-nav"><a href="/">Home </a> / <span className="lnr lnr-arrow-right"></span>  <span className='current-page'>Contact Us</span></p>
                        </div>
                    </div>
                </div>
            </section>
            <hr className="lg margin-0" />

            <section id="page-contacts">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 col-md-6">
                            <div class="row">
                                <div class="col-lg-12 col-md-12 col-sm-6">

                                    <h2 class="spanned">Contact Us</h2>
                                    <p>Feel free to reach out to us at LK Taxi with any questions, concerns, or feedback you may have. Our dedicated team is here to assist you and ensure your experience with us is as smooth as possible. Whether you need assistance with booking a ride, have inquiries about our services, or require support during your journey, we're always ready to help.</p>
                                    <p>You can contact us via phone, email, or by filling out the contact form below. We strive to respond to all inquiries promptly and provide the assistance you need. Your satisfaction is our priority, and we look forward to hearing from you.</p>
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-6">
                                    <ul class="address">
                                        <li class="large"><span class="fa fa-phone"></span>077-000-0000</li>
                                        <li><span class="fa fa-map-marker"></span>107 Dam Street, 12, Colombo, Sri Lanka.</li>
                                        <li><span class="fa fa-envelope"></span>lktaxi@gmail.com</li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                        <div class="col-lg-6 col-md-6 contact-form">

                            <form class="form form-sm">
                                <h3 class="aligncenter">Send Message</h3>
                                <div class="form-group">
                                    <label>Your name <span class="red">*</span></label>
                                    <input type="text" id="name" name="name" placeholder="Your name" required/>
                                </div>
                                <div class="form-group">
                                    <label>E-mail <span class="red">*</span></label>
                                    <input type="text" id="email" name="email" placeholder="E-mail" required/>
                                </div>
                                <div class="form-group">
                                    <label>Message <span class="red">*</span></label>
                                    <textarea id="text" name="text" placeholder="Enter Message" required></textarea>
                                </div>
                                <button type="button" className='btn btn-yellow aligncenter btn-lg'>
                                    Send
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Contact;