import axios from 'axios'
import { Buffer } from 'buffer'

export const http = axios.create({
  baseURL:'https://WEB-API-Assignment-Back-End.217013277.repl.co/api/v1/',
  headers:{
    'content-type': 'application/json',
  }
})

const authHeader = (username, password) => {
  http.defaults.headers.common['Authorization'] = `Basic ${Buffer.from(`${username}:${password}`, 'utf8').toString('base64')}`
} 

export default http
export { authHeader }
