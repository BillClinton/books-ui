import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../contexts/AuthContext';
import {
  Box,
  Input,
  Stack,
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

  const waitingOnAuth =
    auth.matchState('login.pending') ||
    auth.matchState('logout.pending') ||
    auth.matchState('refresh.pending') ||
    auth.state.context.ready !== true;

  if (waitingOnAuth) {
    return null;
  } else if (auth.loggedIn) {
    return (
      <Redirect
        to={{
          pathname: '/profile',
        }}
      />
    );
  } else {
    return (
      <>
        <Box
          mt="100px"
          mx="auto"
          width={[
            '100%', // base
            '400px', // 480px upwards
            '400px', // 768px upwards
            '400px', // 992px upwards
          ]}
        >
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <Box height="36px">
                <FormControl isInvalid={auth.matchState('login.failure')}>
                  <FormErrorMessage ml={6} my={0} bg="gray">
                    {auth.message}
                  </FormErrorMessage>
                </FormControl>
                {!auth.matchState('login.failure') ? (
                  <FormHelperText id="email-helper-text">
                    Please log in to access your library.
                  </FormHelperText>
                ) : null}
              </Box>
              <FormControl isInvalid={form.errors.email}>
                <InputGroup>
                  <InputLeftElement children={<Icon name="email" />} />
                  <Input
                    name="email"
                    placeholder="Email"
                    aria-label="Email"
                    autoComplete="username"
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
              <FormControl isInvalid={form.errors.password}>
                <InputGroup>
                  <InputLeftElement children={<Icon name="lock" />} />
                  <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    aria-label="Password"
                    autoComplete="current-password"
                    ref={form.register({
                      required: 'Your password is required to log in',
                    })}
                  />
                </InputGroup>
                <FormErrorMessage ml={3}>
                  {form.errors.password && form.errors.password.message}
                </FormErrorMessage>
              </FormControl>
              <Button
                bg="yellow.500"
                type="submit"
                isLoading={auth.matchState('login.pending')}
                boxShadow="md"
                _hover={{ bg: 'yellow.400' }}
                _active={{ boxShadow: '0' }}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </>
    );
  }
};

export default LoginForm;
