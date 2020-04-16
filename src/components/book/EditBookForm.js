import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { BookStore } from '../../contexts/BookStore';
import TextInput from '../form/TextInput';
import history from '../../history';

const EditBookForm = ({ book }) => {
  const form = useForm({ defaultValues: book });
  const { store } = useContext(BookStore);

  const onCancel = () => history.push('/books');
  const onSubmit = (data, e) => {
    e.preventDefault();
    store.update(book.id, data);
  };

  return book ? (
    <form className="form" onSubmit={form.handleSubmit(onSubmit)}>
      <h1>Edit book</h1>
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

export default EditBookForm;
