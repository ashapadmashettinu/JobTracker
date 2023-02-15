import AppState from '../state';
import { JobApplicationActionTypes } from '../actions/JobApplicationActions';

const jobApplicationReducer = (state = {application:[]}, action) => {
    const type = action.type;
    let application;
    switch (type) {
        case JobApplicationActionTypes.JOB_APPLICATION:
            console.log("Payload");
            console.log(action.payload);
            application = [...state.users, ...[action.payload]];
            break;
        default:
            return state;
    }
    console.log(Object.assign({}, state, { application }));
    return Object.assign({}, state, { application });
};

export default jobApplicationReducer;