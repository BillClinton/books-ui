import { Machine, assign } from 'xstate';
import API from '../apis/BooksAPI';

const AuthMachine = Machine(
  {
    id: `auth`,
    context: {
      ready: null,
      loggedIn: null,
      profile: null,
      message: null,
    },
    type: 'parallel',
    states: {
      login: {
        initial: 'idle',
        states: {
          idle: {
            on: {
              login: 'pending',
            },
          },
          pending: {
            invoke: {
              id: 'login',
              src: (context, event) => API.post('/login', event.data),
              onDone: {
                target: 'success',
                actions: ['login', 'redirectToHome'],
              },
              onError: {
                target: 'failure',
                actions: ['logout', 'setErrorMessage'],
              },
            },
            entry: 'setReady',
          },
          failure: {
            on: {
              login: 'pending',
            },
          },
          success: {
            on: {
              login: 'pending',
            },
          },
        },
      },
      logout: {
        initial: 'idle',
        states: {
          idle: {
            on: {
              logout: 'pending',
            },
          },
          pending: {
            invoke: {
              id: 'logout',
              src: (context, event) => API.get('/logout'),
              onDone: {
                target: 'success',
                actions: ['logout'],
              },
              onError: {
                target: 'failure',
                actions: ['setMessage'],
              },
            },
          },
          failure: {
            on: {
              logout: 'pending',
            },
          },
          success: {
            on: {
              logout: 'pending',
            },
          },
        },
      },
      refresh: {
        initial: 'idle',
        states: {
          idle: {
            on: {
              refresh: 'pending',
            },
          },
          pending: {
            invoke: {
              id: 'refresh',
              src: (context, event) => API.get('/me'),
              onDone: {
                target: 'success',
                actions: ['login'],
              },
              onError: {
                target: 'failure',
                actions: ['logout'],
              },
            },
            entry: 'setReady',
          },
          failure: {
            on: {
              refresh: 'pending',
            },
          },
          success: {
            on: {
              refresh: 'pending',
            },
          },
        },
      },
    },
  },
  {
    actions: {
      setReady: assign((ctx, event) => ({
        ready: true,
      })),
      login: assign((ctx, event) => ({
        loggedIn: true,
        profile: event.data.data,
      })),
      logout: assign((ctx, event) => ({
        loggedIn: false,
        profile: null,
      })),
      setMessage: assign((ctx, event) => ({
        message: event.data.message,
      })),
      setErrorMessage: assign((ctx, event) => ({
        message:
          event.data.response && event.data.response.data
            ? event.data.response.data.error
            : event.data.message,
      })),
    },
  }
);

export default AuthMachine;
