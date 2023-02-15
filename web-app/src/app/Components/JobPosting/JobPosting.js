import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./JobPosting.scss";
import { addJob, updateJob } from "../../Store/actions/JobFormActions";
import { ROUTES_CONFIG } from "../../Constants/config";
import { fetchPostApi, fetchPutApi } from "../../Services/fetchUtils";
import Moment from "moment";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Address from "../Address/Address";
import { ImageUpload } from "../FormElements/ImageUpload";
import { Navigate } from "react-router-dom";
import { category, employmentTypes } from "../../Constants/constants";
import TextAreaFormat from "../FormElements/TextAreaFormat";
import { Container } from "react-bootstrap";

const mapStoreToProps = (state) => ({
  currentUser: state.currentUser,
  currentJob: state.currentJob,
  jobs: state.jobs,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addJob: (job) => dispatch(addJob(job)),
    updateJob: myJob => dispatch(updateJob(myJob)),
  };
};

/**
 * Renders the Create Job Component
 */
export class JobPosting extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      showOtherRouter: false,
      employmentType: employmentTypes,
      category: category,
      notvalidated: false,
      currentJob: {
        jobTitle: "",
        description:"<p><strong>Required Qualifications</strong><br>&nbsp;</p><ul><li>Bachelor's Degree in Computer Science or related field and/or related experience</li><li>3-5 years of experience in systems analysis or application programming development</li><li>Experience in large scale Agile SDLC</li><li>Must be passionate about contributing to an organization focused on continuously improving consumer experiences<br>&nbsp;</li></ul><p><strong>Preferred Qualifications</strong><br>&nbsp;</p><ul><li>Master's Degree<br>&nbsp;</li></ul><p><strong>Additional Information</strong></p>",
        company: "",
        salary: { min: 0, max: 0 },
        address: {},
        category: "engineering",
        employmentType: "fulltime",
        logo: "",
      },
    };
  }
  static getDerivedStateFromProps(props, state){
    console.log(props);
    if(props.currentJob && props.currentJob.jobTitle){
      if(state.currentJob && !state.currentJob.jobTitle || state.currentJob.id !== props.currentJob.id){
        return {currentJob:props.currentJob};
      }
    }
      return state;
  }
  saveJob = (status) => {
    const {
      jobTitle,
      description,
      company,
      salary,
      address,
      category,
      employmentType
    } = this.state.currentJob;
    if(!jobTitle ||
      !description ||
      !company ||
      !salary ||
      !address && address.city && address.city.label ||
      !category ||
      !employmentType
    ) {
      this.setState({ notvalidated: true });
      return;
    }

    const body = {
      jobTitle: this.state.currentJob.jobTitle,
      company: this.state.currentJob.company,
      description: this.state.currentJob.description,
      employmentType: this.state.currentJob.employmentType,
      category: this.state.currentJob.category,
      salary: this.state.currentJob.salary,
      address: this.state.currentJob.address,
      logo: this.state.currentJob.logo,
      recruiter: this.props.currentUser.id,
    };
    if(status){
      body.status = true;
    }
    let url = ROUTES_CONFIG.jobs_api;
    if(this.props.currentJob.id){
      fetchPutApi(url+this.props.currentJob.id, body).then((job) => {
        //console.log("here");
        this.props.updateJob(job);
        this.clearState();
      });
    }else{
    fetchPostApi(url, body).then((job) => {
      //console.log("here");
      this.props.addJob(job);
    });
  }
  };

  clearState(){
    this.setState({currentJob:{
      id:"",
      jobTitle: "",
      description:"<p><strong>Required Qualifications</strong><br>&nbsp;</p><ul><li>Bachelor's Degree in Computer Science or related field and/or related experience</li><li>3-5 years of experience in systems analysis or application programming development</li><li>Experience in large scale Agile SDLC</li><li>Must be passionate about contributing to an organization focused on continuously improving consumer experiences<br>&nbsp;</li></ul><p><strong>Preferred Qualifications</strong><br>&nbsp;</p><ul><li>Master's Degree<br>&nbsp;</li></ul><p><strong>Additional Information</strong></p>",
      company: "",
      salary: { min: 0, max: 0 },
      address: {},
      category: "engineering",
      employmentType: "fulltime",
      logo: "",
    }}); 
  }

  savePost = () =>{
    this.saveJob(true);
  }

  handleOnChange = (key, value) => {
    console.log(key, value);
    var stateCopy = Object.assign({}, this.state);
    stateCopy.currentJob[key] = value;
    this.setState(stateCopy);
    // console.log(this.state);
  };

  setAddress = (key, value) => {
    var stateCopy = Object.assign({}, this.state);
    stateCopy.currentJob.address[key] = value;
    this.setState(stateCopy);
  };

  setStateFileName = (value) => {
    var stateCopy = Object.assign({}, this.state);
    stateCopy.currentJob["logo"] = value.fileName;
    this.setState(stateCopy);
    console.log(this.state);
  };

  handleContinue = () => {
    var stateCopy = Object.assign({}, this.state);
    stateCopy["showOtherRouter"] = true;
    this.setState(stateCopy);
  };
  handleDescriptionChange = (e, data) => {
    this.handleOnChange("description", data);
    console.log(this.state);
  };

  render() {
    if (this.state.showOtherRouter === true) {
      return <Navigate to="/job-description" />;
    }
    return (
      <Container>
        <div className="job-post form-input">
        <Form noValidate validated={this.state.notvalidated}>
          <Row>
          <h4 className="text-center text-dark"> Post a Job</h4>
            <Col></Col>
            <Col xs md lg={5} className="column1">
              
              <br />
              <br />
              <div className="form-group">
                {/* <Form.Label>Category</Form.Label> */}
                <label className="mb-0">
                  Job Title<span className="text-success">*</span>
                </label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter Job Title"
                  value={this.state.currentJob.jobTitle}
                  onChange={(event) =>
                    this.handleOnChange("jobTitle", event.target.value)
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Please enter Job Title
                </Form.Control.Feedback>
              </div>

              <div className="form-group">
                {/* <Form.Label>Category</Form.Label> */}
                <label className="mb-0">
                  Company<span className="text-success">*</span>
                </label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter Company"
                  value={this.state.currentJob.company}
                  onChange={(event) =>
                    this.handleOnChange("company", event.target.value)
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Please enter Company
                </Form.Control.Feedback>
              </div>

              <div className="form-group">
                {/* <Form.Label>Category</Form.Label> */}
                <label className="mb-0">
                  Salary<span className="text-success">*</span>
                </label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputsalary">$</InputGroup.Text>
                  <Form.Control
                    type="number"
                    placeholder="14000"
                    aria-describedby="inputsalary"
                    required
                    value={this.state.currentJob.salary}
                    onChange={(event) =>
                      this.handleOnChange("salary", event.target.value)
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a salary
                  </Form.Control.Feedback>
                </InputGroup>
              </div>

              <div className="form-group">
                {/* <Form.Label>Category</Form.Label> */}
                <label className="mb-0">
                  Category<span className="text-success">*</span>
                </label>
                <Form.Select
                  aria-label="Category"
                  onChange={(event) =>
                    this.handleOnChange("category", event.target.value)
                  }
                  value={this.state.currentJob.category}
                >
                  {this.state.category.map((item, i) => (
                    <option key={i} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Form.Select>
              </div>

              <div className="form-group">
                <label className="mb-0">
                  Employment Type<span className="text-success">*</span>
                </label>
                <Form.Select
                  aria-label="Employment Type"
                  onChange={(event) =>
                    this.handleOnChange("employmentType", event.target.value)
                  }
                  value={this.state.currentJob.employmentType}
                >
                  {this.state.employmentType.map((item, i) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Form.Select>
              </div>
              <br/>
              <Address setAddress={this.setAddress}></Address>
              <ImageUpload setFileName={this.setStateFileName} />
            </Col>
                    <Col xs={1} md={1} lg={1}></Col>
            <Col xs={12} md lg={5}>
            <br/>
            <br/>
              <div className="form-group">
                <label className="mb-0">Description<span className="text-success">*</span>
                </label>
                <TextAreaFormat description={this.state.currentJob.description} handleDescriptionChange={this.handleDescriptionChange}/>
                {/* <Form.Control
                  as="textarea"
                  rows={15}
                  placeholder="Enter Job Description"
                  value={this.state.currentJob.description}
                  onChange={(event) =>
                    this.handleOnChange("description", event.target.value)
                  }
                /> */}
              </div>
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col></Col>
            <Col xs md lg={2}>
            </Col>
            <Col></Col>
          </Row>
        </Form>
        <div className="centerAlign">
        <Button
                className="btn-success"
                variant="primary"
                type="button"
                onClick={this.saveJob}
              >
                Save
              </Button>
              <Button
                className="btn-success"
                variant="primary"
                type="button"
                onClick={this.savePost}
              >
                Save & Post
              </Button>
              </div>
              </div>
      </Container>
    );
  }
}

export default connect(mapStoreToProps, mapDispatchToProps)(JobPosting);
