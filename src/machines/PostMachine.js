import { Machine, assign } from 'xstate';
import API from '../apis/BooksAPI';

const PostMachine = (apiPath, entity) =>
  Machine(
    {
      id: `api-post-${entity}`,
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
              API.post(`${apiPath}/${entity}`, event.data),
            onDone: {
              target: 'success',
              actions: ['setResult', 'operationComplete'],
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

export default PostMachine;
