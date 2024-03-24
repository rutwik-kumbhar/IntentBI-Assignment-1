import React, { useState, useRef } from "react";
import { Flex, IconButton, Tooltip, Text, Box } from "@chakra-ui/react";
import { AgGridReact } from "ag-grid-react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import EditModal from "./EditModal";

const Table = (props) => {
  const editModal = useRef();

  const openEditModal = (data) => {
    editModal.current.handleOpenModal(data);
  };

  const handleAction = (type, row) => {
    if (type == "edit") {
      openEditModal(row.data);
    } else if (type == "delete") {
      console.log(data);
    } else {
    }
  };

  const CustomButtonComponent = (props) => {
    return (
      <Flex gap={2}>
        <Tooltip label="Edit">
          <IconButton
            aria-label="Edit"
            icon={<EditIcon />}
            variant="outline"
            onClick={() => handleAction("edit", props)}
          />
        </Tooltip>
        <Tooltip label="Delete">
          <IconButton
            aria-label="Delete"
            icon={<DeleteIcon />}
            variant="outline"
            onClick={() => handleAction("delete", props)}
          />
        </Tooltip>
      </Flex>
    );
  };
  // Column Definitions: Defines the columns to be displayed.
  const colDefs = [
    {
      field: "button",
      headerName: "Actions",
      cellRenderer: CustomButtonComponent,
    },
    { field: "salesId", headerName: "Sales ID", width: 80 },
    { field: "market", headerName: "Market" },
    { field: "country", headerName: "Country" },
    { field: "product", headerName: "Product" },
    { field: "discountBand", headerName: "Discount Band" },
    { field: "unitsSold", headerName: "Unit Sold" },
    { field: "manufacturingPrice", headerName: "Man. Price" },
    { field: "salePrice", headerName: "Sales Price" },
    { field: "grossSales", headerName: "Gross Sales" },
    { field: "discounts", headerName: "Discounts" },
    { field: "sales", headerName: "Sales" },
    { field: "cogs", headerName: "Cogs" },
    { field: "profit", headerName: "Profit" },
    { field: "date", headerName: "Date" },
    { field: "monthNumber", headerName: "Month Number" },
    { field: "monthName", headerName: "Month Name" },
    { field: "year", headerName: "Year" },
  ];

  return (
    <Box
      as="nav"
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="lg"
      mb={5}
    >
      <div
        className="ag-theme-quartz" // applying the grid theme
        style={{ height: 500 }} // the grid will fill the size of the parent container
      >
        <AgGridReact
          rowData={props.data}
          columnDefs={colDefs}
          defaultColDef={{ width: 120 }}
          overlayNoRowsTemplate="No data available"
        />
      </div>
      <EditModal ref={editModal} />
    </Box>
  );
};

export default Table;
