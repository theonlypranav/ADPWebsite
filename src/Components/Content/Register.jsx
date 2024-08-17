import React, { useState } from 'react';
import 'boxicons/css/boxicons.min.css';
import './Register.css';

function Register() {
  const [formData, setFormData] = useState({
    coordinatorName: '',
    clubName: '',
    phoneNumber: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div classname = "register-page">
        <div id="register">
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <div className="input-box">
                <input
                type="text"
                name="coordinatorName"
                placeholder="Co-ordinator Name"
                value={formData.coordinatorName}
                onChange={handleChange}
                required
                />
                <i className='bx bxs-user'></i>
            </div>
            <div className="input-box">
                <input
                type="text"
                name="clubName"
                placeholder="Club Name"
                value={formData.clubName}
                onChange={handleChange}
                required
                />
                <i className='bx bxs-building'></i>
            </div>
            <div className="input-box">
                <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                />
                <i className='bx bxs-phone'></i>
            </div>
            <div className="input-box">
                <input
                type="email"
                name="email"
                placeholder="Email ID"
                value={formData.email}
                onChange={handleChange}
                required
                />
                <i className='bx bxs-envelope'></i>
            </div>
            <div className="input-box">
                <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                />
                <i className='bx bxs-lock-alt'></i>
            </div>
            <button type="submit" className="btn"><a href="/login">Register</a></button>
            </form>
        </div>
        </div>
    </div>
  );
}

export default Register;
