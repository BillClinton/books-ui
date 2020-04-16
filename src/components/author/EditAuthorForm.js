import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthorStore } from '../../contexts/AuthorStore';
import TextInput from '../form/TextInput';
import history from '../../history';

const EditAuthorForm = ({ author }) => {
  const form = useForm({ defaultValues: author });
  const { store } = useContext(AuthorStore);

  const onCancel = () => history.push('/authors');
  const onSubmit = (data, e) => {
    e.preventDefault();
    store.update(author.id, data);
  };

  return author ? (
    <form className="form" onSubmit={form.handleSubmit(onSubmit)}>
      <h1>Edit author</h1>
      <TextInput
        form={form}
        fieldName="name"
        label="Name"
        validations={{ required: true }}
      />

      <div className="buttons">
        <button className="submit">Submit</button>
        <button className="cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  ) : (
    <div>Loading....</div>
  );
};

export default EditAuthorForm;
