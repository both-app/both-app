import React, { FC, createContext, useState, useMemo } from 'react'

interface AuthFormContextProps {
  values: {
    firstName: string
    gender: string
    code: string
    type: string
    birthDate: string
    expoPushToken: string
  }
  setValue: (
    fieldName: keyof AuthFormContextProps['values'],
    value: string
  ) => void
}

const AuthFormContext = createContext<AuthFormContextProps>({
  values: {
    firstName: '',
    gender: '',
    type: '',
    code: '',
    birthDate: '',
    expoPushToken: '',
  },
  // @ts-ignore
  setValue: () => {},
})

const AuthFormContextProvider: FC = ({ children }) => {
  const [state, setState] = useState({
    firstName: '',
    gender: '',
    type: '',
    code: '',
    birthDate: '',
    expoPushToken: '',
  })

  const setValue = (fieldName: string, value: string) =>
    setState({ ...state, [fieldName]: value })

  const authContextApi = useMemo(
    () => ({
      values: state,
      setValue,
    }),
    [state, setValue]
  )

  return (
    <AuthFormContext.Provider value={authContextApi}>
      {children}
    </AuthFormContext.Provider>
  )
}

export { AuthFormContext, AuthFormContextProvider }
