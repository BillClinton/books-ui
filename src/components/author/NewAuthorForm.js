import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthorStore } from '../../contexts/AuthorStore';
import TextInput from '../form/TextInput';
import history from '../../history';

const NewAuthorForm = () => {
  const form = useForm();
  const { store } = useContext(AuthorStore);

  const onCancel = () => history.push('/authors');
  const onSubmit = (data, e) => {
    e.preventDefault();
    store.create(data);
  };

  return (
    <form
      className="form"
      onSubmit={form.handleSubmit(onSubmit)}
      autoComplete="on"
    >
      <h1>Add a new author</h1>
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
  );
};

export default NewAuthorForm;
