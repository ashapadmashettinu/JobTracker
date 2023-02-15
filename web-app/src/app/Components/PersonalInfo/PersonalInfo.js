import React from "react";
import { connect } from "react-redux";
import "./PersonalInfo.scss";
import { Navigate } from "react-router-dom";
import { addPersonalInfo } from "../../Store/actions/JobFormActions";
import { fetchPutApi } from "../../Services/fetchUtils";
import { ROUTES_CONFIG } from "../../Constants/config";
import Moment from "moment";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import TextAreaFormat from "../FormElements/TextAreaFormat";
import AddressWithStreet from "../Address/AddressWithStreet";
import { updateUser } from "../../Store/actions/UpdateUserActions";

const mapStoreToProps = (state) => ({
  currentUser: state.currentUser,
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user)),
  };
};

/**
 * Renders the Create/View Todo Component
 */
export class PersonalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showContinueRouter: false,
      currentUser: {
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
        about: "",
        address: {},
      },
      firstNameError: "",
      lastNameError: "",
      aboutError: "",
      mobileNumberError: "",
      addressError: "",
      emailError: "",
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (!state.currentUser.id || state.currentUser.id !== props.currentUser.id)
      return { currentUser: props.currentUser };
    else return state;
  }

  validateParams = (currentUser) => {
    console.log("USER-->", currentUser);
    let firstNameError = "";
    let lastNameError = "";
    let aboutError = "";
    let mobileNumberError = "";
    let addressError = "";
    let emailError = "";
    //Fetch  data from DB

    let pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    let namePattern = new RegExp("\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+");
    let phonePattern = new RegExp("/^[0-9\b]+$/");
    this.userNameErr = "";
    let result = true;

    if (this.state.currentUser.firstName === "") {
      firstNameError = "Please enter your first name!";
      this.setState({ firstNameError });
      result = false;
    }
    if (!namePattern.test(this.state.currentUser.firstName)) {
      firstNameError = "Only alphabetical characters are allowed!";
      this.setState({ firstNameError });
      result = false;
    }
    if (this.state.currentUser.lastName === "") {
      lastNameError = "Please enter your last name!";
      this.setState({ lastNameError });
      result = false;
    }
    if (!namePattern.test(this.state.currentUser.lastName)) {
      lastNameError = "Only alphabetical characters are allowed!";
      this.setState({ lastNameError });
      result = false;
    }

    if (!pattern.test(this.state.currentUser.email)) {
      emailError = "Invalid email address!";
      this.setState({ emailError });
      result = false;
    }
    if (!phonePattern.test(this.state.currentUser.mobileNumber)) {
      mobileNumberError = "Invalid phone number!";
      this.setState({ mobileNumberError });
      result = false;
    }
    return result;
  };

  updatePersonalInfo = () => {
    const body = {
      firstName: this.state.currentUser.firstName,
      lastName: this.state.currentUser.lastName,
      email: this.state.currentUser.email,
      mobileNumber: this.state.currentUser.mobileNumber,
      about: this.state.currentUser.about,
      address: this.state.currentUser.address,
    };
    let url = ROUTES_CONFIG.users_api;
    let status = this.validateParams(this.state.currentUser);
    if (status) {
      fetchPutApi(url + +this.props.currentUser.id, body).then((user) => {
        //console.log("here");
        this.props.updateUser(user);
      });
    }
  };

  /**
   * handles the title changes
   * @param {*} value
   */
  handleOnChange = (keyParam, value) => {
    var stateCopy = Object.assign({}, this.state);
    stateCopy.currentUser[keyParam] = value;
    this.setState(stateCopy);
  };

  setAddress = (key, value) => {
    var stateCopy = Object.assign({}, this.state);
    //console.log(stateCopy);
    if(!stateCopy.currentUser.address){
      stateCopy.currentUser.address ={}
    }
    stateCopy.currentUser.address[key] = value;
    this.setState(stateCopy);
  };

  handleDescriptionChange = (e, data) => {
    this.handleOnChange("about", data);
  };

  handleContinue = () => {
    var stateCopy = Object.assign({}, this.state);
    stateCopy["showContinueRouter"] = true;
    this.setState(stateCopy);
  };

  render() {
    if (this.state.showContinueRouter === true) {
      return <Navigate to="/educationskills" />;
    }
    return (
      <div className="container-app">
        <div className="form-input">
          <h4 className="text-lg-center text-dark"> Personal Information </h4>
          <Row>
            <Col xs={4} md={6} >
              <Form.Group className="mb-3" controlId="formBasicInfo">
                {/* <Form.Label column sm ={6}> First Name </Form.Label> */}
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  value={this.state.currentUser.firstName}
                  onChange={(event) =>
                    this.handleOnChange("firstName", event.target.value)
                  }
                />
              </Form.Group >


              <Form.Group>
                <div class="error">{this.state.confirmPasswordError}</div>
                {/* <Form.Label column sm ={6}> Email Address </Form.Label> */}
                <Form.Control
                  type="text"
                  placeholder="Enter email address"
                  value={this.state.currentUser.email}
                  onChange={(event) =>
                    this.handleOnChange("email", event.target.value)
                  }
                />
              </Form.Group>


              <Form.Group>
                {/* <Form.Label column sm ={6}> Date Of Birth </Form.Label> */}
                <Form.Control
                  type="date"
                  placeholder="Date of Birth"
                  value={Moment(this.state.currentUser.dob).format("YYYY-MM-DD")}
                  max={new Date().toISOString().split("T")[0]}
                  required
                  onChange={(event) => this.handleOnChange("dob", event.target.value)}
                /> </Form.Group>



            </Col>


            <Col xs={4} md={6}>
              <Form.Group className="mb-3">
                <div class="error">{this.state.confirmPasswordError}</div>
                {/* <Form.Label> Last Name </Form.Label> */}
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  value={this.state.currentUser.lastName}
                  onChange={(event) =>
                    this.handleOnChange("lastName", event.target.value)
                  }
                /></Form.Group>

              <Form.Group>
                {/* <Form.Label> Mobile Number </Form.Label> */}
                <Form.Control
                  type="text"
                  placeholder="Enter Mobile Number"
                  value={this.state.currentUser.mobileNumber}
                  onChange={(event) =>
                    this.handleOnChange("mobileNumber", event.target.value)
                  }
                />
              </Form.Group>

            </Col>

          </Row>

          <Form.Group>
            <Form.Label> About </Form.Label>
            <TextAreaFormat
              handleDescriptionChange={this.handleDescriptionChange}
            />

            {/* <Form.Label>About</Form.Label>
                                  <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter description"
                                    value={this.state.currentUser.about}
                                    onChange={(event) =>
                                      this.handleOnChange("about", event.target.value)
                                    }
                                  /> */}

          <AddressWithStreet
            setAddress={this.setAddress}
          />

            {/* <Form.Label>Address</Form.Label>
                                  <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter Address"
                                    value={this.state.currentUser.address}
                                    onChange={(event) =>
                                      this.handleOnChange("address", event.target.value)
                                    }
                                  /> */}
          </Form.Group>

        </div>
        <div className="btnGap">
          <Button
            variant="primary"
            type="button"
            className="btn-success"
            onClick={this.updatePersonalInfo}
          >
            {" "}
            {""}
            Save{" "}
          </Button>

          <Button
            className="btn-success"
            variant="primary"
            type="button"
            onClick={this.handleContinue}
          >
            Add Career Info{" "}
          </Button>
        </div>

      </div>
    );
  }
}

const ConnectPersonalInfo = connect(
  mapStoreToProps,
  mapDispatchToProps
)(PersonalInfo);
export default ConnectPersonalInfo;
