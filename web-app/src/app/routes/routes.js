import React from 'react';
import { Route, Switch } from 'react-router';
import PageNotFound from '../Components/NotFound/PageNotFound';
import JobPosting from '../Components/JobPosting/JobPosting';
import { UserRegistration } from '../Components/UserRegistration/UserRegistration';
import LoginForm from "../Components/LoginForm/LoginForm";
import { PersonalInfo } from '../Components/PersonalInfo/PersonalInfo';
import NavBarComponent from '../Components/Navbar/Navbar';

const routes = (
  <div>
    {/* <NavBarComponent />   
    <Switch>
      <Route exact path="/" component={JobPosting} />
      <Route path="/register" component={UserRegistration} />
      <Route path="/login" component={LoginForm} />
      <Route path="/personalinfo" component={PersonalInfo} />
      <Route component={PageNotFound} />
    </Switch> */}

  </div>
)

export default routes;