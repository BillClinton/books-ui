import { Machine, assign } from 'xstate';
import API from '../apis/BooksAPI';

const GetItemMachine = (apiPath, entity) =>
  Machine(
    {
      id: `api-getItem-${entity}`,
      initial: 'idle',
      context: {
        results: null,
        message: null,
      },
      states: {
        idle: {
          on: {
            op: 'pending',
          },
        },
        pending: {
          invoke: {
            id: 'op',
            src: (context, event) =>
              API.get(`${apiPath}/${entity}/${event.data}`),
            onDone: {
              target: 'success',
              actions: ['setResult'],
            },
            onError: {
              target: 'failure',
              actions: ['setMessage'],
            },
          },
        },
        failure: {
          on: {
            op: 'pending',
          },
        },
        success: {
          on: {
            op: 'pending',
          },
        },
      },
    },
    {
      actions: {
        setResult: assign((ctx, event) => ({
          results: event.data.data,
        })),
        setMessage: assign((ctx, event) => ({
          message: event.data.message,
        })),
      },
    }
  );

export default GetItemMachine;