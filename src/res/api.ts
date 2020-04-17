import axios from 'axios'
import * as Localization from 'expo-localization'

import { getItem, clear } from 'res/storage'

export interface APIResponse<T> {
  status: number
  message: string
  data: T
}

const API_URL = __DEV__
  ? 'https://both-app-staging.herokuapp.com/'
  : 'https://both-app-staging.herokuapp.com/' // https://both-app.herokuapp.com/

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
  },
})

api.interceptors.request.use(async (config) => {
  const jwtToken = await getItem('jwtToken')
  if (jwtToken) {
    config.headers.Authorization = `Bearer ${jwtToken}`
  }

  const locale = Localization.locale
  if (locale) {
    config.headers['Accept-Language'] = locale
  }

  const timezone = Localization.timezone
  if (timezone) {
    config.headers['Timezone'] = timezone
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    clear()
    return Promise.reject(error)
  }
)
