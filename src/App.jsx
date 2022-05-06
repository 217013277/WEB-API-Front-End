import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import { Layout, Space } from "antd"

import './App.css'

import Home from "./components/Home.jsx"
import DogDetail from "./components/DogDetail.jsx"
import DogAdd from "./components/DogAdd.jsx"
import Register from "./components/Register.jsx"
import Login from "./components/Login.jsx"
import DogEditForm from './components/form/DogEditForm.jsx'
import LogoutBtn from './components/utils/LogoutBtn.jsx'
import useAuth from './hooks/useAuth'
import SearchBar from './components/utils/SearchBar.jsx'

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
              <> <LogoutBtn /> </> :
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
          <Route exact path="/dogs/:id" element={<DogDetail />} />
          <Route path="/dogs/:id/edit" element={<DogEditForm />} />
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