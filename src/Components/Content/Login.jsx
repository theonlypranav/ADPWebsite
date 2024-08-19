import React, { useState } from 'react';
import 'boxicons/css/boxicons.min.css';
import './Login.css';
import './Home.css';
import { FaLinkedinIn, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import supabase from '../../supabase';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  // State for username and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if(!error){
        switch(data.user.email)
        {
          case ("pranav100104@gmail.com"):
          {
            navigate('/inventoryadp')
            break;}
          case ("adp@gmail.com"):
            {
              navigate('/inventoryuser')
            }
        }
      }
      else {
        alert(error.message);
      }
    
    // Perform login logic here
    // console.log('Username:', username);
    // console.log('Password:', password);
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
