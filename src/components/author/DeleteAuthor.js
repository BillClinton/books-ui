import React, { useContext } from 'react';
import Modal from '../layout/Modal';
import history from '../../history';
import { AuthorStore } from '../../contexts/AuthorStore';

const DeleteAuthor = ({ match }) => {
  const id = match.params.id;
  const onDismiss = () => history.goBack();

  const { store } = useContext(AuthorStore);
  const onDelete = (id) => store.destroy(id);

  const actions = (
    <>
      <button onClick={() => onDelete(id)}>Delete</button>
      <button onClick={() => onDismiss()}>Cancel</button>
    </>
  );

  return (
    <Modal
      title="Delete Author"
      content="Are you sure you want to delete this author?"
      actions={actions}
      onDismiss={onDismiss}
    />
  );
};

export default DeleteAuthor;
