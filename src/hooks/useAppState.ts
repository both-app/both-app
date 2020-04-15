import { useEffect, useState } from 'react'
import { AppState } from 'react-native'

export const useAppState = () => {
  const [appState, setAppState] = useState(AppState.currentState)

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange)

    return () => {
      AppState.removeEventListener('change', handleAppStateChange)
    }
  }, [])

  const handleAppStateChange = (nextAppState) => setAppState(nextAppState)

  return {
    appState,
  }
}
