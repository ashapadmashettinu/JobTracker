import { JobFormActionTypes } from "../actions/JobFormActions";
import AppState from "../state";

export default function(state = AppState.viewCurrentJob, action) {
    switch (action.type) {
        case JobFormActionTypes.SET_VIEW_JOB:
            console.log(Object.assign({},{...state,...action.payload.viewCurrentJob}));
        return Object.assign({},state,action.payload.viewCurrentJob);
        default:
        return state;
    }
}