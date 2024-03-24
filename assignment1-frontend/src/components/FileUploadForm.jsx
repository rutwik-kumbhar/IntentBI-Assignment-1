import React, { useState } from "react";
import { Flex, Button, Input, Text } from "@chakra-ui/react";
import axios from "axios";

const FileUploadForm = ({ getData, isAuthenticated }) => {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
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
    try {
      const response = await axios.post("http://localhost:8081/api/v1/file/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
     alert("File Uploaded Sucsessfully")
      getData();
    } catch (error) {
      alert("Error in file uploading");
    }
    setLoading(false);
  };
  return (
    <Flex
      as="nav"
      align="center"
      justify="center"
      padding="1rem"
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="lg"
      mb={5}
    >
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
          Upload
        </Button>
        {/* Add more navigation elements here */}
      </Flex>
    </Flex>
  );
};

export default FileUploadForm;
