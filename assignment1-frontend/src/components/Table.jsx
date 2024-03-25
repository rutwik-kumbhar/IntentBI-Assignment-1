import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Flex,
  IconButton,
  Tooltip,
  Box,
  Button,
  ButtonGroup,
  Stack,
  Text,
  HStack,
} from "@chakra-ui/react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import EditModal from "./EditModal";
import { deleteRecord } from "../api";
import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Container,
} from "@chakra-ui/react";
import ReactPaginate from "react-paginate";
import moment from "moment";

const Table = (props) => {
  const { salesRecords, currentPage, totalPages } = props.data;
  const editModal = useRef();
  const [rowData, setRowData] = useState([]);
  const openEditModal = (data) => {
    editModal.current.handleOpenModal(data);
  };

  const handleAction = async (type, row) => {
    if (type == "edit") {
      let data = { ...row, date: moment(row.date).format("yyyy-MM-DD") };
      openEditModal(data);
    } else if (type == "delete") {
      try {
        const confirmDelet = confirm("Are  you sure to delete this record?");
        if (confirmDelet) {
          await deleteRecord(row.salesId);
          await props.getData(currentPage + 1);
        }
      } catch (error) {}
    } else {
    }
  };

  useEffect(() => {
    setRowData(salesRecords);
  }, [salesRecords]);

  const CustomButtonComponent = ({ data }) => {
    return (
      <Flex gap={2}>
        <Tooltip label="Edit">
          <IconButton
            aria-label="Edit"
            icon={<EditIcon />}
            variant="outline"
            onClick={() => handleAction("edit", data)}
          />
        </Tooltip>
        <Tooltip label="Delete">
          <IconButton
            aria-label="Delete"
            icon={<DeleteIcon />}
            variant="outline"
            onClick={() => handleAction("delete", data)}
          />
        </Tooltip>
      </Flex>
    );
  };

  const handlePreviousPage = () => {
    if (currentPage + 1 > 1) {
      props.getData(currentPage);
    }
  };

  const handleNextPage = () => {
    if (currentPage + 1 < totalPages) {
      props.getData(currentPage + 1 + 1);
    }
  };

  const [sort, setSortType] = useState("desc");
  const [activeField, setActiveField] = useState("");

  const sortByField = (prop) => {
    setActiveField(prop);
    let data = [...rowData];
    if (sort === "asc") {
      data.sort((a, b) => (a[prop] > b[prop] ? 1 : b[prop] > a[prop] ? -1 : 0));
    } else {
      data.sort((a, b) => (a[prop] < b[prop] ? 1 : b[prop] < a[prop] ? -1 : 0));
    }
    setRowData(data);
    if (sort === "asc") {
      setSortType("desc");
    }
    if (sort === "desc") {
      setSortType("asc");
    }
  };

  const columns = [
    {
      field: "salesId",
      title: "Sales ID",
    },
    {
      field: "market",
      title: "Market",
    },
    {
      field: "country",
      title: "Country",
    },
    {
      field: "product",
      title: "Product",
    },
    {
      field: "discountBand",
      title: "Discounted Band",
    },
    {
      field: "unitsSold",
      title: "Unit Sold",
    },
    {
      field: "manufacturingPrice",
      title: "Mfg Price ",
    },
    {
      field: "salePrice",
      title: "Sale Price",
    },
    {
      field: "grossSales",
      title: "Gross Sale",
    },
    {
      field: "discounts",
      title: "Discount",
    },
    {
      field: "sales",
      title: "Sales",
    },
    {
      field: "cogs",
      title: "Cogs",
    },
    {
      field: "profit",
      title: "Prpfit",
    },
    {
      field: "date",
      title: "Date",
    },
    {
      field: "monthNumber",
      title: "Country",
    },
    {
      field: "monthName",
      title: "Month Number",
    },
    {
      field: "year",
      title: "Year",
    },
    
    
    
  ];

  return (
    <Box
      as="nav"
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="lg"
      mb={5}
    >
      <Box>
        <Box overflow={"scroll"} height={400}>
          <ChakraTable variant="simple">
            <Thead>
              <Tr>
                {props.isAuthenticated ? <Th>Actions</Th> : null}
                {columns.map((item) => {
                  return (
                    <Th   
                      cursor={"pointer"}
                      onClick={() => sortByField(item.field)}
                    >
                      <HStack>
                        <Text>{item.title}</Text>{" "}
                        {activeField == item.field ? (
                          sort == "asc" ? (
                            <FaSortUp />
                          ) : (
                            <FaSortDown />
                          )
                        ) : null}
                      </HStack>
                    </Th>
                  );
                })}
                {/* Add more table headers as needed */}
              </Tr>
            </Thead>
            <Tbody>
              {rowData.map((item) => (
                <Tr key={item.salesId}>
                  {props.isAuthenticated ? (
                    <Td>
                      <CustomButtonComponent data={item} />
                    </Td>
                  ) : null}

                  <Td>{item.salesId}</Td>
                  <Td>{item.market}</Td>
                  <Td>{item.country}</Td>
                  <Td>{item.product}</Td>
                  <Td>{item.discountBand}</Td>
                  <Td>{item.unitsSold}</Td>
                  <Td>{item.manufacturingPrice}</Td>
                  <Td>{item.name}</Td>
                  <Td>{item.salePrice}</Td>
                  <Td>{item.grossSales}</Td>
                  <Td>{item.discounts}</Td>
                  <Td>{item.sales}</Td>
                  <Td>{item.cogs}</Td>
                  <Td>{item.profit}</Td>
                  <Td>{moment(item.date).format("MM/DD/YYYY")}</Td>
                  <Td>{item.monthNumber}</Td>
                  <Td>{item.monthName}</Td>
                  <Td>{item.year}</Td>
                </Tr>
              ))}
            </Tbody>
          </ChakraTable>
        </Box>
        <Box justifyContent={"end"} display={"flex"} m={1}>
          <ButtonGroup mt={4} spacing="2">
            <Button
              onClick={handlePreviousPage}
              disabled={currentPage + 1 === 1}
            >
              Previous
            </Button>
            <Button variant="outline">
              {currentPage + 1} of {totalPages}
            </Button>
            <Button
              onClick={handleNextPage}
              disabled={currentPage + 1 === totalPages}
            >
              Next
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
      <EditModal
        ref={editModal}
        currentPage={currentPage}
        getData={props.getData}
      />
    </Box>
  );
};

export default Table;
