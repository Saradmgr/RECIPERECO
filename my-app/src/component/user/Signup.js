import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetState } from "../../redux/slices/Userslice";
import { registerUser } from "../../services/Allproduct";

const Signup = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const carddata = useSelector((state) => state);
  const { loading, success, error } = useSelector(
    (state) => state.registerUser
  );
  const onFinish = () => {
    if (!loading) {
      dispatch(registerUser({ name, email, phone, password }));
    }
    if (success) {
      alert("Registered Successfully");
      navigate("/auth/login");
      dispatch(resetState()); // Reset state after navigation
    } else if (error) {
      alert("An Error Happened: " + error);
      dispatch(resetState()); // Reset state after showing error
    }
  };
  console.log("adadasdsd", error);
  return (
    <div className="body">
      <div className="wrapper">
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item label="Name" name="name">
            <Input
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              { type: "email", message: "The input is not valid E-mail!" },
              { required: true, message: "Please input your E-mail!" },
            ]}
          >
            <Input
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item name="phone" label="Phone Number">
            <Input
              className="input-box"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password
              className="input-box"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
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
          <div className="register-link">
            <p>Already Have an account?</p>
            <a onClick={() => navigate("/auth/login")}>Login</a>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
