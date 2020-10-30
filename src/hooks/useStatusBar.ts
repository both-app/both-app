import { useCallback } from 'react'
import { StatusBar, StatusBarStyle } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

export const useStatusBar = (style: StatusBarStyle, animated?: boolean) => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(style, animated)
    }, [])
  )
}
