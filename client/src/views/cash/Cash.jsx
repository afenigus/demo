import React from "react";
import { Button, DatePicker, Empty, Form, Input, Select, message } from "antd";
import api from "../../utils/api";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import moment from "moment";
const { Option } = Select;
const Cash = ({ setCashAddView, storeCash, setStoreCash, searchData }) => {
  const [items, setItems] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [focusedSelect, setFocusedSelect] = useState(false);
  const [focusedSelectCustomer, setFocusedSelectCustomer] = useState(false);
  const [itemID, setItemID] = useState();
  const [searchText, setSearchText] = useState("");
  const [searchTextCustomer, setSearchTextCustomer] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [form] = useForm();
  const dateFormat = "YYYY/MM/DD";
  async function searchitems() {
    try {
      const items = await api.get(
        `items?page=${1}&limit=${10}&searchText=${searchText}`
      );
      console.log(items, "search result for items");
      setItems(items.data.data);
    } catch (error) {}
  }
  async function searchcustomers() {
    try {
      const customers = await api.get(
        `customer?page=${1}&limit=${10}&searchText=${searchTextCustomer}`
      );
      console.log(customers, "search result for customers");
      setCustomers(customers.data.data);
    } catch (error) {}
  }
  const handleFinish = (values) => {
    console.log(values, "values");
    const { item, name, firstName, createdAt, ...filteredValues } = values;
    const itemInfo = JSON.parse(name);
    const customerInfo = JSON.parse(firstName);
    const cash = {
      ...filteredValues,
      date: createdAt,
      ItemId: itemInfo.id,
      CustomerId: customerInfo.id,
    };
    console.log(cash, "cash55555555555555555");

    // formatting the data for teh purchase list live update
    const formattedValues = {
      firstName: customerInfo.firstName,
      Item: itemInfo,
      quantity: filteredValues.quantity,
      unitPrice: filteredValues.unitPrice,
      referenceNumber: filteredValues.referenceNumber,
      date: dayjs(values.createdAt).format("YYYY-MM-DD"),
    };
    console.log(formattedValues, "formatte values");
    api.post("cash", cash).then((response) => {
      if (response.status === 201) {
        message.success("Cash Added Successfully!");
        setStoreCash([...storeCash, formattedValues]);
        setCashAddView(false);
        searchData();
      } else {
        message.error("An error occurred");
      }
      console.log(response, "response from Cash view");
    });
  };
  useEffect(() => {
    if (focusedSelect) {
      const delayTimer = setTimeout(() => {
        // dispatch(updateitemListState({ page: 1, limit: 50, searchText: "" }));
        searchitems();
        // setFocusedSelect(false);
      }, 300);

      return () => {
        clearTimeout(delayTimer);
      };
    } else {
      setItems([]);
    }
  }, [focusedSelect]);
  useEffect(() => {
    if (focusedSelectCustomer) {
      const delayTimer = setTimeout(() => {
        // dispatch(updateitemListState({ page: 1, limit: 50, searchText: "" }));
        searchcustomers();
        // setFocusedSelect(false);
      }, 300);

      return () => {
        clearTimeout(delayTimer);
      };
    } else {
      setCustomers([]);
    }
  }, [focusedSelectCustomer]);
  const NoContentFounditem = () => (
    <div className="p-5">
      {" "}
      <Empty
        className=" boder-red-900 flex flex-col items-center"
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{}}
        description={
          <span className="text-gray-400">
            <h3>No results found</h3>
            <h3>Check your search keyword</h3>
          </span>
        }></Empty>
    </div>
  );

  useEffect(() => {
    if (selectedItem) {
      // form.setFieldsValue({
      //   ...selectedItem,
      //   purchasedDate: ,
      //   // ItemId: selectedItem.id,
      // });
      console.log(selectedItem, "item");
      form.setFieldValue("ItemId", selectedItem.id);
      // form.setFieldsValue({
      //   ...selectedItem,
      //   ItemId: selectedItem.id,
      //   // ItemId: selectedItem.id,
      // });
      // setItemID(selectedItem.id);
      // form.setFieldsValue({
      //   purchasedDate: selectedItem.createdAt,
      // });
      console.log(itemID);
    }
  }, [selectedItem]);
  useEffect(() => {
    if (selectedCustomer) {
      // form.setFieldsValue({
      //   ...selectedCustomer,
      //   purchasedDate: ,
      //   // ItemId: selectedCustomer.id,
      // });
      console.log(selectedCustomer, "item");
      form.setFieldValue("ItemId", selectedCustomer.id);
      // form.setFieldsValue({
      //   ...selectedCustomer,
      //   ItemId: selectedCustomer.id,
      //   // ItemId: selectedCustomer.id,
      // });
      // setItemID(selectedCustomer.id);
      // form.setFieldsValue({
      //   purchasedDate: selectedCustomer.createdAt,
      // });
      console.log(itemID);
    }
  }, [selectedCustomer]);
  const onChange = (value, option) => {
    console.log(value, "value***********************");
    const item = JSON.parse(value);
    setSelectedItem(item);
  };
  const onChangeCustomer = (value, option) => {
    console.log(value, "value***********************");
    const item = JSON.parse(value);
    setSelectedItem(item);
  };
  const onSearch = (value) => {
    console.log("search:", value);
    setSearchText(value);
  };
  const onSearchCustomer = (value) => {
    console.log("search:", value);
    setSearchTextCustomer(value);
  };
  // const handleSelect = (value, option) => {
  //   console.log("select:", value, option);
  // };
  // form.setFieldsValue({ purchaseDate: dayjs(Date.now()).format() });
  return (
    <div className=" w-full flex items-center justify-center">
      <Form
        onFinish={handleFinish}
        form={form}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}>
        <Form.Item
          name="ItemId"
          required={[
            {
              required: true,
              message: "Please enter item",
            },
          ]}
          label="ItemId"
          className="mr-8 hidden">
          <Input />
        </Form.Item>
        <Form.Item
          name="firstName"
          label="Customer Name"
          rules={[
            {
              required: true,
              message: "Please press Dropdown and select one Customer",
            },
          ]}>
          <Select
            // mode="multiple"
            showSearch
            // onSelect={handleSelect}
            optionFilterProp="children"
            onSearch={onSearchCustomer}
            // filterOption={filterOption}
            placeholder="item"
            onClick={() => {
              setFocusedSelectCustomer(true);
            }}
            notFoundContent={<NoContentFounditem />}
            onChange={onChangeCustomer}>
            {customers?.map((customer) => (
              <Option key={customer.id} value={JSON.stringify(customer)}>
                {customer.firstName}-{customer.lastName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="name"
          label="Item Name"
          className="mr-8"
          rules={[
            {
              required: true,
              message: "Please select one item",
            },
          ]}>
          <Select
            // mode="multiple"
            showSearch
            // onSelect={handleSelect}
            optionFilterProp="children"
            onSearch={onSearch}
            // filterOption={filterOption}
            placeholder="item"
            onClick={() => {
              setFocusedSelect(true);
            }}
            notFoundContent={<NoContentFounditem />}
            onChange={onChange}>
            {items?.map((item) => (
              <Option key={item.id} value={JSON.stringify(item)}>
                {item.name}-{item.model}
              </Option>
            ))}
          </Select>
          {/* <Input placeholder="Dropdown item name" /> */}
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
          label="Reference No"
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
          label="Cash Date"
          initialValue={moment()}
          rules={[
            {
              required: true,
              message: "please enter Cash Date",
            },
          ]}>
          <DatePicker
            className="w-full"
            // ={}
            format={dateFormat}
            // defaultValue={dayjs().format()}
            placeholder="Cash Date"
          />
        </Form.Item>
        <Form.Item className="flex">
          <Button htmlType="submit" className="mr-4">
            Save
          </Button>
          <Button onClick={() => setCashAddView(false)}>Cancel</Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default Cash
