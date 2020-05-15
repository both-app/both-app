import axios from 'axios'
import * as Localization from 'expo-localization'
import Constants from 'expo-constants'
import * as Sentry from 'sentry-expo'

import { getItem } from 'res/storage'

export interface APIResponse<T> {
  status: number
  message: string
  data: T
}

const { manifest } = Constants

const API_URL =
  __DEV__ || manifest.releaseChannel === 'staging'
    ? 'https://both-app-staging.herokuapp.com/'
    : 'https://both-app.herokuapp.com/'

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
  },
})

api.interceptors.request.use(async (config) => {
  const jwtToken = await getItem('jwtToken')
  if (jwtToken) {
    console.log(jwtToken)
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
    Sentry.captureException(error)
    return Promise.reject(error)
  }
)
