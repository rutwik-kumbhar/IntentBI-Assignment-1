import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import {updateRecord } from "../api";

const EditModal = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const handleOpenModal = (data) => {
    onOpen();
    setFormData(data);
  };

  const handleCloseModal = () => {
    onClose();
    setFormData({});
  };

  useImperativeHandle(ref, () => ({
    handleOpenModal,
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    const data = formData;
    const id = data.salesId;
    delete data.salesId;
    await updateRecord(id, data);
    alert("Record Updated")
    await props.getData(props.currentPage+1)
    onClose()
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Market</FormLabel>
              <Input
                type="text"
                name="market"
                value={formData.market}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Product</FormLabel>
              <Input
                type="text"
                name="product"
                value={formData.product}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Discount Band</FormLabel>
              <Input
                type="text"
                name="discountBand"
                value={formData.discountBand}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Units Sold</FormLabel>
              <Input
                type="number"
                name="unitsSold"
                value={formData.unitsSold}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Manufacturing Price</FormLabel>
              <Input
                type="number"
                name="manufacturingPrice"
                value={formData.manufacturingPrice}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Sale Price</FormLabel>
              <Input
                type="number"
                name="salePrice"
                value={formData.salePrice}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Gross Sales</FormLabel>
              <Input
                type="number"
                name="grossSales"
                value={formData.grossSales}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Sales</FormLabel>
              <Input
                type="number"
                name="sales"
                value={formData.sales}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>COGS</FormLabel>
              <Input
                type="number"
                name="cogs"
                value={formData.cogs}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Profit</FormLabel>
              <Input
                type="number"
                name="profit"
                value={formData.profit}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Date</FormLabel>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Month Number</FormLabel>
              <Input
                type="number"
                name="monthNumber"
                value={formData.monthNumber}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Month Name</FormLabel>
              <Input
                type="text"
                name="monthName"
                value={formData.monthName}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Year</FormLabel>
              <Input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
              />
            </FormControl>
            <Button mt={4} colorScheme="blue" type="submit">
              Submit
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});

export default EditModal;
