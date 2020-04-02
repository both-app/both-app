import React, { FC, createContext, useState, useMemo } from 'react'

interface AuthFormContextProps {
  values: {
    name: string
    gender: string
    specialGender: string
    partnerName: string
    code: string
    type: string
    birthday: string
  }
  setValue: (
    fieldName: keyof AuthFormContextProps['values'],
    value: string
  ) => void
}

const AuthFormContext = createContext<AuthFormContextProps>({
  values: {
    name: '',
    partnerName: '',
    gender: '',
    specialGender: '',
    type: '',
    code: '',
    birthday: '',
  },
  // @ts-ignore
  setValue: () => {},
})

const AuthFormContextProvider: FC = ({ children }) => {
  const [state, setState] = useState({
    name: '',
    partnerName: '',
    gender: '',
    specialGender: '',
    type: '',
    code: '',
    birthday: '',
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
