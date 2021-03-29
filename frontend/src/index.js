import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import axios from 'axios';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

window.axios = axios;
