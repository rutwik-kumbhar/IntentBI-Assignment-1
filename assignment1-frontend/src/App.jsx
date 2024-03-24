import { useEffect, useState } from "react";
import { Container, Box, Heading, Text } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import FileUploadForm from "./components/FileUploadForm";
import Table from "./components/Table";
import axios from "axios";

function App() {
  const [isAuthenticated, setAuthenticated] = useState(true);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/v1/sales", {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout:20000
      });
      setData(response.data)
      console.log(response.data);
    } catch (error) {
      console.log("failed to get data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    // const token = localStorage.getItem('token')
    // if(token){
    //   setAuthenticated(true)
    // }
  }, []);

  return (
    <Container maxW="container.lg" mt={8}>
      <NavBar isAuthenticated={isAuthenticated} />
      <FileUploadForm getData={getData} isAuthenticated={isAuthenticated} />
      <Table data={data} isAuthenticated={isAuthenticated} />
    </Container>
  );
}

export default App;
