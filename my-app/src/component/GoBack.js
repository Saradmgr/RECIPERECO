import { LeftCircleOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Goback = () => {
    const navigate=useNavigate()
    const handleClick=()=>{
        navigate(-1);
    }
  return (
<div>
<Button onClick={handleClick}>Go back</Button>
</div>
  )
}

export default Goback
