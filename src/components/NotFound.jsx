import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

import BackBtn from './utils/BackBtn.jsx'

function NotFound() {  
  const navigate = useNavigate();
  
  return (
    <>
      <Result status="404" title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<BackBtn path={'/'}/>} />
    </>
  );    
}

export default NotFound;
