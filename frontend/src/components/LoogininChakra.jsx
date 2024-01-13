// Login.js
import React from 'react';
import {
  ChakraProvider,
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  VStack,
} from '@chakra-ui/react';

const Login = () => {
  return (
    <ChakraProvider>
      <Box
        w="100%"
        h="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input type="text" placeholder="Enter your username" />
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="Enter your password" />
          </FormControl>

          <Button colorScheme="teal">Login</Button>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Login;
