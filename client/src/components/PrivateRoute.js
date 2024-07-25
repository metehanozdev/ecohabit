import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = useUserContext();

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default PrivateRoute;
