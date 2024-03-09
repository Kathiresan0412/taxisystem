import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Footer } from '../../components/Footer';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useNavigate } from 'react-router-dom';

 const Register = () => {
    const [selectedRole, setSelectedRole] = useState('');
    const [showDropdown, setShowDropdown] = useState(true);
    const navigate = useNavigate();
    const intialCredentials = {
        email: "",
        phoneNum: 0,
        role: ""
    }
    const [credentials, setCredentials] = useState(intialCredentials);

    //for show success message for payment
    function showSuccessMessage(message) {
        Swal.fire({
            title: 'Register Successful!',
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

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(credentials)
        console.log(process.env.REACT_APP_SERVER_URL)
        
        axios.post(`http://localhost:3000/user-reg`, credentials)
            .then(res => {
                console.log(res.data);
                showSuccessMessage("Find your Login Credentials in your email")
                setCredentials({ ...credentials, email: "", phoneNum: 0 });
                navigate("/log-in")
            })
            .catch(err => {
                console.log(err)
                showErrorMessage(err.response.data.error)
            })

    }
    const handleRoleChange = (event) => {
        const { value } = event.target;
        setSelectedRole(event.target.value)
        setCredentials(prevCredentials => ({
            ...prevCredentials,
            role: value
        }));
        setShowDropdown(false);
    }
    const headerStyle = {
        textAlign: 'center',
        color: '#007bff', // Blue color
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
                            <div className="col-12 col-md-6 col-lg-6 login-form-area">
                            <h4 style={headerStyle}>
                            <a className="loo" href="#">
                                <img src="./images/Taxilogo.png" alt="city" />
                            </a>
                                {selectedRole} Registration </h4>
                           
                                <form class="form login-form">
                                <div className="form-group">
                                        <label className='log-label'>User Login Type</label>
                                        <select name="role" value={credentials.role} 
                                         onChange={handleRoleChange} className="form-control"  style={{ borderColor: "#FFC61A" }}>
                                            <option value="">Select a role</option>
                                            <option name="role" value="Customer" >Customer</option>
                                            <option name="role" value="Driver">Driver</option>
                                        </select>
                                    </div>

             

                                    <div className="form-group">
                                        <label htmlFor="email" className='log-label'>E-mail</label>
                                        <input type="email" name="email" placeholder="Enter your email" required 
                                            value={credentials.email}
                                            onChange={handleInputChange} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="mobile" className='log-label'>Mobile Number</label>
                                        <input type="number" name="phoneNum" placeholder="Enter your mobile number" required 
                                            value={credentials.phoneNum}
                                            onChange={handleInputChange} />
                                    </div>

                                    <div class="aligncenter">
                                        <button className='btn btn-yellow btn-lg' onClick={handleSubmit}>SUBMIT</button>
                                        <div className='dont-acc-text'>You already have an account?,&nbsp;
                                            <a href="/log-in">Login</a>
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
export default Register;