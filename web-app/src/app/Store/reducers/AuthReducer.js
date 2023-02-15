import { AuthActionTypes } from "../actions/AuthActions";
import AppState from "../state";

export default function(state = AppState.currentUser, action) {
    switch (action.type) {
        case AuthActionTypes.SET_CURRENT_USER:
            if(action.payload && action.payload.currentUser){
                action.payload.currentUser.isAuthenticated= true;
            }
            else{
                action.payload.currentUser.isAuthenticated= false;
            }
        return Object.assign({},state,action.payload.currentUser);
        // case USER_LOADING:
        // return {
        //     ...state,
        //     loading: true..
        // };
        default:
        return state;
    }
}