import React, { useState } from 'react';
import 'boxicons/css/boxicons.min.css';
import './Login.css';
import './Home.css';
import { FaLinkedinIn, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  // State for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Perform login logic here (e.g., navigate based on email)
    if (email === "pranav100104@gmail.com" || email === "inventory@adp.com") {
      navigate('/inventoryadp');
    } else if (email === "adp@gmail.com") {
      navigate('/inventoryuser');
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className='wrapper-pro'>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <i className='bx bxs-user'></i>
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className='bx bxs-lock-alt'></i>
          </div>
          <div className="remember-forget">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#">Forget Password?</a>
          </div>
          <button type="submit" className="btn">Login</button>
          <div className="register-link">
            <p>Don't have an account? <a href="/register">Register</a></p>
          </div>
          <div className="tech-support">
            <p>Tech Support <a href="http://wasap.my/919937020000"><FaWhatsapp className="icon-glow text-silver-700 hover:text-silver-500" /></a></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
