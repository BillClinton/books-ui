import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@chakra-ui/core';
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

const NewAuthorForm = () => {
  const form = useForm();
  const { store } = useContext(AuthorStore);
  const toast = useToast();

  const onCancel = () => history.push('/authors');
  const onSubmit = (data, e) => {
    e.preventDefault();
    store.create(data);
  };

  useEffect(() => {
    if (store.matchState('create.failure')) {
      store.send({ to: 'post', type: 'reset' });
      toast({
        title: 'Error attempting to create author.',
        description: store.message,
        status: 'warning',
        duration: 4000,
        isClosable: true,
      });
    }
  }, [store.failure, store, toast]);

  return (
    <form className="form" onSubmit={form.handleSubmit(onSubmit)}>
      <h1>Add a new author</h1>
      <FormControl isInvalid={form.errors.name}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          name="name"
          placeholder="name"
          isDisabled={store.matchState('create.pending')}
          ref={form.register({ required: true })}
        />
        <FormErrorMessage>
          {form.errors.name && form.errors.name.message}
        </FormErrorMessage>
      </FormControl>

      <Flex justify="center" p={2} w="100%" align="center">
        <Button
          className="cancel"
          onClick={onCancel}
          m="1"
          isDisabled={store.matchState('create.pending')}
        >
          Cancel
        </Button>
        <Button
          className="submit"
          m="1"
          type="submit"
          isLoading={store.matchState('create.pending')}
        >
          Save
        </Button>
      </Flex>
    </form>
  );
};

export default NewAuthorForm;
