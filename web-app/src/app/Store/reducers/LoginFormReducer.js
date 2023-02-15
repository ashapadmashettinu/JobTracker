import AppState from '../state';
//import { LoginFormActionTypes } from '../Actions/LoginFormActionTypes';
import { LoginFormActionTypes } from '../actions/LoginForm';


const loginFormReducer = (state = AppState, action) => {
    const type = action.type;
    let currentUser;
    /**
     * case TodoActionTypes.SET_CURRENT_TODO:
            currentTodo = action.payload;
            return Object.assign({}, state, {currentTodo});
     */
    switch(type){
        case LoginFormActionTypes.AUTH_USER:
            console.log("Payload"); console.log(action.payload);
            //employers =  [...state., ...[action.payload]];
            currentUser = [...state , ...[action.payload]];
            
            break;
        default:
            return state;
    }
   // console.log(Object.assign({}, state, {employers}));
    return Object.assign({}, state, {currentUser});
};



export default loginFormReducer;