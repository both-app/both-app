import { AsyncStorage } from 'react-native'

export type StorageKey = 'jwtToken' | 'relation' | 'shareKeyModalInited'

export const setItem = (key: StorageKey, value: any) =>
  AsyncStorage.setItem(key, JSON.stringify(value))

export const getItem = async (key: StorageKey) => {
  const value = await AsyncStorage.getItem(key)

  return JSON.parse(value)
}

export const removeItem = (key: StorageKey) => AsyncStorage.removeItem(key)

export const clear = () => AsyncStorage.clear()
