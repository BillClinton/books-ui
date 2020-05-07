import React, { useContext } from 'react';
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
  FormErrorMessage,
} from '@chakra-ui/core';

const LoginForm = () => {
  const form = useForm();
  const { auth } = useContext(AuthContext);

  const onSubmit = (data, e) => {
    e.preventDefault();
    auth.login(data);
  };

  return (
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
          <FormControl isInvalid={auth.loginFail}>
            <FormErrorMessage ml={3}>{auth.loginFail}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={form.errors.email}>
            <InputGroup>
              <InputLeftElement children={<Icon name="email" />} />
              <Input
                name="email"
                placeholder="Email"
                aria-label="Email"
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
            isLoading={form.formState.isSubmitting}
            boxShadow="md"
            _hover={{ bg: 'yellow.400' }}
            _active={{ boxShadow: '0' }}
          >
            Login
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default LoginForm;
