import { Tabs } from "antd";
import React from "react";
import RecipeBooks from "./RecipeBooks";
import UserDetails from "./UserDetails";

const UserProfile = () => {
  const items = [
    {
      key: "1",
      label: "Details",
      children: <UserDetails />,
    },
    {
      key: "2",
      label: "Recipe Book",
      children: <RecipeBooks />,
    },
  ];
  return (
    <>
      <Tabs defaultActiveKey="1" items={items} />
    </>
  );
};

export default UserProfile;
