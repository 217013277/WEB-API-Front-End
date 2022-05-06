import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, InputNumber } from 'antd'


import http from '../../common/http-common.js'
import LoadingIcon from '../utils/LoadingIcon.jsx'

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
}

const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 12, offset: 6 } }
}

const RegistrationForm = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  
  const onFinish = (values) => {
    setLoading(true)
    const {confirm, ...data} = values
    console.log(data)
    http.post('/workers', data)
    .then ((response) => {
      console.log(response.data)
      setLoading(false)
      navigate('/login')
    })
    .catch ((error) => {
      if(error.response) {
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.header)
      }
    })
  }

  const roleRules = [
    { required: true, message:'Please choose your role' }
  ]

  const workeridRules = [
    {required: true, message:'Please input your worker ID'}
  ]
  
  const fnameRules = [
    { required: true, message:'Please input your first name' }
  ]

      const lnameRules = [
    { required: true, message:'Please input your last name' }
  ]
  
  
  const emailRules = [
    {type: 'email', message:'input invalid'},
    {required: true, message:'Please input an email'}
  ]

  const passwordRules = [
    {required: true, message: 'Please input your password'}
  ]

  const confirmRules = [
    {required: true, message: 'Please confirm your password'},
    ({ getFieldValue }) => ({
      validator(rule, value) {
        if (!value || getFieldValue('password') === value) {
          return Promise.resolve()
        }
        return Promise.reject('The confirm password is not match with the password!')
      }
    })
  ]

  const usernameRules = [
    {required: true, message: 'Please input your username', whitespace: true}
  ]
  
  return(
    <>
      <Form {...formItemLayout} name="register" onFinish={onFinish}>
        
        <Form.Item name="firstname" label="First Name" autoComplete="given-name" rules={fnameRules}>
          <Input />
        </Form.Item>
        <Form.Item name="lastname" label="Last Name" autoComplete="family-name" rules={lnameRules}>
          <Input />
        </Form.Item>
        <Form.Item name="username" label="Username"  autoComplete="username" rules={usernameRules}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="E-mail" autoComplete="email" rules={emailRules} hasFeedback>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password" autoComplete="new-password" hasFeedback rules={passwordRules}>
          <Input.Password />
        </Form.Item>
        <Form.Item name="confirm" label="Confirm Password"  autoComplete="new-password" hasFeedback rules={confirmRules}>
         <Input.Password />
        </Form.Item>
        <Form.Item {...tailFormItemLayout} >
          {loading ?
            <LoadingIcon /> :
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          }
        </Form.Item>
      </Form>
      <div>
      {loading ? (<LoadingIcon />):<></>}
      </div>
    </>
  )
}

export default RegistrationForm