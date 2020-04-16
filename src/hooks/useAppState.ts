import { useEffect, useState } from 'react'
import { AppState, AppStateStatus } from 'react-native'

export const useAppState = () => {
  const [appState, setAppState] = useState(AppState.currentState)

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange)

    return () => {
      AppState.removeEventListener('change', handleAppStateChange)
    }
  }, [])

  const handleAppStateChange = (nextAppState: AppStateStatus) =>
    setAppState(nextAppState)

  return {
    appState,
  }
}
