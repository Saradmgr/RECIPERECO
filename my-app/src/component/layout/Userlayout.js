import { BookOutlined, LoginOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Dropdown, Layout, Menu, Modal, Space } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/LoginSlices";
import RecipeBook from "../user/RecipeBook";
const { Header, Content, Footer } = Layout;
const Userlayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const carddata = useSelector((state) => state);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const items = [
    {
      key: "1",
      label: <div onClick={() => handleClick("/profile")}> Profile</div>,
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: <div onClick={() => setIsLogoutModalOpen(true)}>Logout</div>,
      icon: <LoginOutlined />,
    },
  ];
  const handleClick = (e) => {
    navigate(`${e}`);
  };
  const handleLogout = () => {
    dispatch(logout());
    setIsLogoutModalOpen(false);
    navigate("/");
    console.log("Logout successful!"); // Redirect to login after logout
  };

  const [open, setOpen] = React.useState(false);
  const closeModal = () => {
    setOpen(false); // Close the modal
  };
  const iteminfo = [
    {
      name: "About Us",
      link: "/aboutus",
    },
  ];
  const authinfo = [
    {
      name: "Login",
      link: "auth/login",
    },
    {
      name: "Sign up",
      link: "auth/signup",
    },
  ];
  const handleitem = (item) => {
    navigate(item.link);
  };
  const handlefront = () => {
    navigate("/");
  };
  console.log("recipe", carddata);
  return (
    <Layout className="full-layout">
      <Header className="headers">
        <div className="demo-logo" />
        <Menu
          mode="horizontal"
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
        <div className="header">
          <div className="image">
            <img
              src="https://seeklogo.com/images/R/recipe-logo-EC4BDCE687-seeklogo.com.png"
              onClick={() => handlefront()}
            />
          </div>
          <div></div>
          <div className="iteminfo">
            {iteminfo?.map((item) => (
              <div key={item.link} onClick={() => handleitem(item)}>
                <div>{item.name}</div>
              </div>
            ))}
          </div>
          <div className="iteminfo">
            <div>
              {carddata?.authSlice?.userInfo?._id && (
                <Dropdown
                  menu={{
                    items,
                  }}
                  trigger={["click"]}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <UserOutlined />
                    </Space>
                  </a>
                </Dropdown>
              )}
            </div>
            <div>
              {carddata?.authSlice?.userInfo?._id && (
                <Badge
                  count={carddata?.fetchsaved?.data.length}
                  size="small"
                  onClick={() => setOpen(true)}
                >
                  <Avatar icon={<BookOutlined />} size="small" />
                </Badge>
              )}
            </div>
            <div className="iteminfo">
              {!carddata?.authSlice?.userInfo?._id &&
                authinfo?.map((item) => (
                  <div key={item.link} onClick={() => handleitem(item)}>
                    <div>{item.name}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Header>
      <Content
        style={{
          padding: "0 48px",
        }}
      >
        <div className="navbar">
          <Outlet />
        </div>
      </Content>
      <Footer className="footer">
        Recipe App ©{new Date().getFullYear()} Created by Sarad Kunwor
      </Footer>
      {open && (
        <Modal
          title="My Recipe book"
          centered
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          width={1000}
          footer={null} // Set footer to null to hide the buttons
        >
          <RecipeBook closeModal={closeModal} />
        </Modal>
      )}
      <Modal
        title="Confirm Logout"
        centered
        open={isLogoutModalOpen}
        onOk={handleLogout} // Logout action
        onCancel={() => setIsLogoutModalOpen(false)} // Close modal
        okText="Logout"
        cancelText="Cancel"
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
    </Layout>
  );
};
export default Userlayout;
