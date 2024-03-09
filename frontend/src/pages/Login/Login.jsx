import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Footer } from '../../components/Footer';
import './Login.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
// import { useNavigate } from "react-router-dom";

const Login = () => {
    const [active, setActive] = useState(false);
    const [selectedRole, setSelectedRole] = useState('');
    const [showDropdown, setShowDropdown] = useState(true);


    // const navigate = useNavigate()
    const intialCredentials = {
        userName: "",
        password: "",
        role: ""
    }
    const [credentials, setCredentials] = useState(intialCredentials);

    //for show success message for payment
    function showSuccessMessage(message) {
        Swal.fire({
            title: 'Congratulation!',
            text: message,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
        });
    }

    const handleRoleChange = (event) => {

        const { value } = event.target;
        setSelectedRole(event.target.value)
        setCredentials(prevCredentials => ({
            ...prevCredentials,
            role: value
        }));
        setShowDropdown(false);
    };
    function showErrorMessage(message) {
        Swal.fire({
            title: 'Error!',
            text: message,
            icon: 'error',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK',
        });
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });

    }
    const handleSubmit = (event) => {
        event.preventDefault();

        // credentials.role='Customer';
        console.log(credentials);
        let endPoint;
        if (credentials.role === "Admin") {
            endPoint = "login-admin"
        } else if (credentials.role === "Customer") {
            endPoint = "login-customer"
        } else if (credentials.role === "Driver") {
            endPoint = "login-driver"
        } else if (credentials.role === "Operator") {
            endPoint = "login-operator"
        }

        console.log(endPoint);
        if (!(credentials.role === "")) {
            axios.post(`${process.env.REACT_APP_SERVER_URL}/${endPoint}`, credentials)
                .then(res => {
                    console.log(res.data);
                    showSuccessMessage("Login Successful!")
                    setCredentials(intialCredentials);
                    if (credentials.role === "Customer") {
                        localStorage.setItem("token", JSON.stringify(res.data.accessToken));
                        // navigate(`/about`);
                        window.location.href = "/"
                    } else {
                        localStorage.setItem("token", JSON.stringify(res.data.accessToken));
                        // navigate(`/dashboard`);
                        window.location.href = "/dashboard"
                    }
                })
                .catch(err => {
                    console.log(err)
                    showErrorMessage(err.response.data.message)
                })
        } else {
            showErrorMessage("Select User Role")
        }
    }

    const headerStyle = {
        textAlign: 'center',
        color: 'black', // Blue color
        fontSize: '32px', // Larger font size
        fontWeight: 'bold',
        fontFamily: 'Arial, sans-serif', // Backup font family
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', // Text shadow for depth
        borderBottom: '2px solid #007bff', // Underline effect
        paddingBottom: '10px', // Space below the header
        marginBottom: '20px', // Additional space at the bottom
    };
    return (
        <>
            <Layout />
            <div className="container">
                <div className="login-bg-area">
                    <div className="row mx-auto">
                        <div className="col-12 col-md-6 col-lg-6 login-form-area ">
                            <h4 style={headerStyle}>
                                <a className="logo" href="/">
                                    <img src="./images/city.png" alt="city" />
                                </a>
                                {selectedRole} LOGIN</h4>

                            <form className="form login-form">
                                <div className="form-group">
                                    <label className='log-label'>User Login Type</label>
                                    <select name="role" value={selectedRole} onChange={handleRoleChange} className="form-control" style={{ borderColor: "#FFC61A" }}>
                                        <option value="">Select a role</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Operator">Operator</option>
                                        <option value="Customer">Customer</option>
                                        <option value="Driver">Driver</option>
                                    </select>

                                </div>

                                <div className="form-group">
                                    <label className='log-label'>User Name</label>
                                    <input type="text" name="userName" className="form-control" placeholder="Enter your user name"
                                        value={credentials.userName}
                                        onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label className='log-label'>Password</label>
                                    <input type="password" name="password" className="form-control" placeholder="Enter your password"  autocomplete="on"
                                        value={credentials.password}
                                        onChange={handleInputChange} />
                                </div>

                                <div className="text-center">
                                    <button className='btn btn-yellow btn-lg' onClick={handleSubmit}>LOGIN</button>
                                    <div className='dont-acc-text'>You don't have an account?,&nbsp;
                                        <a href="/sign-up">Signup</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Login;