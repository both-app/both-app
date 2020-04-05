import axios from 'axios'
import { getItem } from 'res/storage'

export interface APIResponse<T> {
  status: number
  message: string
  data: T
}

export const api = axios.create({
  baseURL: 'https://both-app.herokuapp.com/',
  headers: {
    Accept: 'application/json',
  },
})

api.interceptors.request.use(async (config) => {
  const jwtToken = await getItem('jwtToken')

  if (jwtToken) {
    config.headers.Authorization = `Bearer ${jwtToken}`
  }

  return config
})
