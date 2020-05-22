import React, { createContext, useEffect } from 'react';
import ApiMachine from '../machines/ApiMachine';
import { useMachine } from '@xstate/react';
import history from '../history';

export const AuthorStore = createContext();

const AuthorStoreProvider = (props) => {
  const apiMachine = ApiMachine('authors');
  const [state, send, service] = useMachine(apiMachine, {
    actions: {
      onPostComplete: () => {
        history.push('/authors');
      },
      onPatchComplete: () => {
        history.push('/authors');
      },
      onDeleteComplete: () => {
        history.push('/authors');
      },
    },
  });

  useEffect(() => {
    const subscription = service.subscribe((state) => {
      // simple state logging
      console.log(state.value);
      // console.log(state.context);
    });

    return subscription.unsubscribe;
  }, [service]); // note: service should never change

  const create = (data) => send({ type: 'post', data });
  const readCollection = () => send({ type: 'getCollection' });
  const readItem = (id) => send({ type: 'getItem', id });
  const update = (id, data) =>
    send({ type: 'patch', id, data: JSON.stringify(data) });
  const destroy = (id) => send({ type: 'delete', id });

  const resetDelete = () => {
    console.log('resetting delete!!');
    send({ to: 'destroy', type: 'reset' });
  };

  useEffect(() => {
    readCollection();
  }, []);

  const failure =
    state.matches({ collection: 'failure' }) ||
    state.matches({ item: 'failure' }) ||
    state.matches({ create: 'failure' }) ||
    state.matches({ update: 'failure' }) ||
    state.matches({ destroy: 'failure' });

  const store = {
    collection: state.context.collection,
    item: state.context.item,
    message: state.context.message,
    matchState: state.matches,
    failure,
    send,
    create,
    readCollection,
    readItem,
    update,
    destroy,
    resetDelete,
  };

  return (
    <AuthorStore.Provider value={{ store }}>
      {props.children}
    </AuthorStore.Provider>
  );
};

export default AuthorStoreProvider;
