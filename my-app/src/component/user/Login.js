import { Button, Form, Input, message } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchsavedRecipe } from "../../services/Allproduct";
import { userLogin } from "../../services/Loginaction";
import "./Loginonly.css";
// Ensure correct path

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalEmail, setModalEmail] = useState("");

  // Use Redux state for loading if desired
  const authLoading = useSelector((state) => state?.authSlice?.loading);
  const carddata = useSelector((state) => state);
  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Dispatch the userLogin action
      const result = await dispatch(userLogin(values)).unwrap();
      console.log("result", result?.user?._id);
      if (result?.user?._id) {
        // Ensure userId is available
        const userId = result?.user?._id;
        dispatch(fetchsavedRecipe(userId)); // Fetch saved recipes after login
        navigate("/"); // Redirect to the home/dashboard page
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    try {
      // Add API call logic here
      message.success("Password reset email sent!");
      setIsModalOpen(false);
    } catch (error) {
      message.error("Failed to send password reset email. Please try again.");
      console.error("Password reset error:", error);
    }
  };

  return (
    <div className="body">
      <div className="wrapper">
        <Form onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="btn"
              lloading={loading || authLoading}
              block
            >
              Login
            </Button>
          </Form.Item>
          <div className="register-link">
            <p>
              Don't have an account?{" "}
              <a onClick={() => navigate("/auth/signup")}>Register</a>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
