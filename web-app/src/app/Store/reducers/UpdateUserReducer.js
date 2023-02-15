import AppState from '../state';
import { UpdateUserActionTypes } from '../actions/UpdateUserActions';
//import { userSetter } from 'core-js/fn/symbol';
import { bindActionCreators } from 'redux';

const updateUserReducer = (state = AppState, action) => {
    const type = action.type;
    let users;
    switch (type) {
        case UpdateUserActionTypes.UPDATE_USER:
            users = state.users.map((user) => {
                if(user.id == action.payload.id){
                    return{
                        ...users,
                        ...action.payload,
                    };
                }else{
                    return user;
                }

            });
            break

        case UpdateUserActionTypes.ADD_EDUCATION_SKILLS:
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

export default updateUserReducer;