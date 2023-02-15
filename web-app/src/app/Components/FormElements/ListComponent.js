import React, { Component } from "react";
import './ListComponent.scss';

class ListComponent extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
        <li> 
        <div className="job-list-flex-container">
            <div className="job-list-flex-child image">
                <img className="item" src="https://pngimg.com/uploads/apple_logo/apple_logo_PNG19688.png" alt="Example image"></img>
            </div>
            <div className="job-list-flex-child inner-content">       
                <div>
                    <h3 className= "job-title-heading">{this.props.currentJob.jobTitle}</h3>
                    <div>
                        <p>{this.props.currentJob.jobTitle}</p>
                        <i className="fal fa-circle"></i>
                        <p>{ this.props.currentJob && this.props.currentJob.address && this.props.currentJob.address.city && this.props.currentJob.address.city.label ? this.props.currentJob.address.city.label : "Bay Area"}</p>
                    </div>
                </div>
            </div>     
        </div>
    </li>
    );
  }
}

export default ListComponent;