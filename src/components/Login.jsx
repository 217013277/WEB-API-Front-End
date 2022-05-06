import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { Form, Input, Button } from "antd"

import useAuth from '../hooks/useAuth'
import http, { authHeader } from '../common/http-common.js'
import LoadingIcon from './utils/LoadingIcon.jsx'
import BackBtn from './utils/BackBtn.jsx'

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
}

const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 12, offset: 6 } }
}

const Login = () => {
  const { auth, setAuth } = useAuth()
  const navigate = useNavigate()
  const [submitting, setSubmitting ] = useState(false)
  const [loginMessage, setLoginMessage] = useState(null)

  const onFinish = (values) => {
    setSubmitting(true)
    
    const username = values.username
    const password = values.password
    
    console.log(`${username}:${password}`)
    
    authHeader(username, password)
    
    http.post('/users/login')
    .then ( (response) => {
      console.log(`login successfully: ${response.data.username}`)
      console.log(JSON.stringify(response?.data))
      const id = response?.data?.id;
      const username = response?.data?.username;
      const password = response?.data?.password;
      const role = response?.data?.role;
      setAuth(response.data);
      setSubmitting(false);
      console.log(JSON.stringify(auth.role));
      setLoginMessage('Login successfully. We will redirect you to homepage');
      setTimeout(() => {
        navigate(-1, {replace: true});
      }, 2500);
    })
    .catch ((error) => {
      setLoading(false)
      if (error.response) {
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.header)
        if (error.response.status == 401) {
          setLoginMessage('Username or password is incorrect')
        } else {
          setLoginMessage('Something is wrong')
        }
      }
    })
  }

  const usernameRules = [
    {required: true, message: 'Please input your username', whitespace: true}
  ]

  const passwordRules = [
    {required: true, message: 'Please input your password'}
  ]
  
	return (
		<div>
			<h1>Login</h1>
      <Form {...formItemLayout} name="register" onFinish={onFinish}>
        <Form.Item name="username" label="Username"  autoComplete="username" rules={usernameRules}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password" autoComplete="new-password" hasFeedback rules={passwordRules}>
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailFormItemLayout} >
          { auth.username || submitting ? <></> :
            <Button type="primary" htmlType="submit">
            Login
          </Button>
          }
        </Form.Item>
        { submitting ? <LoadingIcon /> : <p>{ loginMessage }</p> }
      </Form>
      <BackBtn />
    </div>
	);
}

export default Login
