import React from 'react';
import './Login.css';
import Logo from '../../assets/images/logo.png'
const Login = () => {
  return (
    <div className="container">
      <div className="left-section">
        <p className='title'>Standing up for vedic culture <br/>is everyone's responsibility</p>
      </div>
      <div className="right-section">
        <div className="login-container">
          <img
            src={Logo}
            alt="Logo"
            className="logo"
          />
          <h2>Let’s Sign In</h2>
          <input type="email" placeholder="Enter Email" className="input-field" />
          <button className="login-button">Login</button>
          <button className="google-signin-button">Sign in with Google</button>
          <div className="terms">
            <a href="/terms">Terms and Conditions</a> |{' '}
            <a href="/privacy">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login