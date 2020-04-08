import React, { FC, createContext, useMemo } from 'react'

interface RelationPointsContextProps {}

// @ts-ignore
const RelationPointsContext = createContext<RelationPointsContextProps>({})

const RelationPointsContextProvider: FC = ({ children }) => {
  const relationPointsContextApi = useMemo(() => ({}), [])

  return (
    <RelationPointsContext.Provider value={relationPointsContextApi}>
      {children}
    </RelationPointsContext.Provider>
  )
}

export { RelationPointsContext, RelationPointsContextProvider }
