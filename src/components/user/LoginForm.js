import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../contexts/AuthContext';
import {
  Box,
  Input,
  Flex,
  Icon,
  InputGroup,
  InputLeftElement,
  Button,
  FormControl,
  FormHelperText,
  FormErrorMessage,
} from '@chakra-ui/core';

const LoginForm = () => {
  const form = useForm();
  const { auth } = useContext(AuthContext);

  const onSubmit = (data, e) => {
    e.preventDefault();
    auth.login(data);
  };

  const EmailField = () => {
    return (
      <FormControl isInvalid={form.errors.email} mt={3}>
        <InputGroup>
          <InputLeftElement children={<Icon name="email" />} />
          <Input
            name="email"
            placeholder="Email"
            aria-label="Email"
            autoComplete="username"
            isDisabled={auth.matchState('login.pending')}
            ref={form.register({
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Please use a valid email address',
              },
              required: 'Email address is required to log in',
            })}
          />
        </InputGroup>
        <FormErrorMessage ml={3}>
          {form.errors.email && form.errors.email.message}
        </FormErrorMessage>
      </FormControl>
    );
  };

  const PasswordField = () => {
    return (
      <FormControl isInvalid={form.errors.password} mt={3}>
        <InputGroup>
          <InputLeftElement children={<Icon name="lock" />} />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            aria-label="Password"
            autoComplete="current-password"
            isDisabled={auth.matchState('login.pending')}
            ref={form.register({
              required: 'Your password is required to log in',
            })}
          />
        </InputGroup>
        <FormErrorMessage ml={3}>
          {form.errors.password && form.errors.password.message}
        </FormErrorMessage>
      </FormControl>
    );
  };

  const SubmitButton = () => {
    return (
      <Button
        mt={3}
        bg="yellow.500"
        type="submit"
        isLoading={auth.matchState('login.pending')}
        boxShadow="md"
        _hover={{ bg: 'yellow.400' }}
        _active={{ boxShadow: '0' }}
      >
        Login
      </Button>
    );
  };

  const FormText = () => {
    if (auth.matchState('login.idle')) {
      return (
        <FormHelperText id="email-helper-text">
          Please log in to access your library.
        </FormHelperText>
      );
    }
    if (auth.matchState('login.pending')) {
      return (
        <FormHelperText id="email-helper-text">Logging in...</FormHelperText>
      );
    }
    return null;
  };

  const FormError = () => {
    return (
      <FormControl isInvalid={auth.matchState('login.failure')}>
        <FormErrorMessage ml={4} mt={2} bg="gray">
          {auth.message}
        </FormErrorMessage>
      </FormControl>
    );
  };

  return !auth.loggedIn ? (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Flex
        flexDirection="column"
        mt="100px"
        mx="auto"
        width={[
          '100%', // base
          '400px', // 480px upwards
          '400px', // 768px upwards
          '400px', // 992px upwards
        ]}
      >
        <Box height="36px">
          <FormError />
          <FormText />
        </Box>
        <EmailField />
        <PasswordField />
        <SubmitButton />
      </Flex>
    </form>
  ) : (
    <Redirect
      to={{
        pathname: '/profile',
      }}
    />
  );
};

export default LoginForm;
