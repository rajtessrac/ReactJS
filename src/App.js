import './App.css';
import React, { useState } from 'react';
import Modal from './Modal';
import Button from './components/Button';
import { configureBaseURL } from './helpers/AxiosHelper';
import { BASE_URL, PREFERENCE } from './constants';
import authServices from './services/authServices';


function App() {

  const doLogin = async () => {
    console.log('doLogin')
    try {
      const params = {email: 'enrajesh67@gmail.com'};
      const response = await authServices.doLogin(params);
      if (response.message === 'OTP has been sent to your email.') {
        alert(['success'])
      }
      console.log('response: ', response);
    } catch (e) {
      console.log(e);
    } 
  };

  const getUserProfile = async (id) => {
    console.log('doLogin')
    try {
      
      const response = await authServices.getProfile(id);
      console.log('response: ', response);
    } catch (e) {
      console.log(e);
    } 
  };

  const handleVerifyOtp = async (inputOTP) => {
    
    
    const params = {
      email: '',
      otp: inputOTP,
    };
   
    try {
      const response = await authServices.verifyOTP(params);
      if (response?.success === true) {
        
       localStorage.setItem('token', response.authenticatedUser.access);
       localStorage.setItem('isLoggedIn', true);
        const user  = response.authenticatedUser;
        getUserProfile(user.id);
        
        
      } else {
       alert(response?.message || 'Please try again or contact IT team')
      }
    } catch (error) {
      
      alert('Please try again or contact IT team')
      
    } 
  };

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (inputValue) => {
    handleVerifyOtp(inputValue);
    setShowModal(false);
  };


  React.useEffect(() => {
    configureBaseURL(BASE_URL);
    //doLogin();
  }, [])

  

  return (
      <div className="App">
      <h1>React Modal Example</h1>
      <button onClick={handleOpenModal}>Open Modal</button>
      <Modal
        showModal={showModal}
        closeModal={handleCloseModal}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default App;
