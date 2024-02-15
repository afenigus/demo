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
import Customer from './Customer';
import CustomerEdit from './CustomerEdit';
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
const CustomerList = () => {
 const [customerAddView, setCustomerAddView]=useState(false)
  const [customerEditView, setCustomerEditView]=useState(false)
  const [customerDeleteView, setCustomerDeleteView]=useState(false)
const [customerID,setCustomerID]=useState()
const [customerDeleteID,setCustomerDeleteID]=useState()
  const [storeCustomer, setStoreCustomer]=useState([])
  const searchData=()=>{
    api.get("Customer").then((response) => {
      // console.log(response.data.data)
      setStoreCustomer(response.data.data);
    });
  }
  useEffect(() =>{
searchData()
  },[])
   const onClick = ({ key }, record) => {
     if (key == "edit") {
      console.log(key)
       setCustomerID(record.id);
       console.log(record.id);
      setCustomerEditView(true);
     } else if (key === "delete") {
       console.log(key);

        console.log("inside delete key");
        setCustomerDeleteView(true)
        setCustomerDeleteID(record.id);

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
        title: "Customer Name",
        dataIndex: "firstName",
        key: "Customer_name",
      },
      {
        title: "Last Name",
        dataIndex: "lastName",
        key: "last_name",
      },
      {
        title: "Phone Number",
        dataIndex: "phoneNumber",
        key: "phone_no",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "Email",
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
      api.delete(`Customer/${id}`).then(() => {
 setCustomerDeleteView(false);
 const newCustomer = storeCustomer
   .filter((customer) => customer.id !== id)
   .map((customer) => customer);
 setStoreCustomer(newCustomer);
 message.success("Customer deleted successfully");
 searchData()
      })
      } catch (err) {
        console.log(err)
      }
    };
  return (
     <div className="mx-10 mt-10">
      {customerAddView && (
        <Modal
          title="Add Customer"
          footer={null}
          open={customerAddView}
          onCancel={() => setCustomerAddView(false)}>
          <Customer 
           storeCustomer={storeCustomer}
           setStoreCustomer={setStoreCustomer}
            setCustomerAddView={setCustomerAddView}
            searchData={searchData}
          />
        </Modal>
      )}
      {customerEditView && (
        <Modal
          title="Edit Customer"
          footer={null}
          open={customerEditView}
          onCancel={() => setCustomerEditView(false)}>
          <CustomerEdit
            storeCustomer={storeCustomer}
            setStoreCustomer={setStoreCustomer}
            customerID={customerID}
            setCustomerEditView={setCustomerEditView}
          />
        </Modal>
      )}
      {customerDeleteView && (
        <Modal
          open={customerDeleteView}
          title="Delete Customer"
          onCancel={() => {
           setCustomerDeleteView(false);
          }}
          footer={null}>
          <Result
            status="warning"
            title="Are you sure you want to delete this customer?"
            extra={
              <div className="w-full  bordr bordr-red-900">
                <button
                  className="px-4 mr-8  py-2 border border-[#DC3545] 
            text-white bg-[#DC3545] rounded"
                  onClick={() => handleDelete(customerDeleteID)}
                  type="primary">
                  Delete
                </button>
                <button
                  className="border px-4  py-2 rounded border-[#1D9BF0] bg-white text-[#1D9BF0]"
                  onClick={() => {
                   setCustomerDeleteView(false);
                  }}
                  type="primary">
                  Cancel
                </button>
              </div>
            }
          />
        </Modal>
      )}
      <Button onClick={() => setCustomerAddView(true)} className="mb-4">
        Add Customer
      </Button>
      <Table rowKey={(record)=>record.id} columns={columns} dataSource={storeCustomer} />
    </div>
  )
}

export default CustomerList
