import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Navigate, Route } from 'react-router-dom';
import Login from './screens/login/Login';
import Home from './screens/home/Home';

// Simulate user authentication
const isAuthenticated = () => {
    // Retrieve token from localStorage or cookies
    const token = localStorage.getItem('token');

    // Check if token is null or expired (for simplicity, assume non-null means valid)
    return token !== null;
};

const Main = () => {
 
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={ isAuthenticated() ? <Home /> : <Navigate to="/login" /> }
                />
                <Route path="/login" element={ <Login /> } />
                <Route path="/home" element={ isAuthenticated() ? <Home /> : <Navigate to="/login" /> } />

            </Routes>
        </Router>
    );
};


export default Main;