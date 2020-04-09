import React, { FC, createContext, useMemo } from 'react'
import { api, APIResponse } from 'res/api'
import { AxiosResponse } from 'axios'

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
}

const AuthApiContext = createContext<AuthApiContextProps>({
  // @ts-ignore
  createRelation: () => {},
  // @ts-ignore
  joinRelation: () => {},
})

const AuthApiContextProvider: FC = ({ children }) => {
  const createRelation = (params) => api.post('relations', params)
  const joinRelation = (params) => api.post('relations/join', params)

  const authApiContextApi = useMemo(
    () => ({
      createRelation,
      joinRelation,
    }),
    [createRelation, joinRelation]
  )

  return (
    <AuthApiContext.Provider value={authApiContextApi}>
      {children}
    </AuthApiContext.Provider>
  )
}

export { AuthApiContext, AuthApiContextProvider }
