import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Stack,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { login } from "../api";
import { Spinner } from "@chakra-ui/react";
import Message from "./Message";

const LoginModal = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const handleOpenModal = () => {
    onOpen();
  };

  const handleCloseModal = () => {
    onClose();
    setFormData({ username: "", password: "" });
    setError(null);
  };

  useImperativeHandle(ref, () => ({
    handleOpenModal,
  }));

  const handleChange = (e) => {
    setError(null);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    if (loading) {
      return;
    }
    setLoading(true);
    setError(null);
    e.preventDefault();
    // Handle form submission here
    try {
      const response = await login(formData);
      const userData = response.data;
      delete userData.message;
      localStorage.setItem("userData", JSON.stringify(userData));
      props.handleAuthenticate(userData)
      onClose()
    } catch (error) {

      if (error.response) {
        console.log(error.response);
        setError(error.response.data.message);
      } else if (error.request) {
        setError(error.request);
        console.log(error.request);
      } else {
        setError(
          "Something happened in setting up the request that triggered an Error"
        );
      }
    }
    setLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={(e) => handleChange(e)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) => handleChange(e)}
                />
              </FormControl>
              <Button type="submit" colorScheme="blue">
                {loading ? <Spinner /> : "Login"}
              </Button>
              {error ? (
                <Message type="error" shouldFade={true} text={error} />
              ) : null}
            </Stack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});

export default LoginModal;
