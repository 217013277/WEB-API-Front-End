import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, DatePicker } from 'antd';

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

const DogAdd = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [ loading, setLoading ] = useState(true);
  const [ dogData, setDogData ] = useState(null);
  const [ promtMsg, setpromtMsg ] = useState('');
  const [ submitting, setSubmiting ] = useState(false);
  
  const onFinish = (values) => {
    setSubmiting(true)
    const {confirm, ...data} = values
    console.log(data)
    authHeader(auth.username, auth.password)
    http.post('/dogs', data)
    .then ((response) => {
      setpromtMsg('You are successfully to add a new dog. We will redirect you to it');
      setTimeout(() => {
        navigate(`/dogs/${response.data.id}`, {replace: true})
      }, 2500);
    })
    .catch ((error) => {
      setSubmiting(false)
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
      <h1>Add a new dog</h1>
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
          {submitting ?
            <LoadingIcon /> :
            <Button type="primary" htmlType="submit">
            Submit
            </Button>
          }
          { promtMsg ? <p>{promtMsg}</p> : <></> }
        </Form.Item>
      </Form>
      <BackBtn path={'/'}/>
    </>
  )
}

export default DogAdd
