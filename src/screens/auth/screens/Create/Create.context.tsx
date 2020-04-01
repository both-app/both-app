import React, { FC, createContext, useState, useMemo } from 'react'

interface CreateContextProps {
  values: {
    name: string
    gender: string
    partnerName: string
    code: string
    type: string
    birthday: string
  }
  setValue: (
    fieldName: keyof CreateContextProps['values'],
    value: string
  ) => void
}

const CreateContext = createContext<CreateContextProps>({
  values: {
    name: '',
    partnerName: '',
    gender: '',
    type: 'JOIN',
    code: '',
    birthday: '',
  },
  // @ts-ignore
  setValue: () => {},
})

const CreateContextProvider: FC = ({ children }) => {
  const [state, setState] = useState({
    name: '',
    partnerName: '',
    gender: '',
    type: 'JOIN',
    code: '',
    birthday: '',
  })

  const setValue = (fieldName: string, value: string) =>
    setState({ ...state, [fieldName]: value })

  const createContextApi = useMemo(
    () => ({
      values: state,
      setValue,
    }),
    [state, setValue]
  )

  return (
    <CreateContext.Provider value={createContextApi}>
      {children}
    </CreateContext.Provider>
  )
}

export { CreateContext, CreateContextProvider }
