import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Modal,
  Row,
  Spin,
  Tag,
} from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Settings from "./Settings"; // Import your Settings component where the password change form is located

const UserDetails = () => {
  const { userInfo } = useSelector((state) => state.authSlice);

  const [isModalVisible, setIsModalVisible] = useState(false); // State for managing modal visibility

  // If userInfo is null, return nothing or a loading spinner/message
  if (!userInfo) {
    return (
      <div className="flex justify-center items-center p-6">
        <Spin size="large" />
      </div>
    );
  }

  const { name, email, phone, createdAt, updatedAt } = userInfo;

  // Handle modal visibility
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="p-6">
      <Row justify="center">
        <Col xs={24} sm={16} md={12} lg={8}>
          <Card
            hoverable
            style={{
              width: "100%",
              borderRadius: "12px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              padding: "24px",
            }}
          >
            {/* Avatar */}
            <div className="flex justify-center">
              <Avatar
                size={100}
                src="https://t4.ftcdn.net/jpg/01/97/15/87/360_F_197158744_1NBB1dEAHV2j9xETSUClYqZo7SEadToU.jpg" // Placeholder for avatar
                alt={name}
                style={{ marginBottom: "16px" }}
              />
            </div>

            {/* User Info */}
            <div style={{ textAlign: "center" }}>
              <h2>{name}</h2>
              <Tag color="blue">{email}</Tag>
              <p>{phone}</p>
              <Divider />

              <div>
                <strong>Account Created:</strong>{" "}
                {new Date(createdAt).toLocaleDateString()}
              </div>
              <div>
                <strong>Last Updated:</strong>{" "}
                {new Date(updatedAt).toLocaleDateString()}
              </div>

              {/* Reset Password Button */}
              <Button
                type="primary"
                style={{ marginTop: "16px" }}
                onClick={showModal}
              >
                Reset Password
              </Button>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Modal for resetting password */}
      <Modal
        title="Reset Password"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} // We will handle the footer in the Settings component
        destroyOnClose={true}
      >
        <Settings /> {/* Pass userId to the Settings component */}
      </Modal>
    </div>
  );
};

export default UserDetails;
