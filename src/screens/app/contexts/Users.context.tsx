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
  const [userState, setUserState] = useState<UsersContextState>(initialState)

  useEffect(() => {
    const reHydrateData = async () => {
      const users = (await getItem('users')) as UsersContextState

      Sentry.setUser(users.me)

      if (users) {
        setUserState({ ...userState, ...users })
      }

      fetchUsers()
    }

    reHydrateData()
  }, [])

  useEffect(() => {
    if (appState === 'active' && !userState.partner.id) {
      fetchUsers()
    }
  }, [appState])

  const fetchUsers = async () => {
    const {
      data: { data },
    } = await api.get<GetRelationInfoResponse>('relations/informations')

    if (data.partner?.id && !userState.partner.id) {
      const newState = {
        me: data.user,
        partner: data.partner,
        relation: data.relation,
      }

      await setItem('users', newState)
      return setUserState(newState)
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
    () => ({ ...userState, getUserById, fetchUsers }),
    [userState, getUserById, fetchUsers]
  )

  return (
    <UsersContext.Provider value={usersContextApi}>
      {children}
    </UsersContext.Provider>
  )
}

export { UsersContext, UsersContextProvider }
