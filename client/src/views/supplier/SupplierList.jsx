import { Button, Dropdown, Modal, Result, Table, message } from 'antd';
import { useEffect, useState } from 'react'
import {
  DownOutlined,
  EditOutlined,
  PrinterOutlined,
  DeleteOutlined,

} from "@ant-design/icons";
// import ItemEdit from './ItemEdit';
import api from '../../utils/api';
import Supplier from './Supplier';
import SupplierEdit from './SupplierEdit';
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
const SupplierList = () => {
 const [supplierAddView, setSupplierAddView]=useState(false)
  const [supplierEditView, setSupplierEditView]=useState(false)
  const [supplierDeleteView, setSupplierDeleteView]=useState(false)
const [supplierID,setSupplierID]=useState()
const [supplierDeleteID,setSupplierDeleteID]=useState()
  const [storeSupplier, setStoreSupplier]=useState([])
  const searchData=()=>{
    api.get("supplier").then((response) => {
      // console.log(response.data.data)
      setStoreSupplier(response.data.data);
    });
  }
  useEffect(() =>{
searchData()
  }, [])
  
   const onClick = ({ key }, record) => {
     if (key == "edit") {
      console.log(key)
       setSupplierID(record.id);
       console.log(record.id);
      setSupplierEditView(true);
     } else if (key === "delete") {
       console.log(key);

        console.log("inside delete key");
        setSupplierDeleteView(true)
        setSupplierDeleteID(record.id);

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
        title: "Supplier Name",
        dataIndex: "firstName",
        key: "supplier_name",
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
        key: "email",
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
      api.delete(`supplier/${id}`).then(() => {
 setSupplierDeleteView(false);
 const newSupplier = storeSupplier
   .filter((supplier) => supplier.id !== id)
   .map((supplier) => supplier);
setStoreSupplier(newSupplier);
 message.success("Supplier deleted successfully");
 searchData()
      })
      } catch (err) {
        console.log(err)
      }
    };
  return (
    <div className="mx-10 mt-10">
      {supplierAddView && (
        <Modal
          title="Add Supplier"
          footer={null}
          open={supplierAddView}
          onCancel={() => setSupplierAddView(false)}>
          <Supplier
           storeSupplier={storeSupplier}
          setStoreSupplier={setStoreSupplier}
            setSupplierAddView={setSupplierAddView}
            searchData={searchData}
          />
        </Modal>
      )}


      {supplierEditView && (
        <Modal
          title="Add Supplier"
          footer={null}
          open={supplierEditView}
          onCancel={() => setSupplierEditView(false)}>
          <SupplierEdit
            storeSupplier={storeSupplier}
            setStoreSupplier={setStoreSupplier}
            supplierID={supplierID}
            setSupplierEditView={setSupplierEditView}
          />
        </Modal>
      )}
      {supplierDeleteView && (
        <Modal
          open={supplierDeleteView}
          title="Delete supplier"
          onCancel={() => {
           setSupplierDeleteView(false);
          }}
          footer={null}>
          <Result
            status="warning"
            title="Are you sure you want to delete this supplier?"
            extra={
              <div className="w-full  bordr bordr-red-900">
                <button
                  className="px-4 mr-8  py-2 border border-[#DC3545] 
            text-white bg-[#DC3545] rounded"
                  onClick={() => handleDelete(supplierDeleteID)}
                  type="primary">
                  Delete
                </button>
                <button
                  className="border px-4  py-2 rounded border-[#1D9BF0] bg-white text-[#1D9BF0]"
                  onClick={() => {
                   setSupplierDeleteView(false);
                  }}
                  type="primary">
                  Cancel
                </button>
              </div>
            }
          />
        </Modal>
      )}
      <Button onClick={() => setSupplierAddView(true)} className="mb-4">
        Add Supplier
      </Button>
      <Table rowKey={(record)=>record.id} columns={columns} dataSource={storeSupplier} />
    </div>
  )
}


export default SupplierList
