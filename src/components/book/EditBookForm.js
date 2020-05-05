import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { BookStore } from '../../contexts/BookStore';
import AuthorSelectInput from '../form/AuthorSelectInput';
import history from '../../history';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Flex,
} from '@chakra-ui/core';

const EditBookForm = ({ book, authors }) => {
  const form = useForm({ defaultValues: book });
  const { store } = useContext(BookStore);

  const onCancel = () => history.push('/books');
  const onSubmit = (data, e) => {
    e.preventDefault();
    store.update(book.id, data);
  };

  return book && authors ? (
    <form className="form" onSubmit={form.handleSubmit(onSubmit)}>
      <h1>Edit book</h1>

      <FormControl isInvalid={form.errors.name}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          name="name"
          placeholder="name"
          ref={form.register({ required: true })}
        />
        <FormErrorMessage>
          {form.errors.name && form.errors.name.message}
        </FormErrorMessage>
      </FormControl>

      <AuthorSelectInput
        form={form}
        fieldName="authors"
        label="Author(s)"
        options={authors}
        values={book.authors}
      />

      <Flex justify="center" p={2} w="100%" align="center">
        <Button className="cancel" onClick={onCancel} m="1">
          Cancel
        </Button>
        <Button className="submit" m="1" type="submit">
          Save
        </Button>
      </Flex>
    </form>
  ) : (
    <div>Loading....</div>
  );
};

export default EditBookForm;
