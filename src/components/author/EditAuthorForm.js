import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthorStore } from '../../contexts/AuthorStore';
import history from '../../history';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Flex,
} from '@chakra-ui/core';

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

export default EditAuthorForm;
