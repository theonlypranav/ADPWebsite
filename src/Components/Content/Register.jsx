import React, { useState } from 'react';
import 'boxicons/css/boxicons.min.css';
import './Register.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Register() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [formData, setFormData] = useState({
    cordName: '',
    clubName: '',
    mobile: '',
    email: '',
    password: '',
    verificationCode: '', // State for OTP
  });
  const [otpSent, setOtpSent] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://adp-backend-bzdrfdhvbhbngbgu.southindia-01.azurewebsites.net/api/users/request-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });
      const result = await response.json();
      if (response.ok) {
        setOtpSent(true);
        alert('OTP sent to your email.');
      } else {
        alert(result.error || 'Failed to send OTP.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('An error occurred while sending OTP.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsRegistering(true);
    try {
      const response = await fetch('https://adp-backend-bzdrfdhvbhbngbgu.southindia-01.azurewebsites.net/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        alert('Registration successful!');
        navigate('/login'); // Redirect to login page
      } else {
        alert(result.error || 'Registration failed.');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert('An error occurred during registration.');
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="register-page">
      <div id="register">
        <div className="wrapper">
          <form>
            <h1>Register</h1>
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
                type="text"
                name="cordName"
                placeholder="Co-ordinator Name"
                value={formData.cordName}
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
                name="mobile"
                placeholder="Phone Number"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
              <i className='bx bxs-phone'></i>
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
            {otpSent && (
              <div className="input-box">
                <input
                  type="text"
                  name="verificationCode"
                  placeholder="Verification Code"
                  value={formData.verificationCode}
                  onChange={handleChange}
                  required
                />
                <i className='bx bxs-lock-alt'></i>
              </div>
            )}
            <button type="button" className="btn" onClick={handleSendOtp}>
              {otpSent ? 'Resend OTP' : 'Get OTP At Email'}
            </button>
            <button
              type="button"
              className="btn"
              onClick={handleRegister}
              disabled={isRegistering}
            >
              {isRegistering ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
