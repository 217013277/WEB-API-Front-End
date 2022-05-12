import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, DatePicker } from 'antd';
import moment from 'moment';

import useAuth from './../hooks/useAuth';
import http, { authHeader } from './../common/http-common.js';
import LoadingIcon from './utils/LoadingIcon.jsx';
import BackBtn from './utils/BackBtn.jsx';

const formItemLayout = {
	labelCol: { xs: { span: 24 }, sm: { span: 6 } },
	wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
};

const tailFormItemLayout = {
	wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 12, offset: 6 } }
};

const UserEdit = props => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { auth } = useAuth();
  const [status, setStatus] = useState('isLoading');
	const [userData, setUserData] = useState(null);
	const [promtMsg, setpromtMsg] = useState('');

	useEffect( async () => {
		setStatus('isLoading');
    try {
      authHeader(auth.username, auth.password);
      console.log(`/${auth.role}s/${auth.id}`)
      const response = await http.get(`/${auth.role}s/${auth.id}`);
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
    setStatus('isComplete');
	}, []);

	const onFinish = async values => {
		setStatus('isSubmitting');
		const { confirm, ...data } = values;
		console.log(data);
    authHeader(auth.username, auth.password);
		try {
      await http.put(`/${auth.role}s/${auth.id}`, data)
      setStatus('isComplete');
      setpromtMsg('Submitted successfully. We will redirect you now');
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 2500);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
			  console.log(error.response.status);
			  console.log(error.response.header);
      }
      setpromtMsg('Something is wrong, please try again');
      setStatus('isComplete');
    }
	};

	const fnameRules = [{ required: true, message:'Please input your first name' }];
  const lnameRules = [{ required: true, message:'Please input your last name' }];
  const usernameRules = [{ required: true, message: 'Please input your username', whitespace: true }];
  const emailRules = [
    {type: 'email', message:'input invalid'},
    {required: true, message:'Please input an email'}
  ];
  const passwordRules = [{required: true, message: 'Please input your password'}];
  const confirmRules = [
    {required: true, message: 'Please confirm your password'},
    ({ getFieldValue }) => ({
      validator(rule, value) {
        if (!value || getFieldValue('password') === value) {
          return Promise.resolve();
        }
        return Promise.reject('The confirm password is not match with the password!');
      }
    })
  ];

	if (status == 'isLoading') {
		return <LoadingIcon />;
	} else {
		if (userData) {
			return (
				<>
					<h1>Edit your information</h1>
					<Form
						{...formItemLayout}
						name="register"
						onFinish={onFinish}
						initialValues={{
							firstname: userData?.firstname ? `${userData.firstname}` : '',
              lastname: userData?.lastname ? `${userData.lastname}` : '',
              username: userData?.username ? `${userData.username}` : '',
              about: userData?.about ? `${userData.about}` : '',
              email: userData?.email ? `${userData.email}` : '' }}>
    				<Form.Item name="firstname" label="First Name" autoComplete="given-name" rules={fnameRules}>
              <Input />
            </Form.Item>
            <Form.Item name="lastname" label="Last Name" autoComplete="family-name" rules={lnameRules}>
              <Input />
            </Form.Item>
            <Form.Item name="about" label="About">
    					<Input.TextArea rows={4} />
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
    				<Form.Item {...tailFormItemLayout}>
      				{status == 'isSubmitting' ? 
                <LoadingIcon /> 
                : 
                <>
                  <Button type="primary" htmlType="submit">Submit</Button>
                  <BackBtn path={'/dashboard'}/>
                </> }
    					{ promtMsg && <p>{promtMsg}</p> }
  					</Form.Item>
					</Form>
				</>
			);
		} else {
			return (
				<>
					<p>Cannot not found the user information</p>
					<BackBtn path={'/dashboard'}/>
				</>
			);
		}
	}
};

export default UserEdit;
