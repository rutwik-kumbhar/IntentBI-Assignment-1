import React from "react";
import { Flex, Button, Spacer, Text } from "@chakra-ui/react";

const NavBar =() => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      padding="1rem"
      borderBottom="1px"
      borderColor="gray.200"
      bgColor={'Highlight'}
      borderRadius="lg" boxShadow="lg"
      mb={5}
    >
      <Flex align="center">
        <Text fontSize={25} color={'white'}>IntentBI</Text>
        {/* Add more navigation links here if needed */}
      </Flex>
      <Flex align="center">
        <Button colorScheme="gray" mr={4}>
          Login
        </Button>
        {/* Add more navigation elements here */}
      </Flex>
    </Flex>
  );
}

export default NavBar;