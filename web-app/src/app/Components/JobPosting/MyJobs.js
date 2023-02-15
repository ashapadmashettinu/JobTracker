import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faCircle, faUpload, faTimesCircle, faSuitcaseRolling} from '@fortawesome/free-solid-svg-icons'
import './MyJobs.scss';
import Moment from 'moment';
import { updateJob, deleteJob, setCurrentJob } from "../../Store/actions/JobFormActions";
import {connect} from 'react-redux';
import JobPosting from "./JobPosting";
import { fetchDeleteApi, fetchPutApi } from "../../Services/fetchUtils";
import { ROUTES_CONFIG } from "../../Constants/config";
import { Navigate } from "react-router-dom";

const mapStoreToProps = (state) => ({
    jobs: state.jobs,
    currentJob: state.currentJob,
    isCreateOrViewMode:state.isCreateOrViewMode,
    currentUser:state.currentUser
});

const mapDispatchToProps =  (dispatch) => {
    return {
        deleteJob: myJob => dispatch(deleteJob(myJob)),
        updateJob: myJob => dispatch(updateJob(myJob)),
        setCurrentJob : myJob => dispatch(setCurrentJob(myJob)),
    }
};

/**
 * Renders the View MyJob List Component
 */
export class MyJobs extends React.Component{
    constructor(props){
        super(props);
        this.toggleJobStatus = this.toggleJobStatus.bind(this);
        this.showAddNewJobToggle = false;
        this.state={
            currentJob:{},
            redirectToJobPost:false
        }
    }

    /**
     * Delete myJob from list
     */
    remove(id){

        fetchDeleteApi(ROUTES_CONFIG.jobs_api + id).then((myjob) =>{
            this.props.deleteJob(myjob);
            alert(`Deleted item ${id} Sucessfully!`)
        });
    }
    /**
     * Update myJob to publish
     */
    toggleJobStatus = (myJob) => {
        //console.log(myJob);
        const body = {
            status:true
          };
        fetchPutApi(ROUTES_CONFIG.jobs_api + myJob.id, body).then((job) =>{
            console.log("res,", job)
            this.props.updateJob(job);
            //alert(`Updated item ${myJob.id} Sucessfully!`)
        });
        // this.props.updateJob(myJob);
    }

    /**
     * 
     * @param {*} id 
     */
     showAddNewJob =() =>{
        this.props.setCurrentJob({currentJob:{}});
        this.setState({currentJob:{},redirectToJobPost:true});

     }

     /**
     * View myJob from list
     */
    viewJobItem(myJob){
        console.log("myJob",myJob);
        this.props.setCurrentJob({currentJob:myJob});
        this.setState({currentJob:myJob, redirectToJobPost:true});
    }
    
    render(){
        if (this.state.redirectToJobPost === true) {
            return <Navigate to="/job-post" />;
          }
        const viewJobItem = this.props.jobs.jobs && this.props.jobs.jobs.length > 0 ? this.props.jobs.jobs.filter((job) => this.props.currentUser.id === job.recruiter)
        .map((myJob,i) => <li className="task" key={i} id={myJob.id}>
       <label className="labelJobPost">
           <span className={myJob.status ? "faSuitcaseRolling" : "faSuitcaseRolling"}>
               <FontAwesomeIcon icon={faSuitcaseRolling} />
               </span>
            <label onClick={() => this.viewJobItem(myJob)} className="cursorPointer task-text">{myJob.jobTitle}</label>
            <span className="task-text">{myJob.company}</span>
            <span className="task-text">{myJob.address && myJob.address.city &&  myJob.address.city.label ? myJob.address.city.label : "Bay Area"}</span>
        </label>
        <div>
            <span>{myJob.status ? "Published" : "Pending"}</span>
            <label className="cursorPointer" onClick={() => this.toggleJobStatus(myJob)}><FontAwesomeIcon size="1x" icon={faUpload}  title="Publish Job" className="viewIcon"/></label>
            <label className="cursorPointer"><FontAwesomeIcon icon={faEdit} className="viewIcon" onClick={() => this.viewJobItem(myJob)} /></label>
            <label className="cursorPointer"><FontAwesomeIcon icon={faTimesCircle} className="trashIcon" onClick={() =>this.remove(myJob.id)} /></label>
        </div>
    </li>) : null;

        return (
            <div className="content-wrap-jobs">
            <div className="job myJob-list content-el">
            <div className="job-header">
                <div className="date">
                    <h2>My Job Posts</h2>
                </div>
            </div>
            <ul className="job-content" id="job-content">
                {viewJobItem}
            </ul>
            <div className="job-footer ">
                <button className="add" onClick={this.showAddNewJob}>+</button>
            </div>
        </div>
        {/* {this.props.isCreateOrViewMode ? <JobPosting currentJob={this.state.currentJob} handleShowHide={this.showAddNewJob}></JobPosting> : null} */}
        </div>
        )
    }
}

const ConnectMyJobs = connect(mapStoreToProps, mapDispatchToProps)(MyJobs);
export default ConnectMyJobs;