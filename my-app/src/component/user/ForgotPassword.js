import React, {useState}  from 'react';
import { Button, Card, Checkbox, Form, Input, Select } from 'antd';
import { Option } from 'antd/es/mentions';
import "./Login.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const ForgotPassword = () => {
  const [email,setEmail]=React.useState('');
  const [password,setPassword]=React.useState('');
  const [loading,setLoading]=React.useState('');
  const text ='Registered Successfully'
  const onFinish = (values) => {
    const data={
      email,
      password
    }
    setLoading(true);
    axios.post('http://localhost:5000/user',data)
    .then(()=>{
      setLoading(false)
      alert(text)
      navigate('/auth/login')

    })
    .catch((error)=>{
      setLoading(false);
      alert('An Error Happened')
      console.log(error);
    })
  }; 
  const navigate=useNavigate()
  const handlepath=()=>{
    navigate("/auth/login")
  }
  return (
   <div className='bodys'>
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
        <Input className="input-box" value={email} onChange={(e) => setEmail(e.target.value)}/>
      </Form.Item>
</div>
<div className="">
<Form.Item
      label="Password"
      name="password"
    >
      <Input.Password className="input-box" value={password} onChange={(e) => setPassword(e.target.value)}/>
    </Form.Item>
</div>
    </div>
    <Form.Item
    className="">
      <Button type="primary" htmlType="submit" className='btn' >
        Submit
      </Button>
      </Form.Item>
      <div className='register-link' > 
        <p> Already Have an account?</p> 
        <a onClick={handlepath}>Login</a>
      </div>
  </Form>
    </div>
   </div>
  )
}


export default ForgotPassword
