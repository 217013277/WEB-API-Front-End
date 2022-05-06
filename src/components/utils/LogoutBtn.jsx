import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, } from "antd"

import useAuth from '../../hooks/useAuth'

const LogoutBtn = () => {
  const { setAuth } = useAuth()
  const navigate = useNavigate()

  const logout = () => {
    console.log('Start logout');
    setAuth({});
    navigate('/')
  }

  return(
      <Button type="link" onClick={()=> logout()}>Logout</Button>

  )
  
}

export default LogoutBtn