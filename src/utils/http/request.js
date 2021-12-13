import axios from 'axios'


const instance = axios.create({
  baseURL: '/api',
  // baseURL: 'http://82.157.165.74:8000/',
  timeout: 5000
})

export function get(url, params) {
  return instance.get(url, {
    params
  })
}
export function post(url, data) {
  return instance.post(url, data)
}