import { AsyncStorage } from 'react-native'
import * as Sentry from 'sentry-expo'

export type StorageKey =
  | 'jwtToken'
  | 'relation'
  | 'users'
  | 'categories'
  | 'tasks'
  | 'userScore'
  | 'userGlobalScore'
  | 'lastWeeklyRecapDate'

export const setItem = (key: StorageKey, value: any) => {
  Sentry.withScope((scope) => {
    scope.setExtra(`storage.${key}`, value)
  })

  try {
    return AsyncStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    Sentry.captureException(error)
  }
}

export const getItem = async (key: StorageKey) => {
  const value = await AsyncStorage.getItem(key)

  try {
    return JSON.parse(value)
  } catch (error) {
    Sentry.captureException(error)
  }
}

export const removeItem = (key: StorageKey) => AsyncStorage.removeItem(key)

export const clear = () => AsyncStorage.clear()
