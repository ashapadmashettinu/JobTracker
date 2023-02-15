import AppState from "../state";
//import { JobFormActionTypes } from '../actions/JobFormActions';
import { JobApplicationActionTypes } from "../actions/JobApplicationActions";

const jobFormReducer = (state = {applications:[]}, action) => {
  const type = action.type;
  let applications;
  switch (type) {
    case JobApplicationActionTypes.ADD_JOB_APPLICATION:
      if (state.length === 0) {
        applications = [action.payload];
      } else if(!state.applications || state.applications.length ==0){
        applications = [action.payload];
      }
        else {
        applications = [...state.applications, ...[action.payload]];
      }
      break;
    case JobApplicationActionTypes.SET_APPLICATIONS:
      //   if (state.length === 0) {
      //     applications = [...action.payload];
      //   } else {
      applications = [...action.payload];
      //   }
      break;
    case JobApplicationActionTypes.UPDATE_JOB_APPLICATION:
        let app = state.applications && state.applications.applications ? state.applications.applications : state.applications;
        applications =  app.map((application) => {
            if (application.id === action.payload.id) {
              return {
                ...application,
                ...action.payload,
              };
            } else {
              return application;
            }
          });
      break;
      return Object.assign({}, state, {applications})
      default:
          return state;
  }
  //console.log(Object.assign({}, state, {applications}));
  return Object.assign({}, {applications});
};

export default jobFormReducer;
