import { AsyncStorage } from 'react-native'
import * as Sentry from 'sentry-expo'

export type StorageKey =
  | 'jwtToken'
  | 'relation'
  | 'shareKeyModalInited'
  | 'users'
  | 'categories'
  | 'tasks'

export const setItem = (key: StorageKey, value: any) => {
  try {
    return AsyncStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    Sentry.withScope((scope) => {
      scope.setExtra('key', key)
      scope.setExtra('value', value)
    })
    Sentry.captureException(error)
  }
}

export const getItem = async (key: StorageKey) => {
  const value = await AsyncStorage.getItem(key)

  try {
    return JSON.parse(value)
  } catch (error) {
    Sentry.withScope((scope) => {
      scope.setExtra('key', key)
      scope.setExtra('value', value)
    })
    Sentry.captureException(error)
  }
}

export const removeItem = (key: StorageKey) => AsyncStorage.removeItem(key)

export const clear = () => AsyncStorage.clear()
