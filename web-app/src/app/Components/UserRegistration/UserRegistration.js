import React, { useState } from "react";
import { connect } from "react-redux";
import "./UserRegistration.scss";
import { addUser } from "../../Store/actions/UserRegistrationActions";
import { ROUTES_CONFIG } from "../../Constants/config";
import { fetchPostApi } from "../../Services/fetchUtils";
import Moment from "moment";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Navigate } from "react-router-dom";

const mapStoreToProps = (state) => ({
  currentUser: state.currentUser,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (user) => dispatch(addUser(user)),
  };
};

//const [errors, setErrors] = useState({});

let errorMsg = "";
let userNameErr = "";

/**
 * Renders the User Registration Component
 */
export class UserRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth:false,
      currentUser: {
        username: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
      },
      usernameError: "",
      passwordError: "",
      confirmPasswordError: "",
      firstNamerError: "",
      lastNameError: "",
      emailError: "",
    };
  }
  validateParams = (currentUser) => {
    console.log("USER-->", currentUser);
    let usernameError = "";
    let passwordError = "";
    let confirmPasswordError = "";
    let firstNameError = "";
    let lastNameError = "";
    //Fetch  data from DB
    let emailAddr = "test@gmail.com";
    let userName = "johnDoe";
    let pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    let passwordPattern = new RegExp(
      "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|]).{8,32}$"
    );
    let namePattern = new RegExp("\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+");
    this.userNameErr = "";
    let result = true;

    if (this.state.currentUser.firstName === "") {
      firstNameError = "Please enter your first name!";
      this.setState({ firstNameError });
      result = false;
    }
    // if (!namePattern.test(this.state.currentUser.firstName)) {
    //   firstNameError= 'Only alphabetical characters are allowed!';
    //   this.setState({passwordError});
    //   result=false;
    // }
    if (this.state.currentUser.lastName === "") {
      lastNameError = "Please enter your last name!";
      this.setState({ lastNameError });
      result = false;
    }
    //  if (!namePattern.test(this.state.currentUser.lastName)) {
    //     firstNameError= 'Only alphabetical characters are allowed!';
    //     this.setState({passwordError});
    //     result=false;
    //   }
    if (this.state.currentUser.username === "") {
      usernameError = "Please enter your username!";
      this.setState({ usernameError });
      result = false;
    }

    if (!pattern.test(this.state.currentUser.username)) {
      usernameError = "Invalid email address!";
      this.setState({ usernameError });
      result = false;
    }
    if (this.state.currentUser.password === "") {
      passwordError = "Please enter your password!";
      this.setState({ passwordError });
      result = false;
    }
    // if (!pattern.test(this.state.currentUser.password)) {
    //   passwordError= 'Password must contain: at least 1 lowercase alphabetical character, at least 1 uppercase alphabetical character, at least 1 numeric character, at least one special character and minimum 8 characters ';
    //   this.setState({passwordError});
    //   result=false;
    // }
    if (this.state.currentUser.confirmPassword === "") {
      confirmPasswordError = "Please re-enter your password!";
      this.setState({ confirmPasswordError });
      result = false;
    }
    /*Matching passwords*/
    if (
      this.state.currentUser.password !== "" &&
      this.state.currentUser.confirmPassword !== ""
    ) {
      if (
        this.state.currentUser.password !==
        this.state.currentUser.confirmPassword
      ) {
        confirmPasswordError = "Passwords don't match!";
        this.setState({ confirmPasswordError });
        result = false;
      }
    }
    return result;
  };

  saveUser = () => {
    const url = ROUTES_CONFIG.users_api;
    const body = {
      username: this.state.currentUser.username,
      password: this.state.currentUser.password,
      confirmPassword: this.state.currentUser.confirmPassword,
      firstName: this.state.currentUser.firstName,
      lastName: this.state.currentUser.lastName,
    };

    let status = this.validateParams(this.state.currentUser);
    console.log(status);
    if (status) {
      fetchPostApi(url, body).then((user) => {
        if(user.token){
        //this.props.addUser(user); // once a user is created we have to redirect him to login
        //alert("User Created Successfully!");
        this.setState({isAuth:true});
        }
        else{
          alert("Error Occured", user);
        }

      });
    }
  };

  handleChange = (key, value) => {
    const stateObj = {};
    stateObj[key] = value;
    this.setState((prevState) => ({
      currentUser: Object.assign({}, prevState.currentUser, stateObj),
    }));
  };

  render() {
    if (this.state.isAuth === true) {
      return <Navigate to="/" />;
    }
    return (
      <div className="signup-content register-user">
        <Container>
          <Row className="justify-content-md-center">
            <Col xs={4} md={6}>
              <div className="form-input my-form-input">
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                  <Form.Label className="form-title">
                    Create Account{" "}
                  </Form.Label>
                  <div>
                    <Form.Label className="form-text">First Name </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter First Name"
                      className="input-config"
                      value={this.state.currentUser.firstName}
                      onChange={(event) =>
                        this.handleChange("firstName", event.target.value)
                      }
                    />
                    <div class="error">{this.state.firstNameError}</div>
                  </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicLastName">
                  <Form.Label className="form-text">Last Name </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Last Name"
                    className="input-config"
                    value={this.state.currentUser.lastName}
                    onChange={(event) =>
                      this.handleChange("lastName", event.target.value)
                    }
                  />
                  <div class="error">{this.state.lastNameError}</div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label className="form-text">Username </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Username"
                    className="input-config"
                    value={this.state.currentUser.username}
                    error="Username already exists"
                    onChange={(event) =>
                      this.handleChange("username", event.target.value)
                    }
                  />
                  <div class="error">{this.state.usernameError}</div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="form-text">Password </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    className="input-config"
                    value={this.state.currentUser.password}
                    onChange={(event) =>
                      this.handleChange("password", event.target.value)
                    }
                  />
                  <div class="error">{this.state.passwordError}</div>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicConfirmPassword"
                >
                  <Form.Label className="form-text">
                    Confirm Password{" "}
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    className="input-config"
                    value={this.state.currentUser.confirmPassword}
                    onChange={(event) =>
                      this.handleChange("confirmPassword", event.target.value)
                    }
                  />
                  <div class="error">{this.state.confirmPasswordError}</div>
                </Form.Group>
                
<div className="alignCenter">
                <Button
                  variant="primary"
                  className="btn-success"
                  type="submit"
                  onClick={this.saveUser}
                >
                  Register{" "}
                </Button>
                </div>
                <div className="text-center" >Already have an Account?</div>
                <Row className="text-center"><a href="/login">LOGIN</a></Row>
              </div>

            </Col>

          </Row>
        </Container>
      </div>
    );
  }
}

const ConnectUserRegistration = connect(
  mapStoreToProps,
  mapDispatchToProps
)(UserRegistration);
export default ConnectUserRegistration;
