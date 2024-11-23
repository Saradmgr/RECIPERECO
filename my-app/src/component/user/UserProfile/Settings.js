import { Button, Form, Input, message } from "antd";
import axios from "axios"; // Assuming you are using axios to send requests
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const carddata = useSelector((state) => state);
  console.log("cardddddarad", carddata?.authSlice?.userInfo?._id);
  const userId = carddata?.authSlice?.userInfo?._id;
  const onFinish = async (values) => {
    const { oldPassword, password } = values;
    try {
      setLoading(true);
      // Send request to update user password
      const response = await axios.put(
        `http://localhost:5000/user/${userId}/update-password-and-info`,
        {
          oldPassword,
          password,
        }
      );
      message.success("Password updated successfully");
      navigate("/profile"); // Navigate to profile or another page as needed
    } catch (error) {
      message.error(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <Form onFinish={onFinish} layout="vertical">
        <div>
          <Form.Item
            name="oldPassword"
            label="Enter Old Password"
            rules={[
              { required: true, message: "Please enter your old password!" },
            ]}
          >
            <Input.Password className="input-box" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Enter New Password"
            rules={[
              { required: true, message: "Please enter your new password!" },
            ]}
          >
            <Input.Password className="input-box" />
          </Form.Item>
        </div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="btn"
            loading={loading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Settings;
