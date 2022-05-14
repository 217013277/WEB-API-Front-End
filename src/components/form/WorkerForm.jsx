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
  const [promtMsg, setpromtMsg] = useState('');
  const [status, setStatus] = useState('')
  
  const onFinish = (values) => {
    setStatus('isSubmitting')
    const {confirm, ...data} = values
    console.log(data)
    http.post('/workers', data)
    .then ((response) => {
      console.log(response.data)
      setStatus('isSucced')
      setpromtMsg('Submitted successfully. We will redirect you now');
      setTimeout(() => {
					navigate('/login', { replace: true });
				}, 2500);
    })
    .catch ((error) => {
      if(error.response) {
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.header)
      }
      setStatus('isFailed');
      setpromtMsg('Something is wrong, please try again');
    })
  }

  const workeridRules = [
    { pattern: new RegExp(/^[0-9]+$/), message:'Not invalid worker ID' },
    { required: true, message:'Please input your worker ID' }
  ]
  
  const fnameRules = [{ required: true, message:'Please input your first name' }]

  const lnameRules = [{ required: true, message:'Please input your last name' }]
  
  const emailRules = [
    {type: 'email', message:'input invalid'},
    {required: true, message:'Please input an email'}
  ]

  const passwordRules = [{required: true, message: 'Please input your password'}]

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
        <Form.Item name="workerid" label="Worker ID" autoComplete="off" rules={workeridRules}>
          <InputNumber />
        </Form.Item>
        <Form.Item name="firstname" label="First Name" autoComplete="given-name" rules={fnameRules} hasFeedback>
          <Input />
        </Form.Item>
        <Form.Item name="lastname" label="Last Name" autoComplete="family-name" rules={lnameRules} hasFeedback>
          <Input />
        </Form.Item>
        <Form.Item name="username" label="Username"  autoComplete="username" rules={usernameRules} hasFeedback>
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
          {status == 'isSubmitting' || status == 'isSucced' ?
            <LoadingIcon /> :
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          }
          {promtMsg && <p>{promtMsg}</p> }
        </Form.Item>
      </Form>
    </>
  )
}

export default RegistrationForm