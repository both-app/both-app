import React, { FC, createContext, useMemo } from 'react'
import { AxiosResponse } from 'axios'

import { api, APIResponse } from 'res/api'

type AuthResponse = APIResponse<{
  jwtToken: string
  relation: Relation
  user: User
}>

interface AuthApiContextProps {
  createRelation: (params: {
    firstName: string
    birthDate: number
    gender: string
    expoPushToken: string
  }) => Promise<AxiosResponse<AuthResponse>>
  joinRelation: (params: {
    firstName: string
    birthDate: number
    gender: string
    code: string
    expoPushToken: string
  }) => Promise<AxiosResponse<AuthResponse>>
  deleteRelation: () => Promise<AxiosResponse<APIResponse<{}>>>
}

// @ts-ignore
const AuthApiContext = createContext<AuthApiContextProps>({})

const AuthApiContextProvider: FC = ({ children }) => {
  const createRelation: AuthApiContextProps['createRelation'] = (params) =>
    api.post('relations', params)
  const joinRelation: AuthApiContextProps['joinRelation'] = (params) =>
    api.post('relations/join', params)
  const deleteRelation: AuthApiContextProps['deleteRelation'] = () =>
    api.delete('relations')

  const authApiContextApi = useMemo(
    () => ({
      createRelation,
      joinRelation,
      deleteRelation,
    }),
    [createRelation, joinRelation, deleteRelation]
  )

  return (
    <AuthApiContext.Provider value={authApiContextApi}>
      {children}
    </AuthApiContext.Provider>
  )
}

export { AuthApiContext, AuthApiContextProvider }
