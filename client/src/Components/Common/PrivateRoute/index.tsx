import React from "react";
import { connect } from "react-redux";
import { Route, Navigate } from "react-router-dom";
import { AppState } from "../../../store/index";

interface IPrivateRouteProps {
  auth?: boolean;
  path: string;
  children?: React.ReactNode;
}

const PrivateRoute = ({
  auth,
  path,
  children,
  ...rest
}: IPrivateRouteProps) => {
  return (
    <Route
      {...rest}
      path={path}
      element={/*auth*/ true ? children : <Navigate to="/login" />}
    />
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    auth: state.auth.isAuth,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
