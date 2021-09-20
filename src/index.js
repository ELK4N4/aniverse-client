import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { StoreProvider } from './stores';


ReactDOM.render(
    <StoreProvider>
        <App />
    </StoreProvider>,
    document.getElementById('root')
);