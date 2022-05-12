import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import { Layout, Space } from "antd"

import './App.css'

import Home from "./components/Home.jsx"
import DogDetail from "./components/DogDetail.jsx"
import DogAdd from "./components/DogAdd.jsx"
import DogEdit from "./components/DogEdit.jsx"
import Register from "./components/Register.jsx"
import Login from "./components/Login.jsx"
import Dashboard from "./components/Dashboard.jsx"
import UserEdit from "./components/UserEdit.jsx"

import LogoutBtn from './components/utils/LogoutBtn.jsx'
import useAuth from './hooks/useAuth'

const App = () => {
  const { Header, Content, Footer } = Layout;
  const { auth } = useAuth();
  
  return (
    <Router>
      <Header>
        <nav id='navbar'>
          <Space>
            <Link to="/">Home</Link>
            {auth.username?
              <> 
                <Link to="/dashboard">Dashboard</Link>
                <LogoutBtn /> 
              </> :
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            }
          </Space>
        </nav>
      </Header>
      <Content id='content'>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/edit" element={<UserEdit />} />
          <Route exact path="/dogs/:id" element={<DogDetail />} />
          <Route path="/dogs/:id/edit" element={<DogEdit />} />
          <Route path="/dogs/add" element={<DogAdd />} />
          <Route path="*" element={<p>404 Not Found</p>} />
        </Routes>
      </Content>
      <Footer id='footer'>
        <Space>
          <p>VT6003CEM Demo</p>
          {auth.username ? <p>Hi {auth.username} ({auth.role})</p> : <p>Hi Guest</p> }
        </Space>
      </Footer>
    </Router>
  )
}

export default App;