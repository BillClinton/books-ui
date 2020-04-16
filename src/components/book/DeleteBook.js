import React, { useContext } from 'react';
import Modal from '../layout/Modal';
import history from '../../history';
import { BookStore } from '../../contexts/BookStore';

const DeleteBook = ({ match }) => {
  const id = match.params.id;
  const onDismiss = () => history.goBack();

  const { store } = useContext(BookStore);
  const onDelete = (id) => store.destroy(id);

  const actions = (
    <>
      <button onClick={() => onDelete(id)}>Delete</button>
      <button onClick={() => onDismiss()}>Cancel</button>
    </>
  );

  return (
    <Modal
      title="Delete Book"
      content="Are you sure you want to delete this book?"
      actions={actions}
      onDismiss={onDismiss}
    />
  );
};

export default DeleteBook;
