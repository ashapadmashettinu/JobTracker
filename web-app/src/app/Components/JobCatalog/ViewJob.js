import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSuitcase, faBusinessTime, faCheckCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import './JobCatalog.scss';
import {connect} from 'react-redux';
//import CreateTodo from "./CreateTodo";
import { Row, Col } from "react-bootstrap";

const mapStoreToProps = (state) => ({
    viewJob: state.viewJob,
});

/**
 * Renders the View Job Component
 */
export class ViewJob extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        console.log(this.props)
        const viewJobElement = this.props.viewCurrentJob && this.props.viewCurrentJob.id ?  <div>
        {/* view job */}

        <h2 className= "viewjob-decription-heading"> {this.props.viewCurrentJob.jobTitle}</h2>
        <div>
            <span className="company-name"> {this.props.viewCurrentJob.company}</span>
            <span>Menlo Park</span>
            <br></br>
        </div>
        
        <div>
            <span>
                <FontAwesomeIcon icon={faSuitcase} />  {this.props.viewCurrentJob.salary}
                <br></br>
            </span>
        </div>

        <div>
            <span>
                <FontAwesomeIcon icon={faBusinessTime} /> {this.props.viewCurrentJob.employmentType}
            </span>
            <br></br>
            <br></br>
        </div>
        <div>

        </div>
        <div>
            <span>
                Job Description: 
            </span>
        </div>
        
        <div>
            <span>
                
            <textarea id="w3review" name="w3review" rows="10" cols="50">{this.props.viewCurrentJob.description}
             </textarea>
           
             <br></br>
             <input type="button" value="Apply" onClick={this.props.apply}></input >

            </span>
        </div>
    
</div> : <div></div>;
        return (
           <>{viewJobElement}</>
        )
    }
}

const ConnectViewJobs = connect(mapStoreToProps)(ViewJob);
export default ConnectViewJobs;