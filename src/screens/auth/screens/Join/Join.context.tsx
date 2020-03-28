import React, { FC, createContext, useState, useMemo } from 'react'

interface JoinContextProps {
  values: {
    code: string
    gender: string
  }
  setValue: (fieldName: keyof JoinContextProps['values'], value: string) => void
}

const JoinContext = createContext<JoinContextProps>({
  values: { code: '', gender: '' },
  // @ts-ignore
  setValue: () => {},
})

const JoinContextProvider: FC = ({ children }) => {
  const [state, setState] = useState({
    code: '',
    gender: '',
  })

  const setValue = (fieldName: string, value: string) =>
    setState({ ...state, [fieldName]: value })

  const joinContextApi = useMemo(
    () => ({
      values: state,
      setValue,
    }),
    [state, setValue]
  )

  return (
    <JoinContext.Provider value={joinContextApi}>
      {children}
    </JoinContext.Provider>
  )
}

export { JoinContext, JoinContextProvider }
