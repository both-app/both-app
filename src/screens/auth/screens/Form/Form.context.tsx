import React, { FC, createContext, useState, useMemo } from 'react'

interface FormContextProps {
  values: {
    firstName: string
    gender: string
    code: string
    type: string
    birthDate: string
    expoPushToken: string
  }
  setValue: (fieldName: keyof FormContextProps['values'], value: string) => void
}

// @ts-ignore
const FormContext = createContext<FormContextProps>({})

const FormContextProvider: FC = ({ children }) => {
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

  const formContextApi = useMemo(
    () => ({
      values: state,
      setValue,
    }),
    [state, setValue]
  )

  return (
    <FormContext.Provider value={formContextApi}>
      {children}
    </FormContext.Provider>
  )
}

export { FormContext, FormContextProvider }
