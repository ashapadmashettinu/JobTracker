import React from "react";
import { connect } from "react-redux";
import "./JobApplication.scss";
import { addJobApplication } from "../../Store/actions/JobApplicationActions";
import { ROUTES_CONFIG } from "../../Constants/config";
import { fetchPostApi } from "../../Services/fetchUtils";
import Moment from "moment";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Modal, ModalHeader } from "react-bootstrap";

const mapStoreToProps = (state) => ({
  currentApplication: state.currentApplication,
  currentUser:state.currentUser,
  viewCurrentJob:state.viewCurrentJob
});

const mapDispatchToProps = (dispatch) => {
  return {
    jobApplication: (user) => dispatch(addJobApplication(user)),
  };
};

/**
 * Renders the Apply to the job
 */
export class UserApplication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobid:"",
      userid:"",
      recruiter:"",
      currentApplication: {
        firstName: "",
        lastName: "",
        email: "",
        resume: "",
        description: "",
      },
    };
  }

  static getDerivedStateFromProps(props, state){
    console.log(props);
    if(props.currentApplication && props.currentApplication.id){
      if(state.currentApplication && !state.currentApplication.id || state.currentApplication.id !== props.selecteduser.id){
        return {currentApplication:props.selecteduser};
      }
    }
      return state;
  }


  saveApplication = () => {
    const url = ROUTES_CONFIG.applications_api;
    const body = {
      jobId:this.props.job.id,
      jobTitle:this.props.job.jobTitle,
      company:this.props.job.company,
      applicantId:this.props.selecteduser.id,
      recruiterId:this.props.recruiterid,
      firstName: this.state.currentApplication.firstName,
      lastName: this.state.currentApplication.lastName,
      email: this.state.currentApplication.email,
      resume: this.state.currentApplication.resume,
      description: this.state.currentApplication.description,
    };
    fetchPostApi(url, body).then((user) => {
      this.props.jobApplication(user);
      const emailbody={ 
        "to":this.state.currentApplication.email,
        "subject":"Job Application sent to - " + this.props.job.company,
        "body":"Dear " + this.state.currentApplication.lastName + " Thank you for your application!!!!! Your job application is sent to the recruiter. They will contact you at anytime."
    }
      fetchPostApi(ROUTES_CONFIG.mail_api, emailbody).then((res) => {
      if(res.accepted.length > 0){
        alert("Job Application successfully sent.. Check your email!!");
      }
    });
    });
  };

  /**
   * handles the title changes
   * @param {*} value
   */

  handleChange = (key, value) => {
    const stateObj = {};
    stateObj[key] = value;
    this.setState((prevState) => ({
      currentApplication: Object.assign(
        {},
        prevState.currentApplication,
        stateObj
      ),
    }));
  };
  render() {
    return (
      <div className="">
         <Modal {...this.props} size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Job Application
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Row className="justify-content-md-center">
            <Col xs={12}>
              <div className="form-input">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="form-title">
                    {" "}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    value={this.state.currentApplication.firstName}
                    onChange={(event) =>
                      this.handleChange("firstName", event.target.value)
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    value={this.state.currentApplication.lastName}
                    onChange={(event) =>
                      this.handleChange("lastName", event.target.value)
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    placeholder="Email address"
                    value={this.state.currentApplication.email}
                    onChange={(event) =>
                      this.handleChange("email", event.target.value)
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicResume">
                  <Form.Label className="resume-label">Resume</Form.Label>
                  <Form.Control
                    type="file"
                    className="form-control-file"
                    placeholder="Resume"
                    value={this.state.currentApplication.resume}
                    onChange={(event) =>
                      this.handleChange("resume", event.target.value)
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicDescription">
                  <Form.Control
                    type="text"
                    placeholder="Description"
                    value={this.state.currentApplication.description}
                    onChange={(event) =>
                      this.handleChange("description", event.target.value)
                    }
                  />
                </Form.Group>
              </div>
            </Col>
            {/* <div className="btn-primary">
              <Button
                variant="primary"
                className="btn-primary"
                type="submit"
                onClick={this.saveApplication}
              >
                Apply{" "}
              </Button>
            </div> */}
          </Row>
          </Modal.Body>
      <Modal.Footer>
      <Button
                variant="primary"
                className="btn-success"
                type="button"
                onClick={this.saveApplication}
              >
                Apply{" "}
              </Button>

        {/* <Button onClick={this.props.onHide}>Close</Button> */}
      </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const ConnectUserApplication = connect(
  mapStoreToProps,
  mapDispatchToProps
)(UserApplication);
export default ConnectUserApplication;
