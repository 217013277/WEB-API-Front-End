import React from 'react';
import { useNavigate } from 'react-router-dom'
import { Button } from "antd"
import { RollbackOutlined } from '@ant-design/icons'

const BackBtn = (event) => {
  const navigate = useNavigate()
  const back = () => {
    console.log(`Start navigate to ${event.path? event.path : '/'}`)
    navigate(event.path? event.path : '/')
  }
  return <Button icon={<RollbackOutlined />} onClick={back} >Back</Button>
}

export default BackBtn