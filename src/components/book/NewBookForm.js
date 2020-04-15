import React, { useContext } from 'react';
import useForm from 'react-hook-form';
import { BookStore } from '../../contexts/BookStore';
import TextInput from '../form/TextInput';
import history from '../../history';

const NewBookForm = () => {
  const form = useForm();
  const { store } = useContext(BookStore);

  const onCancel = () => history.push('/admin/books');
  const onSubmit = (data, e) => {
    e.preventDefault();
    store.create(data);
  };

  return (
    <form
      className="form"
      onSubmit={form.handleSubmit(onSubmit)}
      autocomplete="on"
    >
      <h1>Add a new book</h1>
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

export default NewBookForm;
