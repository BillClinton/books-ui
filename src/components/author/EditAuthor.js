import React, { useContext, useEffect } from 'react';
import { AuthorStore } from '../../contexts/AuthorStore';
import EditAuthorForm from './EditAuthorForm';
import LoadingSpinner from '../layout/LoadingSpinner';

const EditAuthor = ({ match }) => {
  const { store } = useContext(AuthorStore);
  const id = parseInt(match.params.id, 10);
  let author = store.item;

  useEffect(() => {
    store.readItem(id);
  }, [id]);

  return (
    <>
      {store.matchItemState('itemPending') ? <LoadingSpinner /> : null}
      {store.matchItemState('success') ? (
        <EditAuthorForm author={author} />
      ) : null}
    </>
  );
};

export default EditAuthor;
