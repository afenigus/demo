import { Button, DatePicker, Empty, Form, Input, Select, message } from "antd";
import api from "../../utils/api";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import moment from "moment";
const { Option } = Select;
const Purchase = ({
  setPurchaseAddView,
  storePurchase,
  setStorePurchase,
  searchData,
}) => {
  const [items, setItems] = useState([]);
  const [focusedSelect, setFocusedSelect] = useState(false);
  const [itemID, setItemID] = useState();
  const [searchText, setSearchText] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [form] = useForm();
  const dateFormat = "YYYY/MM/DD";
  async function searchitems() {
    try {
      const items = await api.get(
        `items/search?page=${1}&limit=${10}&searchText=${searchText}`
      );
      console.log(items, "search result for items");
      setItems(items.data.data);
    } catch (error) {}
  }
  const handleFinish = (values) => {
    console.log(values, "values");
    const { item, ...filteredValues } = values;
    console.log(filteredValues, "filtered values((((((((((((((^^^^^^^^^^^");
    //formatting the data for teh purchase list live update    // console.log(filteredValues, "filtered values((((((((((((((^^^^^^^^^^^");
    const parsedItem = JSON.parse(item);
    //formatting the data for teh purchase list live update
    const formattedValues = {
      name: parsedItem.name,
      quantity: filteredValues.quantity,
      unitPrice: filteredValues.unitPrice,
      date: dayjs(values.purchasedDate).format("YYYY-MM-DD"),
    };
    // console.log(parsedItem, "values((((((((((((((^^^^^^^^^^^");

    api.post("purchase", values).then((response) => {
      if (response.status === 201) {
        message.success("Purchase Added Successfully!");
        setStorePurchase([...storePurchase, formattedValues]);
        setPurchaseAddView(false);
        searchData();
      } else {
        message.error("An error occurred");
      }
      console.log(response, "response from Purchase view");
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
      form.setFieldsValue({
        ...selectedItem,
        ItemId: selectedItem.id,
        // ItemId: selectedItem.id,
      });
      // setItemID(selectedItem.id);
      // form.setFieldsValue({
      //   purchasedDate: selectedItem.createdAt,
      // });
      console.log(itemID);
    }
  }, [selectedItem]);
  const onChange = (value, option) => {
    console.log(value, "value***********************");
    const item = JSON.parse(value);
    setSelectedItem(item);
  };
  const onSearch = (value) => {
    console.log("search:", value);
    setSearchText(value);
  };
  // const handleSelect = (value, option) => {
  //   console.log("select:", value, option);
  // };
  // form.setFieldsValue({ purchaseDate: dayjs(Date.now()).format() });
  return (
    <div className=" w-full flex items-center justify-center">
      <Form
        onFinish={handleFinish}
        labelCol={{ span: 24 }}
        form={form}
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
          name="item"
          required={[
            {
              required: true,
              message: "Please enter item",
            },
          ]}
          label="item"
          className="mr-8">
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
          name="purchasedDate"
          label="Purchased Date"
          // value={}
          initialValue={moment()}
          rules={[
            {
              required: true,
              message: "please enter Purchased Date",
            },
          ]}>
          <DatePicker
            className="w-full"
            // ={}
            format={dateFormat}
            // defaultValue={dayjs().format()}
            placeholder="Purchased Date"
          />
        </Form.Item>
        <Form.Item className="flex">
          <Button htmlType="submit" className="mr-4">
            Save
          </Button>
          <Button onClick={() => setPurchaseAddView(false)}>Cancel</Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Purchase;
