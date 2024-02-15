import React from 'react'
import { Button, DatePicker, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
const CreditEdit = ({ CreditID, setCreditEditView, storeCredit, setStoreCredit }) => {
  const [credit, setCredit] = useState();
  const [form] = useForm();
  const fetchItem = async () => {
    const response = await api.get(`/credit/${CreditID}`);
    const itemInfo = await api.get(`items/${response.data.data.ItemId}`);
    console.log(itemInfo.data.data, "item info");
    console.log(response.data.data);
    form.setFieldsValue({
        // firstName: itemInfo.data.data.firstName,
        name: itemInfo.data.data.name,
        quantity: response.data.data.quantity,
        unitPrice: response.data.data.unitPrice,
        referenceNumber: response.data.data.referenceNumber,
        creditDate: dayjs(response.data.data.createdAt),
      });
  }; 
  useEffect(() => {fetchItem()}, [CreditID]);
  const handleEdit = (values) => {
    const updatedItem = { id: CreditID, ...values };
    const formattedItem = {
      id: updatedItem.id,
      date: dayjs(updatedItem.creditDate).format("YYYY-MM-DD"),
      // firstName: updatedItem.firstName,
      name: updatedItem.name,
      quantity: updatedItem.quantity,
      unitPrice: updatedItem.unitPrice,
      referenceNumber: updatedItem.referenceNumber,
    };
    console.log(formattedItem, "formatted^^^^^^^^^^^^^^^^ item");
        //   console.log(updatedItem);
       const updatedItems = storeCredit.map((credit) =>
       credit.id === formattedItem.id ? formattedItem : credit
    );

    console.log(updatedItems, "updates items");
    api.patch(`credit/${CreditID}`,formattedItem).then((response) => {
    console.log(response);


      setStoreCredit(updatedItems)
setCreditEditView(false);
message.success("Credit updated successfully")
    });
  };
  return (
  <div>
      <div className="">
        <div className=" w-full flex items-center justify-center">
          <Form
            onFinish={handleEdit}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            form={Form}>
           <Form.Item
            name="firstName"
            label="Crediter Name"
            rules={[
              {
                required: true,
                message: "Please select one crediter name",
              },
            ]}>
          <Input type="text" placeholder="Dropdown crediter name" />
          </Form.Item>
          <Form.Item
            name="name"
            label="Credited Item"
            rules={[
              {
                required: true,
                message: "Please select one item",
              },
            ]}>
            <Input placeholder="Dropdown item" />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[
              {
                required: true,
                message: "please enter Quantity",
              },
            ]}>
            <Input type="text" placeholder="Quantity" />
          </Form.Item>

          <Form.Item
            name="unitPrice"
            label="Unit Price"
            rules={[
              {
                required: true,
                message: "please enter Unit Price",
              },
            ]}>
            <Input type="text" placeholder="Unit Price" />
            </Form.Item>
            <Form.Item
            name="referenceNumber"
            label="Reference Number"
            rules={[
              {
                required: true,
                message: "please enter Reference Number",
              },
            ]}>
            <Input type="text" placeholder="Reference Number" />
          </Form.Item>
          <Form.Item
            name="createdAt"
            label="Credited Date"
            rules={[
              {
                required: true,
                message: "please enter Credit Date",
              },
            ]}>
            <DatePicker className="w-full" placeholder="Credit Date" />
          </Form.Item>
            <Form.Item className="flex">
              <Button htmlType="submit" className="mr-4">
                Save
              </Button>
              <Button onClick={() => setCreditEditView(false)}>Cancel</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default CreditEdit
