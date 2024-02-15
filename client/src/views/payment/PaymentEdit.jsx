import React from 'react'
import { Button, Form, Input, message } from 'antd';
import { useEffect, useState } from "react";
import api from '../../utils/api';
import { useForm } from 'antd/es/form/Form';
const PaymentEdit = ({ PaymentID, setPaymentEditView, storePayment,  setStorePayment }) => {
  const [payment, setPayment] = useState();
  const [form] = useForm();
  const fetchItem = async () => {
    const response = await api.get(`/payment/${PaymentID}`);
    form.setFieldsValue(response.data.data);
  }; 
  useEffect(() => {
    fetchItem();
  }, [PaymentID]);
  const handleEdit = (values) => {
          const updatedItem = { id: PaymentID, ...values };
        //   console.log(updatedItem);
        const updatedItems = storePayment.map((payment) =>
          payment.id === updatedItem.id ? updatedItem : payment
        );

    api.patch(`payment/${PaymentID}`,updatedItem).then((response) => {
      console.log(response);


      setStorePayment(updatedItems)
setPaymentEditView(false);
message.success("Payment updated successfully")
    });
  };
  return (
   <div className=" w-full flex items-center justify-center">
        <Form
          onFinish={handleFinish}
          labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}>
         <Form.Item
            name="crediterName"
            label="Crediter Name"
            rules={[
              {
                required: true,
                message: "Please press Dropdown and select one Crediter",
              },
            ]}>
          <Input type="text" placeholder="Dropdown crediter name" />
          </Form.Item>
          <Form.Item
            name="name"
            label="Item Name"
            rules={[
              {
                required: true,
                message: "Please press Dropdown and select one item",
              },
            ]}>
            <Input placeholder="Dropdown item name" />
          </Form.Item>
          <Form.Item
            name="amount"
            label="Initial Amount"
            rules={[
              {
                required: true,
                message: "please enter amount",
              },
            ]}>
            <Input type="text" placeholder="Initial Amount" />
          </Form.Item>

          <Form.Item
            name="paymentdate"
            label="Payment Date"
            rules={[
              {
                required: true,
                message: "please enter payment Date",
              },
            ]}>
            <Input type="Date" placeholder="payment Date" />
          </Form.Item>
          <Form.Item className="flex">
            <Button htmlType="submit" className="mr-4">
              Save
            </Button>
            <Button onClick={() => setPaymentAddView(false)}>Cancel</Button>
          </Form.Item>
        </Form>
      </div>
  
  )
}

export default PaymentEdit
