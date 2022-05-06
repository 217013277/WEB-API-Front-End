import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, DatePicker } from 'antd';

import useAuth from '../../hooks/useAuth'
import http, { authHeader } from '../../common/http-common.js'
import LoadingIcon from '../utils/LoadingIcon.jsx'

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
}

const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 12, offset: 6 } }
}

const DogAddForm = () => {
  const navigate = useNavigate()
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false)
  const [promtMsg, setpromtMsg] = useState('')
  
  const onFinish = (values) => {
    setLoading(true)
    const {confirm, ...data} = values
    console.log(data)
    authHeader(auth.username, auth.password)
    http.post('/dogs', data)
    .then ((response) => {
      setpromtMsg('You are successfully to add a new dog. We will redirect you to it');
      setTimeout(() => {
        navigate(`/dogs/${response.data.id}`)
      }, 2500);
    })
    .catch ((error) => {
      setLoading(false)
      setpromtMsg('Something is wrong, please try again')
      if(error.response) {
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.header)
      }
    })
  }
  
  const nameRules = [
    { required: true, message:'Please input a name' }
  ]
  
  const dateRules = [
    {type: 'date', message:'input invalid'},
  ]

  const breedRules = [
    {required: true, message: 'Please input a breed'}
  ]
  
  return(
    <>
      <Form {...formItemLayout} name="register" onFinish={onFinish} >
        <Form.Item name="name" label="Name" rules={nameRules} hasFeedback autoComplete="off">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description" >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item name="breed" label="Breed" hasFeedback rules={breedRules} hasFeedback>
          <Input />
        </Form.Item>
        <Form.Item name="birthday" label="Birthday" rules={dateRules} hasFeedback>
          <DatePicker />
        </Form.Item>
        <Form.Item {...tailFormItemLayout} >
          {loading ?
            <LoadingIcon /> :
            <Button type="primary" htmlType="submit">
            Add a new dog
            </Button>
          }
          { promtMsg ? <p>{promtMsg}</p> : <></> }
        </Form.Item>
      </Form>
    </>
  )
}

export default DogAddForm
