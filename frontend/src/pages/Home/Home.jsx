import React, { useEffect, useState } from 'react';
import './Home.css';
import Layout from '../../components/Layout';
import { Footer } from '../../components/Footer';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const Home = () => {
    // window.location.reload()
    const navigate = useNavigate();
    const [token, setToken] = useState("");
    const [user, setUser] = useState();
    const [selectedDate, setSelectedDate] = useState(null);
    const [toLocations, setToLocations] = useState([]);
    const [fromLocations, setFromLocations] = useState([]);

    const [filteredLocations, setFilteredLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');

    const [filteredToLocations, setFilteredToLocations] = useState([]);
    const [selectedToLocation, setSelectedToLocation] = useState('');

    const [routeDetail, setRouteDetail] = useState([]);
    const [searching, setSearching] = useState(true);
    const [showDateAndTime, setShowDateAndTime] = useState(false);

    const [extractedDate, setExtractedDate] = useState('');
    const [extractedTime, setExtractedTime] = useState('');
    const [pickUpLocation, setPickUpLocation] = useState("");
    const [to, setTo] = useState("");
    const [from, setFrom] = useState("");
    const [driverId, setDriverId] = useState("");
    const [money, setMoney] = useState("");
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
    const [bookingButtonStatus, setBookingButtonStatus] = useState(false);
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const handleChange = date => {
        setSelectedDate(date);
    };

    //for show success message for payment
    function showSuccessMessage(message) {
        Swal.fire({
            title: 'Success',
            text: message,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
        });
    }

    //for show error message for payment
    function showErrorMessage(message) {
        Swal.fire({
            title: 'Error!',
            text: message,
            icon: 'error',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK',
        });
    }

    function smoothScroll(target) {
        const targetElement = document.getElementById(target);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    }

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

    // setTimeout(() => {
    //     window.location.reload(true);
    // }, 1000);

    useEffect(() => {
        const storedToken = JSON.parse(localStorage.getItem('token'));
        if (storedToken) {
            setToken(storedToken);
        }
    }, [token])

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

    useEffect(() => {
        const dateTime = new Date(selectedDate);
        const extractedDate = dateTime.toDateString(); // Extracting date
        const extractedTime = dateTime.toLocaleTimeString(); // Extracting time

        setExtractedDate(extractedDate);
        setExtractedTime(extractedTime);
    }, [selectedDate]);

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        if (inputValue) {
            setSelectedLocation(inputValue); // Update selectedLocation state
            const filtered = fromLocations.filter(location =>
                location.toLowerCase().includes(inputValue.toLowerCase())
            );
            setFilteredLocations(filtered);
        } else {
            setSelectedLocation("")
            setFilteredLocations([])
        }

    };

    // Function to handle click on filtered location
    const handleLocationClick = (location) => {
        setSelectedLocation(location);
        setFilteredLocations([]);
    };

    const handleToInputChange = (event) => {
        const inputValue = event.target.value;
        if (inputValue) {
            setSelectedToLocation(inputValue); // Update selectedLocation state
            const filtered = toLocations.filter(location =>
                location.toLowerCase().includes(inputValue.toLowerCase())
            );
            setFilteredToLocations(filtered);
        } else {
            setSelectedToLocation("")
            setFilteredToLocations([])
        }

    };

    // Function to handle click on filtered location
    const handleToLocationClick = (location) => {
        setSelectedToLocation(location);
        setFilteredToLocations([]);
    };

    useEffect(() => {

        axios.get(`${process.env.REACT_APP_SERVER_URL}/find-from-routes`)
            .then(res => {
                console.log(res.data)
                setFromLocations(res.data);
            })
            .catch(err => {
                console.log(err)
            })

        axios.get(`${process.env.REACT_APP_SERVER_URL}/find-to-routes`)
            .then(res => {
                console.log(res.data)
                setToLocations(res.data);
            })
            .catch(err => {
                console.log(err);
            })

    }, [])

    const handleRouteDetail = () => {
        setSearching(true)
        setRouteDetail([])
        setIsOpen(true);
        axios.get(`${process.env.REACT_APP_SERVER_URL}/route-detail/${selectedLocation}/${selectedToLocation}`)
            .then(res => {
                console.log(res.data);
                setRouteDetail(res.data);
                setSearching(false)
            })
            .catch(err => {
                console.log(err)
                setSearching(false)
            })
    }

    // function openModal() {
    //     setIsOpen(true);
    // }

    function closeModal() {
        setIsOpen(false);
    }

    const renderStars = (numStars) => {
        const stars = [];
        for (let i = 0; i < numStars; i++) {
            stars.push(<i key={i} className='fa fa-star rate'></i>);
        }
        for (let i = numStars; i < 5; i++) {
            stars.push(<i key={i} className='fa fa-star'></i>);
        }
        return stars;
    };

    useEffect(() => {
        if (driverId) {
            setBookingButtonStatus(false);
            console.log(driverId)
            axios.post(`${process.env.REACT_APP_SERVER_URL}/already-booked`, { from: selectedLocation, to: selectedToLocation, driverId, customerId: user?.id }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                }
            })
                .then(res => {
                    console.log(res.data);
                    if (res.data.message === "Already Booked") {
                        setBookingButtonStatus(false);
                        showErrorMessage("You have already booked this driver, and the trip is not finished yet.")
                    } else if (res.data.message === "Not Booked") {
                        setBookingButtonStatus(true);
                    }
                })
                .catch(err => {
                    console.log(err)
                    showErrorMessage(err.response.data.error)
                    setBookingButtonStatus(false);
                })
        }
    }, [driverId]);

    const handleBooking = () => {
        const bookingData = {
            driverId,
            time: extractedTime,
            date: extractedDate,
            customerId: user.id,
            from,
            to,
            money,
            pickUpLocation

        }

        axios.post(`${process.env.REACT_APP_SERVER_URL}/create-new-booking`, bookingData, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        })
            .then(res => {
                console.log(res.data);
                showSuccessMessage("Booking Notification sent to Driver");
            })
            .catch(err => {
                console.log(err)
                showErrorMessage(err.response.data.error)
            })

        setIsOpen(false);

    }
    useEffect(() => {
        if (!modalIsOpen) {
            setDriverId("")
            setShowDateAndTime(false)
            setSelectedRowIndex(null)
            setBookingButtonStatus(false)
        }
    }, [modalIsOpen])
    return (
        <>
            <Layout />

            <div id="homepage-block-3" className='home-banner-area'>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-6">
                            <section className="form-taxi-short">
                                <div className="container">
                                    <form>
                                        <h3 className="aligncenter">Get Taxi <span className="yellow">Online</span></h3>

                                        <div className="form-with-labels book--form">
                                            <div className="form-group">
                                                <input type="text" name="from" placeholder="Search Pickup Location..."
                                                    className="booking-input" 
                                                    value={selectedLocation}
                                                    onChange={handleInputChange} 
                                                    required />
                                                <span className="fa fa-search"></span>

                                                <div className='search-result-data-area custom'>
                                                    {filteredLocations.map((location, index) => (
                                                        <div
                                                            key={index}
                                                            className='search-result-data'
                                                            onClick={() => handleLocationClick(location)}>
                                                            {location}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className='book-form-line'></div>

                                            <div className="form-group">
                                                <input type="text" name="to" placeholder="Search Drop Location..." className="booking-input" 
                                                value={selectedToLocation}
                                                 onChange={handleToInputChange} required />
                                                <span className="fa fa-search"></span>

                                                <div className='search-result-data-area custom'>
                                                    {filteredToLocations.map((location, index) => (
                                                        <div
                                                            key={index}
                                                            className='search-result-data'
                                                            onClick={() => handleToLocationClick(location)}
                                                        >
                                                            {location}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <button type='button' className='btn btn-lg btn-yellow book--submit-btn aligncenter'
                                            onClick={handleRouteDetail} 
                                            disabled={!(selectedLocation && selectedToLocation)}
                                            >
                                            SUBMIT
                                        </button>
                                    </form>
                                </div>
                            </section>
                        </div>
                        <div className="col-12 col-lg-6 home-banner-text">
                            <h2>Discover <br /> Seamless Travel with <br /><span>City Taxi</span></h2>
                            <h6>Your Ultimate Transportation Solution in Sri Lanka</h6>
                        </div>
                    </div>
                </div>
            </div>

            <div className="homepage-block-yellow-3">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <h3><span className="fa fa-phone"></span>077-000-0000</h3>
                        </div>
                        <div className="col-lg-6 col-md-6  col-sm-6">
                            <h4><span className="fa fa-map-marker"></span>107 Dam Street, 12, Colombo, Sri Lanka.</h4>
                        </div>
                        <div className="col-lg-3 col-md-6  col-sm-6">
                            <a href="/contact-us" className="btn btn-black-bordered btn-lg pull-right">Contact Us</a>
                        </div>
                    </div>
                </div>
            </div>

            <section id="services">
                <div className="container">
                    <h4 className="yellow">Welcome</h4>
                    <h2 className="h1">Our Services</h2>
                    <div className="row">
                        <div className="col-md-3 col-sm-6 col-ms-6 matchHeight">
                            <div className="image"><img src="./images/_services-1.png" alt="Service" /></div>
                            <h5>Rapid city transfer</h5>
                            <p>Get to your destination swiftly with City Taxi's rapid city transfer service, ensuring you make the most of your time in Sri Lanka.</p>
                        </div>
                        <div className="col-md-3 col-sm-6 col-ms-6 matchHeight">
                            <div className="image"><img src="./images/_services-2.png" alt="Service" /></div>
                            <h5>Booking a hotel</h5>
                            <p>Simplify your travel arrangements by booking your accommodation through City Taxi, guaranteeing a comfortable stay at your chosen hotel.</p>
                        </div>
                        <div className="col-md-3 col-sm-6 col-ms-6 matchHeight">
                            <div className="image"><img src="./images/_services-3.png" alt="Service" /></div>
                            <h5>Airport transfer</h5>
                            <p>Start or end your journey hassle-free with City Taxi's reliable airport transfer service, ensuring punctuality and comfort for your travels.</p>
                        </div>
                        <div className="col-md-3 col-sm-6 col-ms-6 matchHeight">
                            <div className="image"><img src="./images/_services-4.png" alt="Service" /></div>
                            <h5>Baggage transport</h5>
                            <p>Trust City Taxi to safely transport your luggage to your destination, ensuring a seamless travel experience without the burden of carrying heavy bags.</p>
                        </div>
                    </div>
                </div>
            </section>

            <hr className="lg margin-bottom-0" />
            <section id="car-block">
                <div className="car-right animation-block">
                    <img src="./images/_car-big-side.png" alt="Car" />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-7">
                            <h4 className="yellow">About Us</h4>
                            <h2 className="h1 margin-0">Our Journey at City Taxi</h2>
                        </div>
                        <div className="col-md-6">
                            <h6 className='margin-top-0'>Navigating Journeys, Connecting Lives: The City Taxi Story</h6>
                            <p>
                                Discover the heart behind City Taxi, where our commitment lies in transforming the way you travel in Sri Lanka. Learn about our dedication to reliability, convenience, and customer satisfaction as we strive to make every journey memorable. </p>

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

                            <a href="/about" className="btn btn-yellow btn-lg btn-white">More About Us...</a>
                        </div>
                    </div>
                </div>
            </section>
            <hr className="lg margin-bottom-0" />

            <section className="image-gallery-area section-gap">
                <div className="container">
                    <div className="row section-title feature-title-section">
                        <h2>Explore the Ultimate Convenience of <span>City Taxi</span>:</h2>
                        <h4>Your Go-To Online Taxi Booking Platform in Sri Lanka</h4>
                        <p>Welcome to City Taxi, your premier choice for hassle-free and efficient transportation solutions across Sri Lanka. With our user-friendly online platform, we've revolutionized the way you book taxis, ensuring a seamless experience from start to finish.</p>
                    </div>
                    <div className="row feature-content-section">
                        <div className="col-lg-4 single-gallery">
                            <div className='sub-about-area'>
                                <div className="custom-hr"></div>
                                <h3>Effortless Booking</h3>
                                <p>
                                    Say goodbye to long waiting times and frustrating phone calls. With City Taxi, you can book your ride in just a few clicks from the comfort of your home or while on the go.
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

            <hr className="lg margin-0" />
            <section className="home-calltoaction-area relative">
                <div className="container">
                    <div className="overlay overlay-bg"></div>
                    <div className="row align-items-center section-gap">
                        <div className="col-lg-12">
                            <h2 className='text-center'>City Taxi: Your Trusted Travel Companion in Sri Lanka</h2>
                            <p className='text-center'>
                                Experience seamless transportation solutions with City Taxi, the premier online taxi booking platform in Sri Lanka. Whether you're exploring the city, heading to the airport, or booking a hotel, trust City Taxi for reliable service, trained drivers, and hassle-free travel experiences tailored to your comfort and convenience. Book your ride today and discover the ultimate in travel ease with City Taxi.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />

            {/* booking modal here */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Booking Modal"
            >
                <div className="modal--header">
                    <h6>Booking</h6>
                    <button className='btn close-button' onClick={closeModal}>&times;</button>
                </div>

                <div className="modal--body">
                    <div className="selected-location-area">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className='selected-location'>
                                    <h6 className='text-orange'>From : </h6>
                                    <h6 className='text-white sub-text'>{selectedLocation}</h6>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className='selected-location'>
                                    <h6 className='text-orange'>To : </h6>
                                    <h6 className='text-white sub-text'>{selectedToLocation}</h6>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="inner-two-col">
                        <div class="text-page">
                            <div className="book-table-area table-responsive">
                                <table className='table margin-bottom-0'>
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Driver Name</th>
                                            <th>Mobile No.</th>
                                            <th>Amount</th>
                                            <th>Rating</th>
                                            {user?.role === "Customer" && <th className='text-center'>Select</th>}
                                        </tr>
                                    </thead>

                                    {routeDetail.length > 0 ?
                                        <tbody>
                                            {routeDetail.map((rout, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}.</td>
                                                    <td>{rout?.driver?.userName}</td>
                                                    <td>{rout?.driver?.phoneNum}</td>
                                                    <td>{rout?.money}</td>

                                                    <td className='verical-align-middle'>
                                                        <div className="current-rating">
                                                            {renderStars(rout?.driver?.rating)}
                                                        </div>
                                                    </td>

                                                    {user?.role === "Customer" &&
                                                        <td className='text-center'>
                                                            <button
                                                                className='btn modal-btn view-btn btn-success'
                                                                onClick={() => {
                                                                    setSelectedRowIndex(index);
                                                                    setShowDateAndTime(true);
                                                                    setDriverId(rout?.driver?.id);
                                                                    setTo(rout?.to);
                                                                    setFrom(rout?.from);
                                                                    setMoney(rout?.money);
                                                                }}
                                                                disabled={selectedRowIndex === index}
                                                            >
                                                                <i className='fa fa-check mr-2'>&nbsp;{selectedRowIndex === index ? "Selected" : "Select"}</i>
                                                            </button>
                                                        </td>
                                                    }
                                                </tr>
                                            ))}
                                        </tbody> :
                                        <tr>
                                            <td colSpan={6} className='text-center text-secondary'>{searching ? "Searching..." : "No Driver Details!"}</td>
                                        </tr>
                                    }
                                </table>
                            </div>
                        </div>
                    </div>

                    {showDateAndTime &&
                        <form action="">
                            <div className='book-form-area'>
                                <div className="row">
                                    <div className="col-12 col-lg-6">
                                        <div className="form-group">
                                            <label htmlFor="" className='form-label absolute text-orange'>Pickup Location</label>
                                            <input type="text" className='form-control dark-theme' placeholder='Enter your pickup location'
                                                value={pickUpLocation}
                                                onChange={(e) => setPickUpLocation(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="col-12 col-lg-6">
                                        <div className="form-group">
                                            <label htmlFor="" className='form-label absolute text-orange'>Date & Time</label>
                                            <div className='w-100 date-picker-custom'>
                                                <DatePicker
                                                    className='form-control dark-theme'
                                                    placeholderText='Select Date and Time'
                                                    selected={selectedDate}
                                                    onChange={handleChange}
                                                    showTimeSelect
                                                    dateFormat="MMMM d, yyyy h:mm aa"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    }
                </div>

                <div className="modal--footer">
                    {!(user?.role === "Customer") &&
                        <button class="btn btn-orange with-border modal-btn"
                            onClick={() => {
                                localStorage.removeItem("token")
                                navigate("/log-in")
                            }}>Please Login as Customer to Book....</button>
                    }
                    <button type="button" class="btn btn-secondary modal-btn" onClick={closeModal}>Close</button>
                    {user?.role === "Customer" &&
                        <button type="button" class="btn btn-orange modal-btn"
                            onClick={() => handleBooking()}
                            disabled={routeDetail.length === 0 || selectedDate === null || pickUpLocation === "" || !bookingButtonStatus || !showDateAndTime}>Book</button>
                    }
                </div>
            </Modal>
            {/*  */}
        </>
    )
}

export default Home;
