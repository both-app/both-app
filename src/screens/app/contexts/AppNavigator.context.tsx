import React, { FC, createContext, useMemo, useState } from 'react'

export type AppRoute =
  | 'Home'
  | 'Relation'
  | 'AddTask'
  | 'AddTaskModal'
  | 'Leaderboard'
  | 'Settings'

interface AppNavigatorContextProps {
  setRouteBadge: (routeName: AppRoute) => void
  unSetRouteBadge: (routeName: AppRoute) => void
  appRoutesWithBadge: Record<AppRoute, boolean>
}

// @ts-ignore
const AppNavigatorContext = createContext<AppNavigatorContextProps>({})

const AppNavigatorContextProvider: FC = ({ children }) => {
  const [appRoutesWithBadge, setAppRoutesWithBadge] = useState<any>({})

  const setRouteBadge = (routeName: AppRoute) =>
    setAppRoutesWithBadge({
      ...appRoutesWithBadge,
      [routeName]: true,
    })

  const unSetRouteBadge = (routeName: AppRoute) =>
    setAppRoutesWithBadge({
      ...appRoutesWithBadge,
      [routeName]: false,
    })

  const appNavigatorContextApi = useMemo(
    () => ({ setRouteBadge, unSetRouteBadge, appRoutesWithBadge }),
    [setRouteBadge, unSetRouteBadge, appRoutesWithBadge]
  )

  return (
    <AppNavigatorContext.Provider value={appNavigatorContextApi}>
      {children}
    </AppNavigatorContext.Provider>
  )
}

export { AppNavigatorContext, AppNavigatorContextProvider }
