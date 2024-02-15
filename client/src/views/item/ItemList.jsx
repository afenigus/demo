import { Button, Dropdown, Modal, Result, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import Item from "./Item";
import {
  CaretDownFilled,
  CaretUpFilled,
  DownOutlined,
  EditOutlined,
  PrinterOutlined,
  DeleteOutlined,
  PlusOutlined,
  ReloadOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import ItemEdit from "./ItemEdit";
import api from "../../utils/api";

const items = [
  {
    key: "edit",
    label: "Edit",
    icon: <EditOutlined className="text-blue-500" />,
  },
  // {
  //   key: "print",
  //   label: "Print",
  //   icon: <PrinterOutlined />,
  // },
  {
    key: "delete",
    label: "Delete",
    icon: <DeleteOutlined className="text-red-400" />,
  },
];

const ItemList = () => {
  const [itemAddView, setItemAddView] = useState(false);
  const [itemEditView, setItemEditView] = useState(false);
  const [itemDeleteView, setItemDeleteView] = useState(false);
  const [itemID, setItemID] = useState();
  const [itemDeleteID, setItemDeleteID] = useState();
  const [storeItems, setStoreItems] = useState([]);

  const searchData = () => {
    api.get("items").then((response) => {
      // console.log(response.data.data)
      setStoreItems(response.data.data);
    });
  };

  useEffect(() => {
    searchData();
  }, []);
  const onClick = ({ key }, record) => {
    if (key == "edit") {
      console.log(key);
      setItemID(record.id);
      console.log(record.id);
      setItemEditView(true);
    } else if (key === "delete") {
      console.log(key);

      console.log("inside delete key");
      setItemDeleteView(true);
      setItemDeleteID(record.id);
    }
  };
  const columns = [
    {
      title: "#",
      dataIndex: "#",
      key: "#",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Item name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Make",
      dataIndex: "make",
      key: "make",
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      render: (_, record) => (
        <Dropdown
          menu={{
            items,
            onClick: (value) => onClick(value, record),
          }}
        >
          <button className="bg-[#f0f0f0] py-2 px-4 flex items-center justify-center border border-gray-200 rounded ">
            Action <DownOutlined width={10} className="text-[0.65rem]" />
          </button>
        </Dropdown>
      ),
    },
  ];
  const handleDelete = async (id) => {
    try {
      console.log(id, "delete record id");
      api.delete(`items/${id}`).then((response) => {
        setItemDeleteView(false);
        const newItem = storeItems
          .filter((item) => item.id !== id)
          .map((item) => item);
        setStoreItems(newItem);
        message.success("Item deleted successfully");
        searchData();
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="mx-10 mt-10">
      {itemAddView && (
        <Modal
          title="Add item"
          footer={null}
          open={itemAddView}
          onCancel={() => setItemAddView(false)}
        >
          <Item
            storeItems={storeItems}
            setStoreItems={setStoreItems}
            setItemAddView={setItemAddView}
            searchData={searchData}
          />
        </Modal>
      )}
      {itemEditView && (
        <Modal
          title="Add item"
          footer={null}
          open={itemEditView}
          onCancel={() => setItemEditView(false)}
        >
          <ItemEdit
            storeItems={storeItems}
            setStoreItems={setStoreItems}
            itemID={itemID}
            setItemEditView={setItemEditView}
          />
        </Modal>
      )}
      {itemDeleteView && (
        <Modal
          open={itemDeleteView}
          title="Delete purchase"
          onCancel={() => {
            setItemDeleteView(false);
          }}
          footer={null}
        >
          <Result
            status="warning"
            title="Are you sure you want to delete this item?"
            extra={
              <div className="w-full  bordr bordr-red-900">
                <button
                  className="px-4 mr-8  py-2 border border-[#DC3545] 
            text-white bg-[#DC3545] rounded"
                  onClick={() => handleDelete(itemDeleteID)}
                  type="primary"
                >
                  Delete
                </button>
                <button
                  className="border px-4  py-2 rounded border-[#1D9BF0] bg-white text-[#1D9BF0]"
                  onClick={() => {
                    setItemDeleteView(false);
                  }}
                  type="primary"
                >
                  Cancel
                </button>
              </div>
            }
          />
        </Modal>
      )}
      <Button onClick={() => setItemAddView(true)} className="mb-4">
        Add item
      </Button>
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={storeItems}
      />
    </div>
  )
}

export default ItemList;
