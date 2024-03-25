import React, { useState } from "react";
import { Flex, Button, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import instance from "../api/instance";

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
      const response = await instance.post("file/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      const msg = convertSuccessMsg(response.data);
      getData();
      alert(msg);
    } catch (error) {
      console.log(error);
      alert("Error in file uploading");
    }
    setLoading(false);
  };

  const convertSuccessMsg = (data) => {
    let invalidSheetsArray = [],
      validSheetsArray = [];
    if (data.invalidSheets) {
      invalidSheetsArray = Object.keys(data.invalidSheets).map((key) => [
        key,
        data.invalidSheets[key],
      ]);
    }
    if (data.validSheets) {
      validSheetsArray = Object.keys(data.validSheets).map((key) => [
        key,
        data.validSheets[key],
      ]);
    }
    let msg = "";
    if (invalidSheetsArray.length) {
      msg =
        msg + `Invalid sheets(All Column Should Be Present In The sheet) -> `;
      invalidSheetsArray.map((item, index) => {
        msg = msg + item[0];
        let ending = invalidSheetsArray.length - 1 === index ? " .\n" : " ,";
        msg = msg + ending;
      });
    }

    if (validSheetsArray.length) {
      msg = msg + `Valid sheets(Sheet Uploaded Successfully...!) -> `;
      validSheetsArray.map((item, index) => {
        msg = msg + item[0];
        let ending = validSheetsArray.length - 1 === index ? " .\n" : " ,";
        msg = msg + ending;
      });
    }
    if (data.totalUploadedRecords) {
      msg = msg + "Total  Records Uploaded: " + data.totalUploadedRecords;
    }
    console.log(msg);
    return msg;
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
