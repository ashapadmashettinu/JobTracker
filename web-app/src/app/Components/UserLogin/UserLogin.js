import React from "react";
import { connect } from "react-redux";
import "./UserLogin.scss";
import { authUser } from "../../Store/actions/UserLoginActions.js";
import { ROUTES_CONFIG } from "../../Constants/config";
import { fetchPostApi } from "../../Services/fetchUtils";
import Moment from "moment";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import jwt_decode from "jwt-decode";
import { setCurrentUser } from "../../Store/actions/AuthActions";
import { Navigate } from "react-router-dom";

const mapStoreToProps = (state) => ({
  currentUser: state.currentUser,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  };
};

/**
 * Renders the Create/View Todo Component
 */
export class UserLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
      "username": "",
      "password": ""
      // "company": ""

    };
  }
  // static getDerivedStateFromProps(props, state){
  //     if(!state.currentJob.title || state.currentJob.id !== props.currentJob.id)
  //     return {currentJob:props.currentJob};
  //     else
  //     return state;
  // }
  saveUser = () => {
    console.log(this.props);
    const url = ROUTES_CONFIG.login_api;
    const body = {
      "username": this.state.username,
      "password": this.state.password,
    };
    fetchPostApi(url, body).then((data) => {
      const { token } = data;
      if (token) {
        localStorage.setItem("jwtToken", token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user

        if (data && data.token) {
          this.setState({ isAuth: true });
          this.props.setCurrentUser(decoded);
        }
      }
      else {
        alert("Inavlid Credentials!!!")
      }

      //console.log(this.props);
      //this.props.authUser(user); 
      //this.props.authUser(user); // once a user is created we have to redirect him to login
    });
  };

  /**
   * handles the title changes
   * @param {*} value
   */
  // handleChange = function (val, value) {
  //   const objTobeSet = { val: value };
  //   console.log(objTobeSet);
  //   this.setState((prevState) => ({
  //     currentUser: Object.assign({}, prevState.currentUser, objTobeSet),
  //   }));
  // };

  handleChange = (key, value) => {
    //const stateObj = {};
    //stateObj[key] = value;
    //this.setState((prevState) => ({
    // currentUser: Object.assign({}, prevState.currentUser, stateObj),
    //}));
    var stateCopy = Object.assign({}, this.state);
    stateCopy[key] = value;
    this.setState(stateCopy);
    //console.log(value);
  };



  render() {
    if (this.state.isAuth && this.state.isAuth === true) {
      return <Navigate to="/" />
    }
    return (
      <div className="signup-content" styles={{ backgroundImage:`url('../images/signup-bg.jpg')` }}>
        <Container>
          
          <Row className="justify-content-md-center">
            <Col xs={4}>
              <div className="form-input">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="form-title">
                    User Login{" "}
                  </Form.Label>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    placeholder="Enter Username"
                    value={this.state.username}
                    onChange={(event) =>
                      this.handleChange("username", event.target.value)
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={this.state.password}
                    onChange={(event) =>
                      this.handleChange("password", event.target.value)
                    }
                  />
                </Form.Group>
<div className="btnLogin">
                <Button
                  variant="primary"
                  className="btn-success"
                  type="submit"
                  onClick={this.saveUser}
                >
                  Login
                </Button>{" "}
</div>
                <Row className="my-text-center">Not a Registered User Yet?</Row>
                <Row className="text-center"><a href="/register">Sign Up</a></Row>
              </div>


            </Col>
          </Row>

        </Container>
      </div>
    );
  }
}

const ConnectUserLogin = connect(
  mapStoreToProps,
  mapDispatchToProps
)(UserLogin);
export default ConnectUserLogin;
