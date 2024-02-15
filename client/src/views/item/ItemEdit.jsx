import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { useForm } from "antd/es/form/Form";
import { Button, Form, Input, message } from "antd";

const ItemEdit = ({ itemID, setItemEditView, storeItems, setStoreItems }) => {
  const [item, setItem] = useState();
  const [form] = useForm();
  const fetchItem = async () => {
    const response = await api.get(`/items/${itemID}`);
    form.setFieldsValue(response.data.data);
  };
  useEffect(() => {
    fetchItem();
  }, [itemID]);
  const handleEdit = (values) => {
    const updatedItem = { id: itemID, ...values };
    //   console.log(updatedItem);
    const updatedItems = storeItems.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );

    api.patch(`items/${itemID}`, updatedItem).then((response) => {
      console.log(response);

      setStoreItems(updatedItems);
      setItemEditView(false);
      message.success("Item updated successfully");
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
              <Button onClick={() => setItemEditView(false)}>Cancel</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default ItemEdit;
