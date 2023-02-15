export const UserLoginActionTypes = {
    AUTH_USER: '[User] Authorize a user',
};

export const authUser = (payload) => ({
    type: UserLoginActionTypes.AUTH_USER,payload
});

