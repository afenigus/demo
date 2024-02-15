import React from 'react'
import { Button, Form, Input, message } from 'antd';
import api from '../../utils/api'
const Payment = ({ setPaymentAddView, storePayment, setStorePayment, searchData }) => {
    const handleFinish = (values) => {
    console.log(values, "values");
    api.post("payment", values).then((response) => {
      if (response.status === 201) {
        message.success("Payment Added Successfully!");
        setStorePayment([...storePayment, values]);
        setPaymentAddView(false);
        searchData();
      } else {
        message.error("An error occurred");
      }
      console.log(response, "response from Payment view");
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
                message: "Please press Dropdown and select one Customer",
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
            label="Payment"
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

export default Payment
