import React, { useState, useEffect } from 'react';
import { Alert, CloseButton } from '@chakra-ui/react';

const Message = ({ type, text, shouldFade }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (shouldFade) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [shouldFade]);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <Alert
      status={type === 'error' ? 'error' : 'success'}
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      rounded="md"
      mb={4}
      display={isVisible ? 'flex' : 'none'}
    >
      {text}
      {!shouldFade && <CloseButton position="absolute" right="8px" top="8px" onClick={handleClose} />}
    </Alert>
  );
};

export default Message;