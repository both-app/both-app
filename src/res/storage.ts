import { AsyncStorage } from 'react-native'
import * as Sentry from 'sentry-expo'

const { Native: SentryNative } = Sentry

export type StorageKey =
  | 'jwtToken'
  | 'relation'
  | 'users'
  | 'categories'
  | 'tasks'
  | 'userScore'
  | 'userGlobalScore'

export const setItem = (key: StorageKey, value: any) => {
  SentryNative.withScope((scope) => {
    scope.setExtra(`storage.${key}`, value)
  })

  try {
    return AsyncStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    SentryNative.captureException(error)
  }
}

export const getItem = async (key: StorageKey) => {
  const value = await AsyncStorage.getItem(key)

  try {
    return JSON.parse(value)
  } catch (error) {
    SentryNative.captureException(error)
  }
}

export const removeItem = (key: StorageKey) => AsyncStorage.removeItem(key)

export const clear = () => AsyncStorage.clear()
