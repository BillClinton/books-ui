import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, ...rest }) => {
  const { auth } = useContext(AuthContext);

  const waitingOnAuth =
    auth.matchState('login.pending') ||
    auth.matchState('refresh.pending') ||
    auth.state.context.ready !== true;

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (auth.loggedIn) {
          return children;
        } else if (waitingOnAuth) {
          return null;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
