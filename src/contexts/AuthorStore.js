import React, { createContext, useEffect } from 'react';
import ApiMachine from '../machines/ApiMachine';
import { useMachine } from '@xstate/react';
import history from '../history';

export const AuthorStore = createContext();

const AuthorStoreProvider = (props) => {
  const apiMachine = ApiMachine('authors');
  const [state, send] = useMachine(apiMachine.get);
  const [itemState, sendItem] = useMachine(apiMachine.getItem);
  const [, sendCreate] = useMachine(apiMachine.post, {
    actions: {
      operationComplete: () => {
        console.log('operationComplete');
        send({ type: 'op' });
        history.push('/authors');
      },
    },
  });
  const [, sendPatch] = useMachine(apiMachine.patch, {
    actions: {
      operationComplete: () => {
        send({ type: 'op' });
        history.push('/authors');
      },
    },
  });
  const [, sendDelete] = useMachine(apiMachine.delete, {
    actions: {
      operationComplete: () => {
        send({ type: 'op' });
      },
    },
  });

  const create = (data) => sendCreate({ type: 'op', data });
  const read = (id) => send({ type: 'op' });
  const readItem = (id) => sendItem({ type: 'op', data: id });
  const update = (id, data) => {
    sendPatch({ type: 'op', id, data: JSON.stringify(data) });
  };
  const destroy = (id) => sendDelete({ type: 'op', data: id });

  useEffect(() => {
    read();
  }, []);

  const store = {
    collection: state.context.results,
    item: itemState.context.results,
    message: state.message,
    matchState: state.matches,
    matchItemState: itemState.matches,
    create,
    read,
    readItem,
    update,
    destroy,
  };

  return (
    <AuthorStore.Provider value={{ store }}>
      {props.children}
    </AuthorStore.Provider>
  );
};

export default AuthorStoreProvider;
