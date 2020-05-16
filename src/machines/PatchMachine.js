import { Machine, assign } from 'xstate';
import API from '../apis/BooksAPI';

const PatchMachine = (apiPath, entity) =>
  Machine(
    {
      id: `api-patch-${entity}`,
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
              API.patch(`${apiPath}/${entity}/${event.id}`, event.data),
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

export default PatchMachine;
