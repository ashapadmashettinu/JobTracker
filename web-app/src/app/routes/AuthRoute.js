import React from "react";
import { Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AuthRoute = function({ children, isAuthenticated, ...rest }) {
    return (
        isAuthenticated ? children : <Navigate to="/login" />
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.currentUser.isAuthenticated
});

export default connect(mapStateToProps)(AuthRoute);