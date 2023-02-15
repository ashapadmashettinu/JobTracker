// Log user out
export const logoutUser = () => setCurrentUser => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Set current user to empty object {} which will set isAuthenticated to false
    setCurrentUser({});
};