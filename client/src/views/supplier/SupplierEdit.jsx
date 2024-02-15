import { useEffect, useState } from "react";
import api from "../../utils/api";
import { useForm } from "antd/es/form/Form";
import { Button, Form, Input, message } from "antd";

const SupplierEdit = ({ supplierID, setSupplierEditView, storeSupplier, setStoreSupplier }) => {
  const [supplier, setSupplier] = useState();
  const [form] = useForm();
  const fetchItem = async () => {
    const response = await api.get(`/supplier/${supplierID}`);
    form.setFieldsValue(response.data.data);
  };
  useEffect(() => {
    fetchItem();
  }, [supplierID]);
  const handleEdit = (values) => {
          const updatedItem = { id: supplierID, ...values };
        //   console.log(updatedItem);
        const updatedItems = storeSupplier.map((supplier) =>
          supplier.id === updatedItem.id ? updatedItem : supplier
        );

    api.patch(`supplier/${supplierID}`,updatedItem).then((response) => {
      console.log(response);
      setStoreSupplier(updatedItems)
setSupplierEditView(false);
message.success("Supplier updated successfully")
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
              label="Supplier Name"
              rules={[
                {
                  required: true,
                  message: "Please enter Supplier name",
                },
              ]}>
              <Input placeholder="Enter Supplier last name" />
            </Form.Item>
            <Form.Item
              name="lastName"
              label="Last Name"
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
              ]}>
              <Input type="text" placeholder="phone number" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
             >
              <Input type="text" placeholder="email" />
            </Form.Item>
            <Form.Item className="flex">
              <Button htmlType="submit" className="mr-4">
                Save
              </Button>
              <Button onClick={() => setSupplierEditView(false)}>Cancel</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}
export default SupplierEdit


