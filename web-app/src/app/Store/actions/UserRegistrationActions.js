export const UserRegistrationActionTypes = {
    ADD_USER: '[User] Add a new user',


};

export const addUser = (payload) => ({
    type: UserRegistrationActionTypes.ADD_USER,
    payload
});

