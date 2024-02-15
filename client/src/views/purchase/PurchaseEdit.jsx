import { Button, DatePicker, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";

const PurchaseEdit = ({
  PurchaseID,
  setPurchaseEditView,
  storePurchase,
  setStorePurchase,
}) => {
  const [purchase, setPurchase] = useState();
  const [form] = useForm();
  const fetchItem = async () => {
    const response = await api.get(`purchase/${PurchaseID}`);
    const itemInfo = await api.get(`items/${response.data.data.ItemId}`);
    console.log(itemInfo.data.data, "item info");
    console.log(response.data.data);
    form.setFieldsValue({
      name: itemInfo.data.data.name,
      quantity: response.data.data.quantity,
      unitPrice: response.data.data.unitPrice,
      purchasedDate: dayjs(response.data.data.createdAt),
    });
  };
  useEffect(() => {
    fetchItem();
  }, [PurchaseID]);
  const handleEdit = (values) => {
    const updatedItem = { id: PurchaseID, ...values };
    const formattedItem = {
      id: updatedItem.id,
      date: dayjs(updatedItem.purchasedDate).format("YYYY-MM-DD"),
      name: updatedItem.name,
      quantity: updatedItem.quantity,
      unitPrice: updatedItem.unitPrice,
    };
    console.log(formattedItem, "formatted^^^^^^^^^^^^^^^^ item");
    const updatedItems = storePurchase.map((purchase) =>
      purchase.id === formattedItem.id ? formattedItem : purchase
    );
    console.log(updatedItems, "updatesitems");
    api.patch(`purchase/${PurchaseID}`, formattedItem).then((response) => {
      console.log(response);

      setStorePurchase(updatedItems);
      setPurchaseEditView(false);
      message.success("Purchase updated successfully");
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
                  message: "Please select item name",
                },
              ]}>
              <Input disabled placeholder="Select item name" />
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
              <Input type="number" placeholder="Enter Quantity" />
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
              name="purchasedDate"
              label="Purchased Date"
              rules={[
                {
                  required: true,
                  message: "please enter Purchased Date",
                },
              ]}>
              <DatePicker className="w-full" placeholder="Purchased Date" />
            </Form.Item>
            <Form.Item className="flex">
              <Button htmlType="submit" className="mr-4">
                Save
              </Button>
              <Button onClick={() => setPurchaseEditView(false)}>Cancel</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PurchaseEdit;
