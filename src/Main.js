import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Navigate, Route } from 'react-router-dom';
import Login from './screens/login/Login';
import Home from './screens/home/Home';
import { useStoreActions, useStoreRehydrated } from 'easy-peasy';
import { configureBaseURL } from './helpers/AxiosHelper';
import { BASE_URL } from './constants';
import FullScreenLoader from './components/FullScreenLoader';
import('./helpers/ReactotronConfig')



const Main = () => {
    const { setUser } = useStoreActions((action) => action.auth);
    // Simulate user authentication
    const isAuthenticated = () => {
        // Retrieve token from localStorage or cookies
        const token = localStorage.getItem('token');

        // Check if token is null or expired (for simplicity, assume non-null means valid)
        return token !== null;
    };

    const setUserData = () => {

        // Retrieve token from localStorage or cookies
        const user = localStorage.getItem('user');
        if (user !== null) {
            setUser(JSON.parse(user));
            console.log('user', user);
        }
    };
    const isRehydrated = useStoreRehydrated();
    React.useEffect(() => {
        setUserData();
        configureBaseURL(BASE_URL);
    }, [])


    return (
        <>
            { isRehydrated ? <Router>
                <Routes>
                    <Route
                        path="/"
                        element={ isAuthenticated() && isRehydrated ? <Home /> : <Navigate to="/login" /> }
                    />
                    <Route path="/login" element={ <Login /> } />
                    {/* <Route path="/home" element={ isAuthenticated()  ? <Home /> : <Navigate to="/login" /> } /> */ }
                    <Route path="/home" element={ <Home /> } />
                </Routes>
            </Router> : <FullScreenLoader size={ 8 } /> }

        </>
    );
};


export default Main;