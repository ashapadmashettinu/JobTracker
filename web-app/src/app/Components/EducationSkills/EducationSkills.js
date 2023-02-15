import React from "react";
import { connect } from "react-redux";
import "./EducationSkills.scss";
import { addEducationSkills } from "../../Store/actions/UpdateUserActions";
import { ROUTES_CONFIG } from "../../Constants/config";
import { fetchPutApi } from "../../Services/fetchUtils";
import Moment from 'moment';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Navigate } from "react-router-dom";

const mapStoreToProps = (state) => ({
    currentUser: state.currentUser,
});

const mapDispatchToProps = (dispatch) => {
    return {
        addEducationSkills: (User) => dispatch(addEducationSkills(User)),
    };
};

/**
 * Renders the Create/View Todo Component
 */
export class EducationSkills extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showContinueRouter: false,
            currentUser: {
                "education": "",
                "skills": "",
                "project": "",
                "experience": ""
            }
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (!state.currentUser.id || state.currentUser.id !== props.currentUser.id)
            return { currentUser: props.currentUser };
        else
            return state;
    }

    saveEducationSkills = () => {
        const body = {
            "education": this.state.currentUser.education,
            "skills": this.state.currentUser.skills,
            "project": this.state.currentUser.project,
            "experience": this.state.currentUser.experience
        };

        let url = ROUTES_CONFIG.users_api;
        fetchPutApi(url + this.props.currentUser.id, body).then((user) => {
            //console.log("here");
            this.props.addEducationSkills(user);
        });

    }

    /**
     * handles the title changes
     * @param {*} value
     */
    handleOnChange = (keyParam, value) => {
        var stateCopy = Object.assign({}, this.state);
        stateCopy.currentUser[keyParam] = value;
        this.setState(stateCopy);
        console.log(this.state)
    };

    handleBack = () => {
        var stateCopy = Object.assign({}, this.state);
        stateCopy["showContinueRouter"] = true;
        this.setState(stateCopy);
    }

    render() {
        if (this.state.showContinueRouter === true) {
            return <Navigate to="/personalinfo" />
        }

        return (
            <div className='education-skills'>
                <div className='form-input'>

                    <h4 className="text-lg-center text-dark"> Career Information </h4>

                    < Col md={12}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">


                            <Form.Label> Education </Form.Label>{" "}
                            <Form.Control
                                as="textarea" rows={4}
                                placeholder="Enter Education Details"
                                value={this.state.currentUser.education}
                                onChange={(event) => this.handleOnChange("education", event.target.value)}
                            />{" "}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label> Skills </Form.Label>{" "}
                            <Form.Control
                                as="textarea" rows={4}
                                placeholder="Enter Skills"
                                value={this.state.currentUser.skills}
                                onChange={(event) => this.handleOnChange("skills", event.target.value)}
                            />{" "}

                            <Form.Label> Project </Form.Label>{" "}
                            <Form.Control
                                as="textarea" rows={4}
                                placeholder="Enter Project details"
                                value={this.state.currentUser.project}
                                onChange={(event) => this.handleOnChange("project", event.target.value)}
                            />{" "}

                            <Form.Label> Experience </Form.Label>{" "}
                            <Form.Control
                                as="textarea" rows={4}
                                placeholder="Enter exprience details"
                                value={this.state.currentUser.experience}
                                onChange={(event) => this.handleOnChange("experience", event.target.value)}
                            />{" "}
                        </Form.Group>{" "}
                    </Col>


                </div>
                <div className="btnGap">
                    <Button className="btn-success" variant="primary" type="button" onClick={this.handleBack}>
                        Back
                    </Button>
                    <Button variant="primary" type="button" className="btn-success" onClick={this.saveEducationSkills}>
                        Save{" "}
                    </Button>{" "}
                </div>
            </div>
        );
    }
}

const ConnectEducationSkills = connect(
    mapStoreToProps,
    mapDispatchToProps
)(EducationSkills);
export default ConnectEducationSkills;
