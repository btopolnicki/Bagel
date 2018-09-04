import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as auth from './auth';
import * as firebase from './firebase';
import App from './components/app';
import Home from './components/home'

export {
  auth,
  firebase,
};

ReactDOM.render(
  (
    <div>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </div>
  ), document.querySelector('.container1'));
