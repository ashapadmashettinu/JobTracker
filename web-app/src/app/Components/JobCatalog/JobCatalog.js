import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSuitcase, faBusinessTime, faCheckCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import './JobCatalog.scss';
import Moment from 'moment';
import { viewCurrentJob } from "../../Store/actions/JobFormActions";
//import { updateTodo, deleteTodo, setCurrentTodo, showHideCreateTodo } from "../../Store/actions/todoActions";
import {connect} from 'react-redux';
import { fetchGetApi } from "../../Services/fetchUtils";
import { ROUTES_CONFIG } from "../../Constants/config";
//import CreateTodo from "./CreateTodo";
import { Row, Col } from "react-bootstrap";
import ViewJob from "./ViewJob";
import UserApplication from "../JobApplication/JobApplication";


export const employmentTypes = {"fulltime": "Full-time", "remote": "Remote", "parttime":"Part-time", "internship": "Internship", "coop" : "Coop" };
const mapStoreToProps = (state) => ({
    jobs: state.jobs,
    currentUser: state.currentUser
    //currentTodo: state.currentTodo,
    //isCreateOrViewMode:state.isCreateOrViewMode

});

const mapDispatchToProps =  (dispatch) => {
    return {
        viewCurrentJob:job => dispatch(viewCurrentJob(job))
       // deleteTodo: todos => dispatch(deleteTodo(todos)),
       // updateTodo: todos => dispatch(updateTodo(todos)),
      //  setCurrentTodo : todo => dispatch(setCurrentTodo(todo)),
        //showHideCreateTodo:toggle => dispatch(showHideCreateTodo(toggle))
    }
};

/**
 * Renders the View Todo List Component
 */
export class JobCatalog extends React.Component{
    constructor(props){
        super(props);
        this.state={viewJob:{}, modalShow:false, searchParam:window.location.href.indexOf("?") !==-1 ? window.location.href.split('?')[1] :""};
    }

   
     /**
     * View todo from list
     */

    viewJobDescription = (job)=>{
        //console.log("here");
        this.setState({viewJob:job});
        this.props.viewCurrentJob(job);
    }
    
    applyJob =() => {
        this.setState({modalShow:true});
        console.log(this.state);
    }
    
    render(){
        //console.log(this.props.jobs.jobs, this.props.jobs.jobs.size)
        let jobs=[];
        if(this.props.jobs && this.props.jobs.length > 0){
            jobs = this.props.jobs.filter((job)=> job.status===true);
        }
        else if(this.props.jobs && this.props.jobs.jobs  && this.props.jobs.jobs.length > 0){
            jobs = this.props.jobs.jobs.filter((job)=> job.status===true);
        }
        const viewJobItem = jobs.length > 0 ? jobs.filter((job)=> {return job.jobTitle.toLowerCase().includes(this.state.searchParam.toLowerCase()) || job.company.toLowerCase().includes(this.state.searchParam.toLowerCase())
    || job.id === this.state.searchParam})
        .map((job,i) =>  <li key={i} onClick={() => this.viewJobDescription(job)}> 
        <div className="job-list-flex-container">
            <div className="job-list-flex-child image">
                <img className="item" src={job.company ? "logos/"+ job.company +".png" : ""} alt="Example image"></img>
            </div>
            
            <div className="job-list-flex-child inner-content">       
                <div>
                    <a className="job-title-heading" onClick={() => this.viewJobDescription(job)}>{job.jobTitle}</a>
                    <div>
                        <p>{job.company}</p>
                        {/* <p>{job.address}</p> */}
                    </div>
                </div>
            </div>     
        </div>
    </li>) : null;
        return (
            <>
            <div className="content-wrap">
            <div className="todo todo-list content-el">
            <div className="todo-header">
                <div className="date">
                    <h2>Job Catalogue</h2>
                </div>
            </div>
        <Row>

          <Col xs={12} md lg={5}>
            <ul className="job-ul-list-content" id="todo-content">
                {viewJobItem}
            </ul>  
            </Col>
            {this.state.viewJob.jobTitle ?
            <Col xs={12} md lg={5}>
                {/* <ViewJob apply={this.applyJob}/> */}
                {/* view job */}

                <h2 className= "viewjob-decription-heading">{this.state.viewJob.jobTitle}</h2>
                <div>
                    <span className="company-name">{this.state.viewJob.company}</span>
                    <span>{this.state.viewJob.address && this.state.viewJob.address.city && this.state.viewJob.address.city.label ? this.state.viewJob.address.city.label : "Boston"}</span>
                    <br></br>
                </div>
                
                <div>
                    <span>
                        <FontAwesomeIcon icon={faSuitcase} /> {this.state.viewJob.salary}
                        
                        <br></br>
                    </span>
                </div>

                <div>
                    <span>
                        <FontAwesomeIcon icon={faBusinessTime} /> {employmentTypes[this.state.viewJob.employmentType]}
                    </span>
                    <br></br>
                    <span>
     Category : Computer Science
</span>

<div className="apply-job">
     <input type="button" value="Apply" onClick={this.applyJob}></input >
</div>   
                </div>
                <div>
        
                </div>
                <div className="divJobDescriptionParent">
                        <h6>Job Description: </h6>
                    <span className="divJobDescription">
                    <div dangerouslySetInnerHTML={{__html: this.state.viewJob.description}}></div>
                    {/* <textarea id="w3review" name="w3review" rows="10" cols="50" defaultValue={this.state.viewJob.description}>
                     </textarea> */}                  
                     <br></br>

                    </span>
                </div>
                </Col> : <div></div>}
                </Row>
        </div>
        </div>
        <UserApplication selecteduser={this.props.currentUser} job={this.state.viewJob} recruiterid={this.state.viewJob.recruiter} show={this.state.modalShow} onHide={() => this.setState({modalShow : false}) }/>
        </>
        )
    }
}

const ConnectViewJobs = connect(mapStoreToProps, mapDispatchToProps)(JobCatalog);
export default ConnectViewJobs;