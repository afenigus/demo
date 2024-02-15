import React from 'react'
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
import { Button, Form, Input, message } from 'antd';
import api from '../../utils/api'
const Customer = ({ setCustomerAddView, storeCustomer, setStoreCustomer, searchData }) => {
    const handleFinish = (values) => {
    console.log(values, "values");
    api.post("customer", values).then((response) => {
      if (response.status === 201) {
        message.success("Customer Added Successfully!");
        setStoreCustomer([...storeCustomer, values]);
        setCustomerAddView(false);
        searchData();
      } else {
        message.error("An error occurred");
      }
      console.log(response, "response from Customer view");
    });
  };
  return (
        <div className=" w-full flex items-center justify-center bordr bordr-red-900">
        <Form
          onFinish={handleFinish}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}>
          <Form.Item
            name="firstName"
            label="Customer Name"
            rules={[
              {
                required: true,
                message: "please enter Customr name",
              },
            ]}>
            <Input type="text" placeholder="name" />
            </Form.Item>
                  
            <Form.Item
            name="lastName"
            label=" Last Name"
           >
            <Input type="text" placeholder="last name" />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: "please enter phone number",
              },
               {    
            pattern: /^[ +,\d 0-9, \s\- ]+$/,  // Regular expression to allow only numeric characters
            message: 'Please enter a valid phone number like +251- or 09',
          },
            ]}>
            <Input type="text" placeholder="phone number" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            >
            <Input type="email" placeholder="email" />
          </Form.Item>
          <Form.Item className="flex">
            <Button htmlType="submit" className="mr-4">
              Save
            </Button>
            <Button onClick={() => setCustomerAddView(false)}>Cancel</Button>
          </Form.Item>
        </Form>
      </div>
  )
}

export default Customer;