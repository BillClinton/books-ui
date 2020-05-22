import React, { useContext, useEffect } from 'react';
import { useToast } from '@chakra-ui/core';
import { AuthorStore } from '../../contexts/AuthorStore';
import EditAuthorForm from './EditAuthorForm';
import LoadingSpinner from '../layout/LoadingSpinner';

const EditAuthor = ({ match }) => {
  const { store } = useContext(AuthorStore);
  const toast = useToast();
  const id = parseInt(match.params.id, 10);
  let author = store.item;

  useEffect(() => {
    store.readItem(id);
  }, [id]);

  useEffect(() => {
    if (store.failure) {
      let title = 'An error occurred.';
      if (store.matchState('item.failure')) {
        title = 'Error attempting to load author.';
        store.send({ to: 'item', type: 'reset' });
      }
      if (store.matchState('update.failure')) {
        title = 'Error attempting to update author.';
        store.send({ to: 'patch', type: 'reset' });
      }

      toast({
        title,
        description: store.message,
        status: 'warning',
        duration: 4000,
        isClosable: true,
      });
    }
  }, [store.failure, store, toast]);

  return (
    <>
      {store.matchState({ item: 'pending' }) ? <LoadingSpinner /> : null}
      {store.matchState({ item: 'success' }) ? (
        <EditAuthorForm author={author} />
      ) : null}
    </>
  );
};

export default EditAuthor;
