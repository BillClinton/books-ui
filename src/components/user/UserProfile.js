import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Box, Button } from '@chakra-ui/core';

const UserProfile = () => {
  const { auth } = useContext(AuthContext);

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
      <ul>
        <li>logged in: {auth.loggedIn ? 'true' : 'false'}</li>
        <li>email: {auth.email}</li>
        <li>username:{auth.username}</li>
      </ul>
      <Button
        bg="yellow.500"
        mt={2}
        width="100%"
        onClick={() => auth.logout()}
        boxShadow="md"
        _hover={{ bg: 'yellow.400' }}
        _active={{ boxShadow: '0' }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default UserProfile;
