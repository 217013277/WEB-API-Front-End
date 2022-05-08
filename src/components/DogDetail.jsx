import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Button, Space } from "antd"

import useAuth from '../hooks/useAuth'
import http from '../common/http-common.js'
import DeleteBtn from './utils/DeleteBtn.jsx'
import LoadingIcon from './utils/LoadingIcon.jsx'
import BackBtn from './utils/BackBtn.jsx'

const DogDetail = () => {
  const { auth } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [ loading, setLoading ] = useState(true);
  const [ dogData, setDogData ] = useState(null);

  useEffect(() => {
    setLoading(true)
    http.get(`/dogs/${id}`)
    .then((response, error) => {
      setDogData(response.data)
      setLoading(false)
    }).catch((error) =>{
      console.log(error)
      setLoading(false)
    })
  },[id])

  const editDogDetails = () => {
    console.log('navigate to edit page')
    navigate('edit') 
  }
  
	if(loading){
    return(<LoadingIcon />)
  } else {
    if(dogData) {
      return (
        <>
          <h1>{dogData.name}</h1>
          <h2>{dogData.description}</h2>
          <p>Breed: {dogData.breed}</p>
          <p>Date of birth: {dogData.birthday}</p>
          <p>ID: {dogData.id}</p>
          { auth.role == 'worker' ? 
            <div>
              <Space>
                <Button type="primary" onClick={ () => editDogDetails() }>Edit</Button>
                <DeleteBtn path={`/dogs/${id}`} />
              </Space>
            </div> : <></> }
          <BackBtn />
        </>
      )
    } else {
          return(
          <>
            <p>Cannot not found the dog</p>
            <BackBtn path={'/'}/>
          </>
        )
      }
    }
}

export default DogDetail;
