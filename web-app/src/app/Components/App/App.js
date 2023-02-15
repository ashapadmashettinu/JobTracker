import React from "react";
import PropTypes from "prop-types";
import "./App.scss";
import logo from "./logo3.png";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  Navigate,
  useLocation
} from "react-router-dom";
import { history } from "../../Store/store";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { logoutUser } from "../../Services/loginUtils";
import { setCurrentUser } from "../../Store/actions/AuthActions";
import { setJobApplication } from "../../Store/actions/JobApplicationActions";
import PageNotFound from "../NotFound/PageNotFound";
import JobPosting from "../JobPosting/JobPosting";
import  UserRegistration  from "../UserRegistration/UserRegistration";
import LoginForm from "../LoginForm/LoginForm";
import  UserLogin from "../UserLogin/UserLogin";
import PersonalInfo from "../PersonalInfo/PersonalInfo";
import JobTrackerBoard from "../JobTrackerBoard/JobTrackerBoard";
import NavBarComponent from "../Navbar/Navbar";
import AuthRoute from "../../routes/AuthRoute";
import EducationSkills  from "../EducationSkills/EducationSkills";
import  JobCatalog  from "../JobCatalog/JobCatalog";
import { fetchGetApi } from "../../Services/fetchUtils";
import { ROUTES_CONFIG } from "../../Constants/config";
import { setJobs } from "../../Store/actions/JobFormActions";
import MyJobs from "../JobPosting/MyJobs";
import Footer from "../Footer/Footer";
import { HomeComponent } from "../Home/Home";

const mapStoreToProps = (state) => ({
  currentUser: state.currentUser,
  jobs: state.jobs,
  applications:state.applications
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setJobs:jobs => dispatch(setJobs(jobs)),
  setJobApplication:applications => dispatch(setJobApplication(applications))
});

export class App extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { isAuth: false, redirectCatalog:undefined };
    this.auth();
  }
  componentDidMount(){
    /**
     * setting jobs when the component initializes
     */
    fetchGetApi(ROUTES_CONFIG.jobs_api).then((jobs) => {
      if(jobs.length > 0){
        this.props.setJobs(jobs);
      }
    });
    fetchGetApi(ROUTES_CONFIG.applications_api).then((applications) => {
      if(applications.length > 0){
        this.props.setJobApplication(applications);
      }
    })
  }
  
  auth() {
    // Check for token to keep user logged in
    if (localStorage.jwtToken) {
      // Set auth token header auth
      const token = localStorage.jwtToken;
      if(token){
        const decoded = jwt_decode(token);
        // Set user and isAuthenticated
        this.props.setCurrentUser(decoded);
      
      //Check for expired token
      const currentTime = Date.now() / 1000; // to get in milliseconds
      if (decoded.exp < currentTime) {
        // Logout user
        this.logout();
        // Redirect to login
        //this.setState({isAuth:false});
      }
    }
    }
  }

  logout = () =>{
    localStorage.removeItem("jwtToken");
    // Set current user to empty object {} which will set isAuthenticated to false
    this.props.setCurrentUser({currentUser:{isAuthenticated:false}});
    // Redirect to login
    window.location.href = "./login";
  }

  navigateCatalog = (routeParam) => {
    console.log(routeParam)
    this.setState({redirectCatalog:routeParam});
  }

  render() {
    console.log(this.state);
    if(this.state.redirectCatalog){
      const route = "/jobs?"+this.state.redirectCatalog ;
      window.location.href = route;
    }

    return (
      <div className="page-container">
      <Router history={history}>
        <>
        <NavBarComponent {...this.props} navigateCatalog={this.navigateCatalog} logout={this.logout} />
        </>
        <div className="content-body-wrap">
        <Routes>
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserRegistration />} />
          <Route exact path="/" element={<AuthRoute><HomeComponent /></AuthRoute>}/>
          <Route path="/jobs" element={<AuthRoute><JobCatalog /></AuthRoute>}/>
          <Route path="/job-tracker" element={<AuthRoute><JobTrackerBoard /></AuthRoute>}/>
          <Route path="/job-post" element={<AuthRoute><JobPosting /></AuthRoute>}/>
          <Route path="/personalinfo" element={<AuthRoute><PersonalInfo /></AuthRoute>}/>
          <Route path="/educationskills" element={<AuthRoute><EducationSkills /></AuthRoute>}/>
          <Route path="/myjobs" element={<AuthRoute><MyJobs /></AuthRoute>}/>
          <Route element={<PageNotFound />} />
          {/* <Route path="/job-apply" element={<AuthRoute><ApplyJob /></AuthRoute>}/> */}
          {/* <Route path="/jobs" element={<AuthRoute><JobCatalog /></AuthRoute>}/> */}
        
          {/* <AuthRoute path="/personalinfo" element={<PersonalInfo />} />
          <AuthRoute exact path="/" element={<JobTrackerBoard />} />
          <AuthRoute exact path="/job-tracker" element={<JobTrackerBoard />} />
          <AuthRoute path="/job-post" element={<JobPosting />} />
          <AuthRoute path="/personalinfo" element={<PersonalInfo />} /> */}
          {/* <Route path="/jobs" element={<JobCatalog />} /> */}  
        </Routes>
        </div>
      </Router>

      <Footer/>
      </div>
    );
  }
}

export default connect(mapStoreToProps, mapDispatchToProps)(App);