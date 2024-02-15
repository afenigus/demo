import { Button, Dropdown, Modal, Result, Table, message } from "antd";
import { useEffect, useState } from "react";
import {
  DownOutlined,
  EditOutlined,
  PrinterOutlined,
  DeleteOutlined,
  DollarOutlined,
  UserOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
// import ItemEdit from './ItemEdit';
import api from "../../utils/api";
import Purchase from "./Purchase";
import PurchaseEdit from "./PurchaseEdit";
import Card from "../../components/common/Card";
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
const PurchaseList = () => {
  const [purchaseAddView, setPurchaseAddView] = useState(false);
  const [purchaseEditView, setPurchaseEditView] = useState(false);
  const [purchaseDeleteView, setPurchaseDeleteView] = useState(false);
  const [purchaseID, setPurchaseID] = useState();
  const [purchaseDeleteID, setPurchaseDeleteID] = useState();
  const [storePurchase, setStorePurchase] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const searchData = () => {
    api.get("purchase").then((response) => {
      console.log(response.data.data);
      setStorePurchase(
        response.data.data.map((item) => ({
          id: item.id,
          ItemId: item.ItemId,
          Item: item.Item,
          name: item.Item.name,
          date: item.createdAt,
          updatedAt: item.updatedAt,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        }))
      );
    });
  };
  useEffect(() => {
    searchData();
  }, []);
  const onClick = ({ key }, record) => {
    if (key == "edit") {
      console.log(key);
      setPurchaseID(record.id);
      console.log(record.id);
      setPurchaseEditView(true);
    } else if (key === "delete") {
      console.log(key);

      console.log("inside delete key");
      setPurchaseDeleteView(true);
      setPurchaseDeleteID(record.id);
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
      title: "Item Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Unit Cost",
      dataIndex: "unitPrice",
      key: "unitPrice",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_, record) => record.date.slice(0, 10),
    },
    {
      render: (_, record) => (
        <Dropdown
          menu={{
            items,
            onClick: (value) => onClick(value, record),
          }}>
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
      api.delete(`purchase/${id}`).then(() => {
        setPurchaseDeleteView(false);
        const newPurchase = storePurchase
          .filter((purchase) => purchase.id !== id)
          .map((purchase) => purchase);
        setStorePurchase(newPurchase);
        message.success("Purchase deleted successfully");
        searchData();
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleCalculation = (record) => {
    console.log(record, "record((((((((((((((((((((((((((((((((((");
    const totalCost =
      record
        ?.map((item) => Number(item.unitPrice) * Number(item.quantity))
        .reduce((total, num) => num + total, 0)
        .toFixed(2) || 0;
    const totalItems =
      record
        ?.map((item) => Number(item.quantity))
        .reduce((total, num) => num + total, 0)
        .toFixed(2) || 0;

    console.log(totalCost, "total");
    console.log(totalItems, "total");
    setTotalCost(totalCost);
    setTotalItems(totalItems);
  };
  useEffect(() => {
    handleCalculation(storePurchase);
  }, [totalCost, totalItems, storePurchase]);
  return (
    <div className="mx-10 mt-10">
      {purchaseAddView && (
        <Modal
          title="Add Purchase"
          footer={null}
          open={purchaseAddView}
          onCancel={() => setPurchaseAddView(false)}>
          <Purchase
            storePurchase={storePurchase}
            setStorePurchase={setStorePurchase}
            setPurchaseAddView={setPurchaseAddView}
            searchData={searchData}
          />
        </Modal>
      )}
      {purchaseEditView && (
        <Modal
          title="Edit Purchase"
          footer={null}
          open={purchaseEditView}
          onCancel={() => setPurchaseEditView(false)}>
          <PurchaseEdit
            storePurchase={storePurchase}
            setStorePurchase={setStorePurchase}
            PurchaseID={purchaseID}
            setPurchaseEditView={setPurchaseEditView}
          />
        </Modal>
      )}
      {purchaseDeleteView && (
        <Modal
          open={purchaseDeleteView}
          title="Delete Purchase"
          onCancel={() => {
            setPurchaseDeleteView(false);
          }}
          footer={null}>
          <Result
            status="warning"
            title="Are you sure you want to delete this Purchase?"
            extra={
              <div className="w-full  bordr bordr-red-900">
                <button
                  className="px-4 mr-8  py-2 border border-[#DC3545] 
            text-white bg-[#DC3545] rounded"
                  onClick={() => handleDelete(purchaseDeleteID)}
                  type="primary">
                  Delete
                </button>
                <button
                  className="border px-4  py-2 rounded border-[#1D9BF0] bg-white text-[#1D9BF0]"
                  onClick={() => {
                    setPurchaseDeleteView(false);
                  }}
                  type="primary">
                  Cancel
                </button>
              </div>
            }
          />
        </Modal>
      )}
      <Button onClick={() => setPurchaseAddView(true)} className="mb-4">
        Add Purchase
      </Button>
      <div className="w-full flex mb-4">
        <div className="mr-6">
          <Card
            logo={
              <div className="mr-4 bg-[#E7EDFF] p-4 rounded-full">
                <ShoppingOutlined className="text-[#396AFF] " />
              </div>
            }
            statusname="Total Items"
            statusamount={totalItems}
          />
        </div>
        <Card
          logo={
            <div className="mr-4 bg-[#DCFAF8] p-4 rounded-full">
              <DollarOutlined className="text-[#16DBCC] " />
            </div>
          }
          statusname="Total Cost"
          statusamount={totalCost}
        />
      </div>
      <Table
        // title={(record) => handleCalculation(record)}
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={storePurchase}
      />
    </div>
  );
};

export default PurchaseList;
