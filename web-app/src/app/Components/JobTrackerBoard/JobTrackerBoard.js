import React, { Component } from 'react';
import './JobTrackerBoard.scss';
import { updateJobApplication } from '../../Store/actions/JobApplicationActions';
import { connect } from 'react-redux';
import { fetchPutApi } from '../../Services/fetchUtils';
import { ROUTES_CONFIG } from '../../Constants/config';
import { Container } from 'react-bootstrap';

const mapStoreToProps = (state) => ({
    applications:state.applications
  });
  
  const mapDispatchToProps = (dispatch) => {
    return {
        updateJobApplication: (app) => dispatch(updateJobApplication(app)),
    };
  };
export class JobTrackerBoard extends Component {
    constructor(props){
        super(props);
        this.state = {
        status:[{name: "Applied", key:"Applied", priority:1}, 
        {name: "In Progress",key:"inprogress", priority:2},
        {name: "Testing Round", key: "testing", priority:3},
        {name: "Interview", key: "interview", priority:3},
         {name: "Job Offered", key: "joboffered", priority:3}],
        applications: []
    }
    }
    static getDerivedStateFromProps(props, state){
        console.log(props, "here");
        if(props.applications && props.applications.applications && props.applications.applications.length >0){
          if(state.applications && !state.applications.length <= 0 || state.applications.length !== props.applications.length){
            var stateCopy = Object.assign({}, state);
            stateCopy["applications"] = props.applications.applications && props.applications.applications;
            return stateCopy;
          }
        }
          return state;
      }
    onDragStart = (ev, id) => {
        console.log('dragstart:',id);
        ev.dataTransfer.setData("id", id);
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (ev, cat) => {
        console.log(ev, cat);
       let id = ev.dataTransfer.getData("id");
       
       let applications = this.state.applications.filter((task) => {
           console.log(task, id);
           if (task.id == id) {
               task.status = cat;
               fetchPutApi(ROUTES_CONFIG.applications_api+task.id, {status:cat}).then((application)=>{
                    this.props.updateJobApplication(application);
               });
           }
           return task;
       });
       //console.log(applications);
       
       this.setState({
        applications:
           applications
       });
    }

    render() {
        let applications = {
            // wip: [],
            // complete: [],
            // inprogress: []
        };
        this.state.applications.forEach ((t) => {
            if(!applications[t.status]){
                applications[t.status] =[];
            }
            applications[t.status].push(
                <div class="card draggable" key={t.id}  onDragStart = {(e) => this.onDragStart(e, t.id)}
                draggable>
  <div class="card-body">
    <h5 class="card-title"> <a href={"/jobs?" + t.jobId}>{t.jobTitle  }</a></h5>
    <h6 class="card-subtitle mb-2 text-muted">{t.company}</h6>
  </div>
</div>
                // <div className="trackerEl">
                // <div key={t.jobTitle} 
                //     onDragStart = {(e) => this.onDragStart(e, t.jobTitle)}
                //     draggable
                //     className="draggable"
                // >
                   
                //     <span> {t.company}</span>
                // </div>
                // </div>
                
            );
        });

        return (
            <Container>
            <div className="App">
                {
                this.state.status.map((t) =>  <div className="todos"  draggable
        onDragOver={(e)=>this.onDragOver(e)}
        onDrop={(e)=>this.onDrop(e, t.key)}>
         <span className="task-header">{t.name}</span>
         {applications[t.key]}
    </div>)
    }
            </div>
            </Container>
        );
    }
}

export default connect(mapStoreToProps,mapDispatchToProps)(JobTrackerBoard);