import AppState from '../state';
import { UserLoginActionTypes } from '../actions/UserLoginActions';



const userLoginReducer = (state = AppState, action) => {
    const type = action.type;
    let currentUser;
    /**
     * case TodoActionTypes.SET_CURRENT_TODO:
            currentTodo = action.payload;
            return Object.assign({}, state, {currentTodo});
     */
    switch(type){
        case UserLoginActionTypes.AUTH_USER:
            console.log("Payload in UserLogin: "); console.log(action.payload);
            //employers =  [...state., ...[action.payload]];
            currentUser = action.payload;
            console.log(Object.assign({}, state, {currentUser}));
            return Object.assign({}, state, {currentUser});
            break;
        default:
            return state;
    }
   // console.log(Object.assign({}, state, {employers}));
   
};

export default userLoginReducer;