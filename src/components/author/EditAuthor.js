import React, { useContext } from 'react';
import { AuthorStore } from '../../contexts/AuthorStore';
import EditAuthorForm from './EditAuthorForm';

const EditAuthor = ({ match }) => {
  const { store } = useContext(AuthorStore);
  const id = parseInt(match.params.id, 10);
  let author = store.edit;

  if (!author || author.id !== id) {
    author = null;
    store.readOne(id);
  }

  return author ? <EditAuthorForm author={author} /> : <div>loading form...</div>;
};

export default EditAuthor;
