import { useState } from "react";
import { Layout, Menu, Avatar, Dropdown, Button, theme } from "antd";
import {
  UserOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  DollarOutlined,
  CreditCardOutlined,
  FileDoneOutlined,
  ContactsOutlined,
  ShopOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import ItemList from "../../views/item/ItemList";
import SupplierList from "../../views/supplier/SupplierList";
import CustomerList from "../../views/customer/CustomerList";
import PurchaseList from "../../views/purchase/PurchaseList";

const { Header, Sider, Content } = Layout;

const SideBar = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(location.pathname); // Initial selected key
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuItems = [
    {
      key: "items",
      label: "Items",
      icon: <ShoppingCartOutlined />,
      path: "/",
      content: <ItemList />,
    },
    {
      key: "supplier",
      label: "Supplier",
      icon: <UserOutlined />,
      path: "/supplier",
      content: <SupplierList />,
    },
    {
      key: "sales",
      label: "Sales",
      icon: <ShoppingCartOutlined />,
      path: "/sales",
      content: "<Sales />",
    },
    {
      key: "customer",
      label: "Customer",
      icon: <TeamOutlined />,
      path: "/customer",
      content: <CustomerList />,
    },
    {
      key: "purchase",
      label: "Purchase",
      icon: <TeamOutlined />,
      path: "/purchase",
      content: <PurchaseList />,
    },
    {
      key: "payment",
      label: "Payment",
      icon: <FileDoneOutlined />,
      path: "/payment",
      content: "<Payment />",
    },
    {
      key: "contact",
      label: "Contact",
      icon: <ContactsOutlined />,
      path: "/contact",
      content: "Tab content for Contact",
      disabled: true,
    },
  ];

  const handleMenuClick = (item) => {
    console.log(item);
    setSelectedKey(item.key);
    navigate(item.key);
  };
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const itemsMenu = [
    getItem("Items", "/items", <ShoppingCartOutlined />),
    getItem("Supplier", "/supplier", <UserOutlined />),
    getItem("Purchase", "/purchase", <ShopOutlined />),
    getItem("Customer", "/customer", <TeamOutlined />),
    getItem("Sales", "/sales", <ShoppingCartOutlined />, [
      getItem("Cash sales", "/sales/cash", <DollarOutlined />),
      getItem("Credit sales", "/sales/credit", <CreditCardOutlined />),
    ]),
    getItem("Payment", "/payment", <FileDoneOutlined />),
    getItem("Contact", "/contact", <ContactsOutlined />),
  ];
  const items = [
    {
      key: "1",
      label: <Link to="/profile">Profile</Link>,
    },
    {
      key: "2",
      label: <button onClick="">Logout</button>,
      icon: <LogoutOutlined className="text-red-900" />,
    },
  ];
  // const onClick = (e) => {
  //   console.log(e.key, "value");
  // };
  return (
    // <Router>
    <Layout className=" bg-green-500" style={{ minHeight: "100vh" }}>
      <Sider
        width={200}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          top: 0,
          left: 0,
          zIndex: 100,
        }}
        onCollapse={() => setCollapsed(!collapsed)}
        trigger={null}
        collapsible
        collapsed={collapsed}>
        <div>
          <div className="bg-[#001529]  text-white p-4  brder-2 rounded-full flex-col flex items-center justify-center w-full">
            <NavLink
              className="borer-2 flex flex-col items-center justify-between"
              to={"/dashboard"}>
              {/* <BookOpenIcon width={40} height={40} /> */}
              <h1 className="text-2xl">Stock</h1>
            </NavLink>
          </div>
          <Menu
            theme={"dark"}
            style={{ backgroundColor: "#001529" }}
            mode="inline"
            defaultSelectedKeys={["items"]}
            items={itemsMenu}
            selectedKeys={[selectedKey]}
            onClick={handleMenuClick}
          />
        </div>
      </Sider>
      <Layout>
        <Header
          style={{
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #ffffff",
            position: "sticky",
            top: 0,
            zIndex: 100,
          }}
          className="site-layout-background p-0 m-0">
          <div className="flex items-center justify-between">
            <Button
              type="text"
              // icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <div className="flex flex-row justify-evenly">
              <Dropdown
                menu={{
                  items,
                }}
                trigger="hover"
                placement="bottomLeft"
                arrow>
                <Avatar src="" alt="profileimg" />
              </Dropdown>{" "}
              <h1 className="text-lg pl-2 pr-4">Admin</h1>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 500,
            background: colorBgContainer,
            overflowY: "auto", // enable vertical scrolling
          }}>
          <div className="flex items-center justify-center">
            <div
              className={`flex-grow border-solid ${
                props.sidebar && "flex flex-1 justify-center"
              } border-r-[1px] border-[#d2d2d2] `}>
              {props.children}
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SideBar;
