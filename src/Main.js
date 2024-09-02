import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Navigate, Route } from 'react-router-dom';
import Login from './screens/login/Login';
import Home from './screens/home/Home';

// Simulate user authentication
const isAuthenticated = () => {
    return !!localStorage.getItem('isLoggedIn');
};

const Main = () => {
    const [auth, setAuth] = useState(isAuthenticated());

    // Redirect to home if already logged in
    useEffect(() => {
        if (auth) {
            window.location.href = '/home';
        }
    }, [auth]);

    return (
        <Router>
            <Routes>
                <Route exact path="/">
                    { auth ? <Navigate to="/home" /> : <Login setAuth={ setAuth } /> }
                </Route>
                <ProtectedRoute path="/home" component={ Home } auth={ auth } />
            </Routes>
        </Router>
    );
};

// Protected Route component
const ProtectedRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        { ...rest }
        render={ (props) =>
            auth ? <Component { ...props } /> : <Navigate to="/" />
        }
    />
);

export default Main;