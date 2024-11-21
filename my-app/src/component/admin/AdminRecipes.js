import { AndroidOutlined, AppleOutlined } from "@ant-design/icons";
import { Button, Tabs } from "antd";
import React from "react";
import { recipeaction } from "../utils";

const AdminRecipes = () => {
  return (
    <div>
      <Tabs defaultActiveKey="1" items={recipeaction} />
    </div>
  );
};

export default AdminRecipes;
