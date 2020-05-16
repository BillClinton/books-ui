import React from 'react';
import { Flex, Spinner } from '@chakra-ui/core';

const LoadingSpinner = () => {
  return (
    <Flex height="200px" align="center" justify="center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="yellow.500"
        color="gray.100"
        size="xl"
      />
    </Flex>
  );
};

export default LoadingSpinner;
