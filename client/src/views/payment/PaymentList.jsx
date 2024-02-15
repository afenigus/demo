import React from 'react'
import { Button, Dropdown, Modal, Result, Table, message } from 'antd';
import { useEffect, useState } from 'react';
import {
  DownOutlined,
  EditOutlined,
  PrinterOutlined,
  DeleteOutlined,

} from "@ant-design/icons";
// import ItemEdit from './ItemEdit';
import api from '../../utils/api';
import Payment from './Payment';
import PaymentEdit from './PaymentEdit';
const items = [
  {
    key: "edit",
    label: "Edit",
    icon: <EditOutlined className="text-blue-500" />,
  },
  {
    key: "print",
    label: "Print",
    icon: <PrinterOutlined />,
  },
  {
    key: "delete",
    label: "Delete",
    icon: <DeleteOutlined className="text-red-400" />,
  },
];
const PaymentList = () => {
 const[paymentAddView, setPaymentAddView]=useState(false)
  const[paymentEditView, setPaymentEditView]=useState(false)
  const[paymentDeleteView, setPaymentDeleteView]=useState(false)
const[paymentID,setPaymentID]=useState()
const[paymentDeleteID,setPaymentDeleteID]=useState()
  const[storePayment, setStorePayment]=useState([])
  const searchData=()=>{
    api.get("Payment").then((response) => {
      // console.log(response.data.data)
      setStorePayment(response.data.data);
    });
  }
  useEffect(() =>{
searchData()
  },[])
   const onClick = ({ key }, record) => {
     if (key == "edit") {
      console.log(key)
       setPaymentID(record.id);
       console.log(record.id);
      setPaymentEditView(true);
     } else if (key === "delete") {
       console.log(key);

        console.log("inside delete key");
        setPaymentDeleteView(true)
        setPaymentDeleteID(record.id);

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
        title: "Crediter Name",
        dataIndex: "firstName",
        key: "crediter_name",
      },
      {
        title: "Item Name",
        dataIndex: "name",
        key: "item_name",
      },
      {
        title: "Payment",
        dataIndex: "amount",
        key: "amount",
      },
      {
        title: "Payment Date",
        dataIndex: "paymentdate",
        key: "date",
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
      api.delete(`Payment/${id}`).then(() => {
 setPaymentDeleteView(false);
 const newPayment= storePayment
   .filter((payment) => payment.id !== id)
   .map((payment) => payment);
 setStorePayment(newPayment);
 message.success("Payment deleted successfully");
 searchData()
      })
      } catch (err) {
        console.log(err)
      }
    };
  return (
     <div className="mx-10 mt-10">
      {paymentAddView && (
        <Modal
          title="Add Payment"
          footer={null}
          open={paymentAddView}
          onCancel={() => setPaymentAddView(false)}>
          <Payment
           storeSupplier={storePayment}
           setStorePayment={setStorePayment}
            setPaymentAddView={setPaymentAddView}
            searchData={searchData}
          />
        </Modal>
      )}
      {paymentEditView && (
        <Modal
          title="Edit Payment"
          footer={null}
          open={paymentEditView}
          onCancel={() => setPaymentEditView(false)}>
          <PaymentEdit
            storeSupplier={storePayment}
            setStorePayment={setStorePayment}
            paymentID={paymentID}
            setPaymentEditView={setPaymentEditView}
          />
        </Modal>
      )}
      {paymentDeleteView && (
        <Modal
          open={paymentDeleteView}
          title="Delete Payment"
          onCancel={() => {
           setPaymentDeleteView(false);
          }}
          footer={null}>
          <Result
            status="warning"
            title="Are you sure you want to delete this Payment?"
            extra={
              <div className="w-full  bordr bordr-red-900">
                <button
                  className="px-4 mr-8  py-2 border border-[#DC3545] 
            text-white bg-[#DC3545] rounded"
                  onClick={() => handleDelete(paymentDeleteID)}
                  type="primary">
                  Delete
                </button>
                <button
                  className="border px-4  py-2 rounded border-[#1D9BF0] bg-white text-[#1D9BF0]"
                  onClick={() => {
                   setPaymentDeleteView(false);
                  }}
                  type="primary">
                  Cancel
                </button>
              </div>
            }
          />
        </Modal>
      )}
      <Button onClick={() => setPaymentAddView(true)} className="mb-4">
        Add Payment
      </Button>
      <Table rowKey={(record)=>record.id} columns={columns} dataSource={storePayment} />
    </div>
  )
}

export default PaymentList
