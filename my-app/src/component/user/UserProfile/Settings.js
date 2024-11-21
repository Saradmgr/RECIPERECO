import React, { useState } from 'react';
import { Button,  Form, Input, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
const Settings = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  }; 
  const navigate=useNavigate()
  const handlepath=()=>{
    navigate("/auth/login")
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className='wrapper'>
      <Form onFinish={onFinish} layout='vertical'>
    <div className="">
<div className="">
<Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input className="input-box"/>
      </Form.Item>
</div>
<div className="">
<Form.Item
        name="phone"
        label="Phone Number"
      >
        <Input className="input-box"/>
      </Form.Item>
</div>
<div className="">
<Form.Item
      label="Enter Old Password"
      name="password"
    >
      <Input.Password className="input-box"/>
    </Form.Item>
</div>
<div className="">
<Form.Item
      label="Enter New Password"
      name="password"
    >
      <Input.Password className="input-box"/>
    </Form.Item>
</div>
    </div>
    <Form.Item
    className="">
      <Button type="primary" htmlType="submit" className='btn' >
        Submit
      </Button>
      </Form.Item>
    <a onClick={showModal} className='remember-forgot'>Forget Password?</a>

  </Form>
  {
      isModalOpen &&(
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      </Modal>
      )
    }
    </div>
  )
}

export default Settings
