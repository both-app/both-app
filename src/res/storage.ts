import { AsyncStorage } from 'react-native'

type Key = 'jwtToken'

export const setItem = async (key: Key, value: any) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (error) {
    console.log('AsyncStorage Error: ' + error.message)
  }
}

export const getItem = async (key: Key) => AsyncStorage.getItem(key)
