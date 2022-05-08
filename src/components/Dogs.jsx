import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { Button, Card, Col, Row } from "antd"

import useAuth from '../hooks/useAuth'
import http from "../common/http-common.js"
import LoadingIcon from './utils/LoadingIcon.jsx'
import SearchBar from './utils/SearchBar.jsx'

// Sample Data
// import SampleDogData from '../SampleDogData.json'

const CardLayout = {
  span: { xs: 24, sm: 12 , md: 8, lg: 6,  },
  margin: 10
  // span: { xs: { span: 24 }, sm: { span: 12 }, md: { span: 8 }, lg: { span: 6 } }
}

const Dogs = () => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true)
  const [Dogs, setDogs] = useState(null)
  
  useEffect(() => {
    http.get('/dogs')
    .then((response) => {
      setDogs(response.data)
      setLoading(false)
    }).catch((error) => {
      console.log(error)
      setLoading(false)
    })
  },[])
  
  if(loading){
    return(<LoadingIcon />)
    } else {
        if(!Dogs){
      return(
        <div>There is no Dog available now</div>
      )
    } else {
      return(
        <>
          { auth.role == 'worker' ? 
          <Button><Link to={`/dogs/add`} >Add a new dog</Link></Button> :
            <></>
          }
          <SearchBar placeholder='Search something...' data={Dogs}/>
          <Row type="flex" justify="space-around">
            {
              Dogs && Dogs.map(({ id, name, breed }) => (
                <Col {...CardLayout} key={id}>
                  <Card title={name} style={{width: 300}} >
                    <p>{breed}</p>
                    <br/>
                    <Link to={`/dogs/${id}`} >Details</Link>
                  </Card>
                </Col>
              ))
            }
          </Row>
        </>
      )
    }
  }
}

export default Dogs;