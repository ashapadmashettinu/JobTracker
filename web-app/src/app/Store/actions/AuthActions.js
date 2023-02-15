export const AuthActionTypes = {
SET_CURRENT_USER : "SET_CURRENT_USER"
};

export const setCurrentUser = (payload) => ({
    type: AuthActionTypes.SET_CURRENT_USER,
    payload
});