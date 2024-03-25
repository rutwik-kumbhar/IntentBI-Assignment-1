import React, { useState } from "react";
import { Flex, Button, Input, VStack, Spinner } from "@chakra-ui/react";
import axios from "axios";
import instance from "../api/instance";
import Message from "./Message";

const FileUploadForm = ({ getData, isAuthenticated }) => {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const [uploadResponse, setUploadResponse] = useState(null);
  const [errorResponse, setErrorResponse] = useState(null);

  const handleFileUpload = async () => {
    setErrorResponse(null);
    if (!isAuthenticated) {
      alert("Please login first");
      return;
    }
    if (selectedFile == null) {
      alert("Please select file");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    setLoading(true);
    setUploadResponse(null);
    try {
      const response = await instance.post("file/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadResponse(response.data);
      getData();
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        setErrorResponse(error.response.data.message);
      } else if (error.request) {
        setErrorResponse(error.request);
        console.log(error.request);
      } else {
        setErrorResponse(
          "Something happened in setting up the request that triggered an Error"
        );
      }
    }
    setLoading(false);
  };

  return (
    <VStack
      as="nav"
      padding="1rem"
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="lg"
      mb={5}
    >
      <Flex align="center" justify="center">
        <Flex align="center" mr={4}>
          <Input
            type="file"
            id="file-upload"
            accept=".xls,.xlsx"
            onChange={handleFileChange}
            //   display="none"
          />
          {/* Add more navigation links here if needed */}
        </Flex>
        <Flex align="center">
          <Button colorScheme="blue" mr={4} onClick={() => handleFileUpload()}>
            {loading ? <Spinner size={"xs"} /> : "Upload File"}
          </Button>
          {/* Add more navigation elements here */}
        </Flex>
      </Flex>
      <VStack>
        {uploadResponse &&
        uploadResponse.invalidSheet &&
        uploadResponse.invalidSheet.length
          ? uploadResponse.invalidSheet.map((sheet) => (
              <Message
                type={"error"}
                text={`${sheet.sheetName} => ${sheet.errorMessage}`}
                shouldFade
              />
            ))
          : null}
        {uploadResponse &&
        uploadResponse.validSheet &&
        uploadResponse.validSheet.length
          ? uploadResponse.validSheet.map((sheet) => (
              <Message
                type={"success"}
                text={`${sheet.sheetName} => ${sheet.errorMessage}`}
                shouldFade
              />
            ))
          : null}
        {uploadResponse && uploadResponse.totalUploadedRecords ? (
          <Message
            type={"success"}
            text={`Total Records inserted => ${uploadResponse.totalUploadedRecords}`}
            shouldFade
          />
        ) : null}

        {errorResponse ? (
          <Message type={"error"} text={errorResponse} shouldFade />
        ) : null}
      </VStack>
    </VStack>
  );
};

export default FileUploadForm;
