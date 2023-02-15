import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './app/Components/App/App';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import store, {history} from './app/Store/store';

import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import PageNotFound from './app/Components/NotFound/PageNotFound';
import JobPosting from './app/Components/JobPosting/JobPosting';
import { UserRegistration } from './app/Components/UserRegistration/UserRegistration';
import LoginForm from "./app/Components/LoginForm/LoginForm";
import { PersonalInfo } from './app/Components/PersonalInfo/PersonalInfo';

/**
 * This file has the main App
/** 
 * start of the file
 */

ReactDOM.render(
  <Provider store={store}>
     <App/>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

/** end of file  */
