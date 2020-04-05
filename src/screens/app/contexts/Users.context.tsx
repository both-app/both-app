import React, { FC, createContext, useState, useMemo, useEffect } from 'react'
import { getItem } from 'res/storage'

interface UsersContextState {
  me: User
  sidekick: User | null
}

const initialState: UsersContextState = {
  me: {
    id: '',
    firstName: '',
    gender: 'other',
    relationId: '',
    birthDate: '',
  },
  sidekick: null,
}

const UsersContext = createContext<UsersContextState>({
  ...initialState,
})

const UsersContextProvider: FC = ({ children }) => {
  const [state, setState] = useState<UsersContextState>(initialState)

  useEffect(() => {
    const reHydrateData = async () => {
      const users = (await getItem('users')) as UsersContextState

      if (users) {
        setState(users)
      }
    }

    reHydrateData()
  }, [])

  const usersContextApi = useMemo(
    () => ({
      ...state,
    }),
    [state]
  )

  return (
    <UsersContext.Provider value={usersContextApi}>
      {children}
    </UsersContext.Provider>
  )
}

export { UsersContext, UsersContextProvider }
