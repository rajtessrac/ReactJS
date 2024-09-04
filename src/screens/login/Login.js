import React, { useState } from 'react';
import './Login.css';
import Logo from '../../assets/images/logo.png'
import authServices from '../../services/authServices';
import { configureBaseURL } from '../../helpers/AxiosHelper';
import { BASE_URL } from '../../constants';
import { useNavigate } from 'react-router-dom';
const Login = () => {

  const navigate = useNavigate();
  const [isVerifyOTP, setVerifyOTP] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  React.useEffect(() => {
    configureBaseURL(BASE_URL);
}, [])

  const doLogin = async () => {
    console.log('doLogin')
    
    try {
      const params = { email };
      const response = await authServices.doLogin(params);
    
      if (response.message === 'OTP has been sent to your email.') {
        console.log('done success')
        setVerifyOTP(true)
      }
      console.log('response: ', response);
    } catch (e) {
      console.log(e);
    }
  };


  const handleVerifyOTP = async() => {
    const params = {
      email,
      otp,
    };
   
    try {
      const response = await authServices.verifyOTP(params);
      
      if (response?.success === true) {
        alert(response?.success)
        
       localStorage.setItem('token', response.authenticatedUser.access);
       localStorage.setItem('user', user);
        const user  = response.authenticatedUser;
        navigate('/home'); 
       // getUserProfile(user.id);

        
      } else {
       alert(response?.message || 'Please try again or contact IT team')
      }
    } catch (error) {
      
      alert('Please try again or contact IT team')
      
    } 
  };

  return (
    <div className="container">
      <div className="left-section">
        <p className='title'>Standing up for vedic culture <br />is everyone's responsibility</p>
      </div>
      <div className="right-section">
        {isVerifyOTP === false ? <div className="login-container">
          <img
            src={ Logo }
            alt="Logo"
            className="logo"
          />
          <h2>Let’s Sign In</h2>
          <input type="email" placeholder="Enter Email" className="input-field" onChange={e=>{
            setEmail(e.target.value)
          }} />
          <button className="login-button" onClick={ doLogin } >Login</button>
          <button className="google-signin-button">Sign in with Google</button>
          <div className="terms">
            <a href="/terms">Terms and Conditions</a> |{ ' ' }
            <a href="/privacy">Privacy Policy</a>
          </div>
        </div> : <div div className="login-container" >

          <h3>Let’s Verify OTP</h3>
          <p>{`Enter the OTP you received to [${email}]`}</p>
          <div className="otp-inputs">
            { [...Array(4)].map((_, index) => (
              <input
                key={ index }
                type="text"
                maxLength="1"
                className="otp-input"
                value={ otp[index] || '' }
                onChange={ (e) => setOtp(prev => prev.slice(0, index) + e.target.value + prev.slice(index + 1)) }
              />
            )) }
          </div>
          <div className='verify-buttons' >
          <button onClick={ handleVerifyOTP } className="verify-button">Verify OTP</button>
          <button onClick={ doLogin } className="resend-button">Resent OTP</button>
          </div>
          <div className="terms">
            <a href="/terms">Terms and Conditions</a> |{ ' ' }
            <a href="/privacy">Privacy Policy</a>
          </div>
        </div> }


      </div>
    </div>
  );
};

export default Login