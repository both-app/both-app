import React, {
  FC,
  createContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from 'react'
import * as Sentry from 'sentry-expo'

import { api, APIResponse } from 'res/api'
import { getItem, setItem } from 'res/storage'
import { useAppState } from 'hooks/useAppState'

type GetRelationInfoResponse = APIResponse<{
  relation: Relation
  user: User
  partner?: User
}>

interface UsersContextState {
  me: User
  partner: User
  relation: Relation
}

interface UsersContextProps extends UsersContextState {
  hasError: boolean
  getUserById: (userId: string) => User
  fetchUsers: () => Promise<void>
}

const initialState: UsersContextState = {
  me: {
    id: '',
    firstName: '',
    gender: 'other',
    relationId: '',
    birthDate: '',
    pushToken: '',
  },
  partner: {
    id: '',
    firstName: '',
    gender: 'other',
    relationId: '',
    birthDate: '',
    pushToken: '',
  },
  relation: null,
}

// @ts-ignore
const UsersContext = createContext<UsersContextProps>({})

const UsersContextProvider: FC = ({ children }) => {
  const { appState } = useAppState()
  const [hasError, setHasError] = useState<boolean>(false)
  const [userState, setUserState] = useState<UsersContextState>(initialState)

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    if (appState === 'active') {
      fetchUsers()
    }
  }, [appState])

  const fetchUsers = async () => {
    try {
      const {
        data: { data },
      } = await api.get<GetRelationInfoResponse>('relations/informations')

      Sentry.setUser(data.user)

      const newState = {
        me: data.user,
        partner: data.partner || userState.partner,
        relation: data.relation,
      }

      return setUserState(newState)
    } catch (e) {
      setHasError(true)
    }
  }

  const getUserById = useCallback(
    (userId: string) => {
      if (userState.me.id === userId) {
        return userState.me
      }

      if (userState.partner.id === userId) {
        return userState.partner
      }

      return null
    },
    [userState]
  )

  const usersContextApi = useMemo(
    () => ({ ...userState, getUserById, fetchUsers, hasError }),
    [userState, getUserById, fetchUsers, hasError]
  )

  return (
    <UsersContext.Provider value={usersContextApi}>
      {children}
    </UsersContext.Provider>
  )
}

export { UsersContext, UsersContextProvider }
