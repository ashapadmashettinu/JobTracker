export const LoginFormActionTypes = {
    
    AUTH_USER : '[User] Auth User'
};

export const addLoginUser = (payload) => ({
    type: LoginFormActionTypes.AUTH_USER, payload,
});

