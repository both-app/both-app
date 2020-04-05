import { AsyncStorage } from 'react-native'

export type StorageKey = 'jwtToken'

export const setItem = async (key: StorageKey, value: any) => {
  try {
    await AsyncStorage.setItem(key, value)
    console.log('AsyncStorage Success: ', key, value)
  } catch (error) {
    console.log('AsyncStorage Error: ' + error.message)
  }
}

export const getItem = (key: StorageKey) => AsyncStorage.getItem(key)

export const removeItem = (key: StorageKey) => AsyncStorage.removeItem(key)
