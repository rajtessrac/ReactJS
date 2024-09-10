import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Navigate, Route } from 'react-router-dom';
import Login from './screens/login/Login';
import Home from './screens/home/Home';
import { useStoreRehydrated } from 'easy-peasy';
import { configureBaseURL } from './helpers/AxiosHelper';
import { BASE_URL } from './constants';
import FullScreenLoader from './components/FullScreenLoader';

// Simulate user authentication
const isAuthenticated = () => {
    // Retrieve token from localStorage or cookies
    const token = localStorage.getItem('token');

    // Check if token is null or expired (for simplicity, assume non-null means valid)
    return token !== null;
};

const Main = () => {
     const isRehydrated = useStoreRehydrated();
    React.useEffect(() => {
        configureBaseURL(BASE_URL);
      }, [])
    
    
    return (
        <>
        {isRehydrated?    <Router>
            <Routes>
                <Route
                    path="/"
                    element={ isAuthenticated()  ? <Home /> : <Navigate to="/login" /> }
                />
                <Route path="/login" element={ <Login /> } />
                <Route path="/home" element={ isAuthenticated()  ? <Home /> : <Navigate to="/login" /> } />

            </Routes>
        </Router>:<FullScreenLoader size={8} />}
    
        </>
    );
};


export default Main;