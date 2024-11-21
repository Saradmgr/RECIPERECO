import React from "react";
import { Button, Form, Input } from "antd";
import "./Loginonly.css";
import TextArea from "antd/es/input/TextArea";
const Contactus = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  return (
    <div className="content-center">
      <h1 className="font-bold">Contact us through your email and queries</h1>
      <Form onFinish={onFinish} layout="vertical">
        <div className="">
          <div>
            <Form.Item label="Name" name="firstname">
              <Input className="input-boxs" />
            </Form.Item>
          </div>
          <div className="">
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input className="input-boxs" />
            </Form.Item>
          </div>
          <div>
            <TextArea
              rows={4}
              placeholder="Please Enter your queries"
              maxLength={6}
              className="input-boxs"
            />
          </div>
          <div className=""></div>
        </div>
        <Form.Item className="">
          <Button type="primary" htmlType="submit" className="btn">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Contactus;
