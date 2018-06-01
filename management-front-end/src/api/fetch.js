import axios from 'axios'
import { getToken } from '../utils/auth'
import store from '../store'

export const api = axios.create({
  baseURL: 'http://101.37.31.36:8086/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Language': 'zh_CN',
    'Currency': 'CNY'
  },
  timeout: 10 * 1000
})

// request拦截器
api.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers.Authorization = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  return Promise.reject(error)
})

// 设置拦截器
api.interceptors.response.use(
  (response) => {
    console.log('请求成功')
    return response
  }, (error) => {
    console.log('发生错误')
    return Promise.reject(error)
  }
)
