import { Button, Form, Input, message } from 'antd';
import { useEffect, useState } from "react";
import api from '../../utils/api';
import { useForm } from 'antd/es/form/Form';

const CustomerEdit = ({ customerID, setCustomerEditView, storeCustomer,  setStoreCustomer}) => {
  const [customer, setCustomer] = useState();
  const [form] = useForm();
  const fetchItem = async () => {
    const response = await api.get(`/customer/${customerID}`);
    form.setFieldsValue(response.data.data);
  }; 
  useEffect(() => {
    fetchItem();
  }, [customerID]);
  const handleEdit = (values) => {
          const updatedItem = { id: customerID, ...values };
        //   console.log(updatedItem);
        const updatedItems = storeCustomer.map((customer) =>
          customer.id === updatedItem.id ? updatedItem : customer
        );

    api.patch(`customer/${customerID}`,updatedItem).then((response) => {
      console.log(response);


      setStoreCustomer(updatedItems)
setCustomerEditView(false);
message.success("Customer updated successfully")
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
            form={form}>
            <Form.Item
              name="firstName"
              label="Customer Name"
              rules={[
                {
                  required: true,
                  message: "Please enter Customer name",
                },
              ]}>
              <Input placeholder="Enter Customer name" />
            </Form.Item>
            <Form.Item
              name="lastName"
              label="Customer Last Name"
              rules={[
                {
                  required: true,
                  message: "please enter last name",
                },
              ]}>
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
                 message: 'Enter a valid phone number start like +251- or 09!',
                },

              ]}>
              <Input type="text" placeholder="phone number" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "please enter email",
                },
              ]}>
              <Input type="text" placeholder="email" />
            </Form.Item>
            <Form.Item className="flex">
              <Button htmlType="submit" className="mr-4">
                Save
              </Button>
              <Button onClick={() => setCustomerEditView(false)}>Cancel</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default CustomerEdit
