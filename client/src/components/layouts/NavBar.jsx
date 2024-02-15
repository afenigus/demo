import  { useState } from "react";
import { Tabs } from "antd";
// import Supplier from "./Supplier";
// import Item from "./Item";
// import Purchase from "./Purchase";
// import Customer from "./Customer";
// import Contact from "./Contact";
// import Contact1 from "./Contact1";
// import Cash from "./Cash";
// import Credit from "./Credit";
// import Payment from "./Payments";
import ItemList from "../../views/item/ItemList";
import SupplierList from "../../views/supplier/SupplierList";
import CustomerList from "../../views/customer/CustomerList";
import PurchaseList from "../../views/purchase/PurchaseList";
import CashList from "../../views/cash/CashList";
import CreditList from "../../views/credit/CreditList";
import PaymentList from "../../views/payment/PaymentList";
import Contact from './views/contact/Contact.jsx'
const Navigator = () => {
    const [activeKey, setActiveKey]=useState("supplier")
  const stockTabs = [
    { key: "supplier", label: "Supplier", children: <SupplierList /> },
    { key: "items", label: "Items", children: <ItemList /> },
    { key: "purchase", label: "Purchase", children: <PurchaseList /> },
    { key: "customer", label: "Customer", children: <CustomerList />},
    { key: "cashSales", label: "Cash", children: <CashList />},
    { key: "creditSales", label: "Credit", children: <CreditList /> },
    { key: "payment", label: "Payment", children: <PaymentList /> },
    {
      key: "contact", label: "Contact", children: <Contact />
    // disabled: true
    },
  ];

  const handleTabChange= (activeKey) => {
    // Handle tab change logic here
    setActiveKey(activeKey)
  };

//   const activeKeyC = "customer"; // Set the default active key

  return (
    <div className=" overflow-clip">
    <Tabs
      className="w-full mx-10"
      items={stockTabs}
      activeKey={activeKey}
      onChange={handleTabChange}>

      </Tabs></div>
  )
}

export default Navigator;
