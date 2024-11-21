import React from "react";
import { Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { items } from "../utils";
const { Content } = Layout;
const AdminLayout = () => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    console.log("key", e);
    navigate(`${e.key}`);
  };

  return (
    <Layout>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        items={items}
        onClick={handleClick}
        style={{
          flex: 1,
          minWidth: 0,
        }}
      />
      <Content
        style={{
          padding: "0 48px",
        }}
      >
        <div>
          <div>
            <Outlet />
          </div>
        </div>
      </Content>
    </Layout>
  );
};
export default AdminLayout;
