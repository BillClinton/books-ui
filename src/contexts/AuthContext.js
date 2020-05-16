import React, { createContext, useContext, useEffect } from 'react';
import AuthMachine from '../machines/AuthMachine';
import { useMachine } from '@xstate/react';
import history from '../history';

export const AuthContext = createContext();

export function useAuth() {
  const { auth } = useContext(AuthContext);
  return auth;
}

const AuthContextProvider = (props) => {
  const [state, send] = useMachine(AuthMachine, {
    actions: {
      redirectToHome: () => history.push('/'),
    },
  });
  const ctx = state.context;

  const login = (data) => send({ type: 'login', data });
  const logout = () => send({ type: 'logout' });
  const refresh = () => send({ type: 'refresh' });

  useEffect(() => {
    refresh();
  }, []);

  const auth = {
    loggedIn: ctx.loggedIn,
    message: ctx.message,
    email: ctx.profile ? ctx.profile.email : null,
    username: ctx.profile ? ctx.profile.username : null,
    matchState: state.matches,
    state,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={{ auth }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
