//Creating LoginForm
import React from "react";
import { connect } from 'react-redux';
import './LoginForm.scss';
//import { addJobTitle } from "../../Store/actions/JobFormActions";
//import { addEmployerEmail } from "../../Store/actions/LoginFormActions";
import Moment from 'moment';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { ROUTES_CONFIG } from "../../Constants/config";
import { fetchPostApi } from "../../Services/fetchUtils";

const mapStoreToProps = (state) => ({
    currentUser: state.currentUser
});

const mapDispatchToProps = (dispatch) => {
    return {
        // addUserPassword: user => dispatch(addUserPassword(user)),
        // addUserName: user => dispatch(addUserName(user))

    }
};

/**
 * Renders the Create/View Todo Component
 */
export class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: {
                "userName": "",
                "userPassword": ""

            }
        };
    }
    // static getDerivedStateFromProps(props, state){
    //     if(!state.currentUser.title || state.currentUser.id !== props.currentUser.id)
    //     return {currentUser:props.currentUser};
    //     else
    //     return state;
    // }


    saveTodo = () => {
        const body = {
            "username": this.state.currentUser.userName,
            "password": this.state.currentUser.userPassword,

        };
        let url = ROUTES_CONFIG.login_api;
        fetchPostApi(url, body).then((user) => {
            console.log(user)

        });
    }

    /**
     * handles the title changes 
     * @param {*} value 
     */
    handleTitleChange = (value) => {
        this.setState((prevState) => ({
            currentUser: Object.assign({}, prevState.currentUser, { userName: value, userPassword: value })
        }));
        //console.log(value);
    }

    render() {
        return (
            <div>
                <div>
                    <Form.Group className="mb-3" controlId="formBasicUserName">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter Username" value={this.state.currentUser.userName} onChange={(event) => this.handleTitleChange(event.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicUserPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="text" placeholder="Enter Password" value={this.state.currentUser.userPassword} onChange={(event) => this.handleTitleChange(event.target.value)} />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={this.saveTodo}>
                        Submit
                    </Button>
                </div>
                <div>
                   
                </div>
            </div>
        )
    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(LoginForm);

//Job Posting: LoginForm
//Job Title: Employer Email
//Job: Employer
