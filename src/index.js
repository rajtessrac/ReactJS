import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fortawesome/fontawesome-free/css/all.min.css';

import './index.css';
import reportWebVitals from './reportWebVitals';
import Main from './Main';
import store from './reduxData/store';
import { StoreProvider } from 'easy-peasy';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<StoreProvider store={store}>
    <Main />
</StoreProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
