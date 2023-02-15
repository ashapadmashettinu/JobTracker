import AppState from "../state";
//import { JobFormActionTypes } from '../actions/JobFormActions';
import { JobFormActionTypes } from "../actions/JobFormActions";

const jobFormReducer = (state = AppState.jobs, action) => {
  const type = action.type;
  let jobs;
  switch (type) {
    case JobFormActionTypes.ADD_JOB:
      if (state.length === 0) {
        jobs = [action.payload];
      } else  if (!state.jobs || state.jobs.length === 0) {
        jobs = [action.payload];
      }else {
        jobs = [...state.jobs, ...[action.payload]];
      }
      break;
    case JobFormActionTypes.SET_JOB:
      //   if (state.length === 0) {
      //     jobs = [...action.payload];
      //   } else {
      jobs = [...action.payload];
      //   }
      break;
    case JobFormActionTypes.UPDATE_JOB:
        jobs =  state.jobs.map((job) => {
            if (job.id === action.payload.id) {
              return {
                ...job,
                ...action.payload,
              };
            } else {
              return job;
            }
          });
      break;
    case JobFormActionTypes.DELETE_JOB:
        jobs = state.jobs.filter(job => job.id !== action.payload.id);
        jobs  = [...jobs];
      break;
    default:
      return state;
  }
  //console.log(Object.assign({}, state, {jobs}));
  return Object.assign({}, state, { jobs });
};

export default jobFormReducer;
