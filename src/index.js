import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";

import { Provider } from 'react-redux';
import configureStore from './Store/configureStore';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


const store = configureStore(); // You can also pass in an initialState here

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();

