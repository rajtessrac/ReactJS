import React, { useState } from 'react';
import './Login.css';
import Logo from '../../assets/images/logo.png'
import authServices from '../../services/authServices';
import { useNavigate } from 'react-router-dom';
import FullScreenLoader from '../../components/FullScreenLoader';
import { useStoreActions } from 'easy-peasy';
const Login = () => {

  const navigate = useNavigate();
  const {setUser} = useStoreActions((action) => action.auth);
  const [isVerifyOTP, setVerifyOTP] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputsRef = React.useRef([]);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const doLogin = async () => {
    console.log('doLogin')

    try {
      setIsLoading(true);
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
    finally{
      setIsLoading(false);
    }
  };


  const handleVerifyOTP = async () => {
    setIsLoading(true);
    const params = {
      email,
      otp: otp.join(''),
    };

    try {
      setIsLoading(true);
      const response = await authServices.verifyOTP(params);

      if (response?.success === true) {
        

        localStorage.setItem('token', response.authenticatedUser.access);
        setUser(response.authenticatedUser);
        setVerifyOTP(true)
        navigate('/home')
        
        // getUserProfile(user.id);


      } else {
        alert(response?.message || 'Please try again or contact IT team')
      }
    } catch (error) {

      alert('Please try again or contact IT team')

    }
    finally{
      setIsLoading(false);
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Ensure it's a digit or empty string
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input if the current one is filled and it's not the last one
      if (value !== '' && index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        // Move to the previous input if it's empty and backspace is pressed
        inputsRef.current[index - 1].focus();
      }
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  return (
    <div className="container">
      <div className="left-section">
        <p className='app-sloganle'>Standing up for vedic culture <br />is everyone's responsibility</p>
      </div>
      <div className="right-section">
        {isVerifyOTP === false ? <div className="login-container">
          <img
            src={ Logo }
            alt="Logo"
            className="logo"
          />
          <h2>Let’s Sign In</h2>
          <input type="email" placeholder="Enter Email" className="input-field" onChange={ e => {
            setEmail(e.target.value)
          } } />
          <button className="login-button" onClick={ doLogin } >Login</button>
          <button className="google-signin-button">Sign in with Google</button>
          <div className="terms">
            <a href="/terms">Terms and Conditions</a> |{ ' ' }
            <a href="/privacy">Privacy Policy</a>
          </div>
        </div> : <div div className="login-container" >

          <h3>Let’s Verify OTP</h3>
          <p className='sub-header'>{ `Enter the OTP you received to` }<br/>{`enrajesh67@gmail.com`}</p>
          <div className="otp-inputs">
            { [...Array(4)].map((_, index) => (
              <input
                key={ index }
                type="text"
                maxLength="1"
                className="otp-input"
                value={ otp[index] }
                onChange={ (e) => handleChange(e, index) }
                onKeyDown={ (e) => handleKeyDown(e, index) }
                ref={ (el) => (inputsRef.current[index] = el) } // Store ref for each input
              />
            )) }
          </div>
          <div className='verify-buttons' >
            <button onClick={ handleVerifyOTP } className="verify-button">Verify OTP</button>
            <button onClick={ doLogin } className="resend-button">Resent OTP</button>
          </div>
          <div className="terms">
            <a href="/terms-conditions.html">Terms and Conditions</a> |{ ' ' }
            <a href="/privacy.html">Privacy Policy</a>
          </div>
        </div> }


      </div>
      {isLoading? <FullScreenLoader size={10} />:null}
    </div>
  );
};

export default Login