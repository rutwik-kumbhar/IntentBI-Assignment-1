import { useEffect, useRef, useState } from "react";
import { Container, Box, Heading, Text } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import FileUploadForm from "./components/FileUploadForm";
import Table from "./components/Table";
import axios from "axios";
import LoginModal from "./components/LoginModal";
import { getSalesData } from "./api";
import AddModal from "./components/AddModal";

function App() {
  const [user, setUserData] = useState(null);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [data, setData] = useState({
    total: 0,
    totalPages: 0,
    perPage: 0,
    currentPage: 0,
    prevPage: false,
    nextPage: false,
    salesRecords: [],
  });
  const loginModalRef = useRef();

  const handleAuthenticate = (data) => {
    setAuthenticated(true);
    setUserData(data);
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setUserData(null);
    localStorage.removeItem("userData");
  };

  const openLoginForm = () => {
    loginModalRef.current.handleOpenModal();
  };

  const getData = async (pageNumber = 1, pageSize = 10) => {
    try {
      const response = await getSalesData(pageNumber, pageSize);
      setData(response.data);
    } catch (error) {
      console.log("failed to get data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      setAuthenticated(true);
      setUserData(JSON.parse(userData));
    }
  }, []);

  return (
    <Container maxW="container.lg" mt={8}>
      <NavBar
        isAuthenticated={isAuthenticated}
        openLoginForm={openLoginForm}
        user={user}
        handleLogout={handleLogout}
      />
      <FileUploadForm getData={getData} isAuthenticated={isAuthenticated} />
      {isAuthenticated ? <AddModal /> : null}

      <Table data={data} isAuthenticated={isAuthenticated} getData={getData} />
      <LoginModal ref={loginModalRef} handleAuthenticate={handleAuthenticate} />
    </Container>
  );
}

export default App;
