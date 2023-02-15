import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import jobFormReducer from './JobFormReducer';
import userRegistrationReducer from './UserRegistrationReducer';
import userLoginReducer from './UserLoginReducer';
import loginFormReducer from './LoginFormReducer';
import authReducer from './AuthReducer';
import AppState from '../state';
import CurrentJobReducer from './CurrentJobReducer';
import ViewJobReducer from './ViewJobReducer';
import applicationsReducer from './ApplicationsReducer';

const createRootReducer = () => combineReducers({
  loginFormReducer: loginFormReducer,
  jobs: jobFormReducer,
  userRegistrationReducer: userRegistrationReducer,
  currentUser:authReducer,
  currentJob:CurrentJobReducer,
  viewCurrentJob:ViewJobReducer,
  applications:applicationsReducer
});

//const createRootReducer = () => reduceReducers(AppState, loginFormReducer, jobFormReducer, userRegistrationReducer, authReducer);

export default createRootReducer;
