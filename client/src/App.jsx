import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import ItemList from "./views/item/ItemList.jsx";
import SideBar from "./components/layouts/SideBar.jsx";
import SupplierList from "./views/supplier/SupplierList.jsx";
import CustomerList from "./views/customer/CustomerList.jsx";
import PurchaseList from "./views/purchase/PurchaseList.jsx";
import CashList from "./views/cash/CashList.jsx";
import CreditList from "./views/credit/CreditList.jsx";
import PaymentList from "./views/payment/PaymentList.jsx";
import Contact from "./views/contact/Contact.jsx";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/items" />} />

      <Route
        path="/items"
        element={
          <SideBar>
            <ItemList />
          </SideBar>
        }
      />
      <Route
        path="/supplier"
        element={
          <SideBar>
            <SupplierList />
          </SideBar>
        }
      />
      <Route
        path="/customer"
        element={
          <SideBar>
            <CustomerList />
          </SideBar>
        }
      />
      <Route
        path="/purchase"
        element={
          <SideBar>
            <PurchaseList />
          </SideBar>
        }
      />
      <Route
        path="/sales/cash"
        element={
          <SideBar>
            <CashList />
          </SideBar>
        }
      />
      <Route
        path="/sales/credit"
        element={
          <SideBar>
            <CreditList />
          </SideBar>
        }
      />
      <Route
        path="/payment"
        element={
          <SideBar>
            <PaymentList />
          </SideBar>
        }
      />
      <Route
        path="/contact"
        element={
          <SideBar>
            <Contact />
          </SideBar>
        }
      />
    </Routes>
  );
}

export default App;
