import { LOGIN, LOGOUT, LOGIN_FAIL } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN: {
      let auth = {
        loggedIn: true,
        email: action.payload.email,
        username: action.payload.username,
        loginFail: false,
      };

      return { ...state, auth };
    }

    case LOGOUT: {
      return {
        ...state,
        auth: {
          loggedIn: false,
          email: null,
          username: null,
          loginFail: false,
        },
      };
    }

    case LOGIN_FAIL: {
      return {
        ...state,
        auth: {
          loggedIn: false,
          email: null,
          username: null,
          loginFail: action.payload,
        },
      };
    }

    default:
      return state;
  }
};
