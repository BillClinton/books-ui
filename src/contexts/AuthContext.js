import React, { createContext, useReducer, useContext } from 'react';
import AuthReducer from '../reducers/AuthReducer';
import { doLogin, doLogout } from '../actions/AuthActions';

const initialState = {
  auth: {
    loggedIn: false,
    email: null,
    username: null,
    loginFail: null,
  },
};

export const AuthContext = createContext();

export function useAuth() {
  const { auth } = useContext(AuthContext);
  return auth;
}

const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const login = (data) => doLogin(data, dispatch);
  const logout = () => doLogout(dispatch);

  const auth = {
    loggedIn: state.auth.loggedIn,
    email: state.auth.email,
    username: state.auth.username,
    loginFail: state.auth.loginFail,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={{ auth, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
