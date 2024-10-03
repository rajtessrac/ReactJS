import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fortawesome/fontawesome-free/css/all.min.css';

import './index.css';
import reportWebVitals from './reportWebVitals';
import Main from './Main';
import store from './reduxData/store';
import { StoreProvider } from 'easy-peasy';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { LoaderProvider } from './provider/LoaderProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId='110807456879-vsg1aeplsioiqtu51qe4e421qop3t7jc.apps.googleusercontent.com'>
        <StoreProvider store={ store }>
            <LoaderProvider>
                <Main />
            </LoaderProvider>
        </StoreProvider>
    </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
