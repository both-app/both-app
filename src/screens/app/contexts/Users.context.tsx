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
import { omitBy } from 'res/utils'
import { getUrlFromPath } from 'res/image'

import { useAppState } from 'hooks/useAppState'

type GetRelationInfoResponse = APIResponse<{
  relation: Relation
  user: ApiUser
  partner?: ApiUser
}>

type UpdateUserResponse = APIResponse<{
  user: ApiUser
}>

interface UsersContextState {
  me: User
  partner: User
  relation: Relation
}

interface UsersContextProps extends UsersContextState {
  hasError: boolean
  getUserById: (userId: string) => User
  updateUser: (user: Partial<User>) => Promise<void>
  fetchUsers: () => Promise<void>
}

const initialState: UsersContextState = {
  me: {
    id: '',
    firstName: '',
    gender: 'other',
    relationId: '',
    pushToken: '',
    avatarPath: '',
    avatarUrl: '',
  },
  partner: {
    id: '',
    firstName: '',
    gender: 'other',
    relationId: '',
    pushToken: '',
    avatarPath: '',
    avatarUrl: '',
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

  const updateUserState = async (state) => {
    const newState = state

    const [myAvatarUrl, partnerAvatarUrl] = await Promise.all([
      getUrlFromPath(newState.me.avatarPath),
      getUrlFromPath(newState.partner.avatarPath),
    ])

    newState.me.avatarUrl = myAvatarUrl
    newState.partner.avatarUrl = partnerAvatarUrl

    setUserState(newState)
  }

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

      return updateUserState({
        me: data.user,
        partner: data.partner || userState.partner,
        relation: data.relation,
      })
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

  const updateUser: UsersContextProps['updateUser'] = async (userToUpdate) => {
    const params = omitBy(
      {
        ...userState.me,
        ...userToUpdate,
      },
      // Theses fields can't be update
      ['id', 'language', 'relationId', 'avatarUrl']
    )

    const {
      data: { data },
    } = await api.put<UpdateUserResponse>('users', params)

    updateUserState({ ...userState, me: { ...userState.me, ...data.user } })
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
    () => ({ ...userState, getUserById, fetchUsers, hasError, updateUser }),
    [userState, getUserById, fetchUsers, hasError, updateUser]
  )

  return (
    <UsersContext.Provider value={usersContextApi}>
      {children}
    </UsersContext.Provider>
  )
}

export { UsersContext, UsersContextProvider }
