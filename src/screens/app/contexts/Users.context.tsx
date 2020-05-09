import React, {
  FC,
  createContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from 'react'
import * as Sentry from 'sentry-expo'
import * as Analytics from 'expo-firebase-analytics'

import { api, APIResponse } from 'res/api'
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
    pushToken: '',
  },
  partner: {
    id: '',
    firstName: '',
    gender: 'other',
    relationId: '',
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
      await Analytics.setUserId(data.user.id)
      await Analytics.setUserProperties({
        relationId: data.user.relationId,
        gender: data.user.gender,
      })

      const newState = {
        me: data.user,
        partner: data.partner || userState.partner,
        relation: data.relation,
      }

      return setUserState(newState)
    } catch (error) {
      if (
        error.response?.status === 404 || // RelationNotFound
        error.response?.status === 400 || // NotMatchUser
        error.response?.status === 401 // InvalidToken
      ) {
        setHasError(true)
      }
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
