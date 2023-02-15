import AppState from '../state';
import { UserRegistrationActionTypes } from '../actions/UserRegistrationActions';

const userRegistrationReducer = (state = AppState, action) => {
    const type = action.type;
    let users;
    switch (type) {
        case UserRegistrationActionTypes.ADD_USER:
            console.log("Payload");
            console.log(action.payload);
            users = [...state.users, ...[action.payload]];
            break;
        default:
            return state;
    }
    console.log(Object.assign({}, state, { users }));
    return Object.assign({}, state, { users });
};

export default userRegistrationReducer;