import { Layout, Space } from 'antd';
import React from 'react';
import './App.css';
import { BrowserRouter as Router,
        Routes, Route, Link 
       } from 'react-router-dom'

import Home from './components/home'
import Dashboard from './components/dashboard'
import About from './components/about'
import DetailArticle from './components/detailarticle'
import Registration from './components/register'
import NotFound from './components/notfound'

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Router>      
      <Header>
        <nav>
          <Space>
          <Link to="/">Home</Link>  
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/about">About</Link>
          <Link to="/register">Register</Link>
          </Space>
        </nav>
      </Header>       
      <Content>
        <Routes>
          <Route exact path="/" element={ <Home />} />
          <Route path="/about" element={ <About />} />
          <Route path="/dashboard" element={ <Dashboard /> } />
          <Route path="/a/:aid" element={ <DetailArticle />} />
          <Route path="/register" element={ <Registration /> } />
          <Route path="*" element={ <NotFound /> }/>          
        </Routes>
      </Content>
      <Footer>
        <p>VT6003CEM Demo</p>
      </Footer>
      
    </Router>   
  );
}

export default App;