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

type GetRelationInfoResponse = APIResponse<{
  relation: Relation
  user: User
  partner?: User
}>

interface UsersContextState {
  me: User
  partner: User
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
    expoPushToken: '',
  },
  partner: {
    id: '',
    firstName: '',
    gender: 'other',
    relationId: '',
    birthDate: '',
    expoPushToken: '',
  },
}

// @ts-ignore
const UsersContext = createContext<UsersContextProps>({})

const UsersContextProvider: FC = ({ children }) => {
  const [state, setState] = useState<UsersContextState>(initialState)

  useEffect(() => {
    const reHydrateData = async () => {
      const users = (await getItem('users')) as UsersContextState

      Sentry.setUser(users.me)

      if (users) {
        setState({ ...state, ...users })
      }

      fetchUsers()
    }

    reHydrateData()
  }, [])

  const fetchUsers = async () => {
    const {
      data: { data },
    } = await api.get<GetRelationInfoResponse>('relations/informations')

    if (data.partner?.id) {
      const newState = {
        me: data.user,
        partner: data.partner,
      }

      await setItem('users', newState)
      return setState(newState)
    }
  }

  const getUserById = useCallback(
    (userId: string) => {
      if (state.me.id === userId) {
        return state.me
      }

      if (state.partner.id === userId) {
        return state.partner
      }

      return null
    },
    [state]
  )

  const usersContextApi = useMemo(
    () => ({ ...state, getUserById, fetchUsers }),
    [state, getUserById, fetchUsers]
  )

  return (
    <UsersContext.Provider value={usersContextApi}>
      {children}
    </UsersContext.Provider>
  )
}

export { UsersContext, UsersContextProvider }
