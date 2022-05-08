import React from 'react'
import WorkerForm from './form/WorkerForm.jsx'
import BackBtn from './utils/BackBtn.jsx'

const Register = () => {
	return (
		<div>
			<h1>Register</h1>
      <WorkerForm />
      <BackBtn path={'/'}/>
    </div>
	);
}

export default Register
