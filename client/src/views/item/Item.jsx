import React from 'react'
import {Button, Form, Input, message} from 'antd'
import api from '../../utils/api'
const Item = ({ setItemAddView, storeItems, setStoreItems, searchData }) => {
  const handleFinish = (values) => {
    console.log(values, "values");
    api.post("items", values).then((response) => {
      if (response.status === 201) {
        message.success("Item added successfully!");
        setStoreItems([...storeItems, values]);
        setItemAddView(false);
        searchData();
      } else {
        message.error("An error occurred");
      }
      console.log(response, "response from item view");
    });
  };
  return (
      <div className=" w-full flex items-center justify-center">
        <Form
          onFinish={handleFinish}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}>
          <Form.Item
            name="name"
            label="Item Name"
            rules={[
              {
                required: true,
                message: "Please enter a item name",
              },
            ]}>
            <Input placeholder="Enter item name" />
          </Form.Item>
          <Form.Item
            name="make"
            label="Make"
            rules={[
              {
                required: true,
                message: "please enter make",
              },
            ]}>
            <Input type="text" placeholder="make" />
          </Form.Item>

          <Form.Item
            name="model"
            label="Model"
            rules={[
              {
                required: true,
                message: "please enter model",
              },
            ]}>
            <Input type="text" placeholder="model" />
          </Form.Item>
          <Form.Item
            name="brand"
            label="Brand"
            rules={[
              {
                required: true,
                message: "please enter brand",
              },
            ]}>
            <Input type="text" placeholder="brand" />
          </Form.Item>
          <Form.Item className="flex">
            <Button htmlType="submit" className="mr-4">
              Submit
            </Button>
            <Button onClick={() => setItemAddView(false)}>Cancel</Button>
          </Form.Item>
        </Form>
      </div>
  )
}

export default Item