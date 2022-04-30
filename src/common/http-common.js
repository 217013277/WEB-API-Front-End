import axios from 'axios'

export default axios.create({
  baseURL: 'https://BScCOM-Blog-API-example.wongazta.repl.co/api/v1',
  headers: {
    'Content-type': 'application/json'
  }
})