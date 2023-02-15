import { JobFormActionTypes } from "../actions/JobFormActions";
import AppState from "../state";

export default function(state = AppState.currentJob, action) {
    switch (action.type) {
        case JobFormActionTypes.SET_CURRENT_JOB:
            console.log(Object.assign({},{...state,...action.payload.currentJob}));
        return Object.assign({},state,action.payload.currentJob);
        default:
        return state;
    }
}