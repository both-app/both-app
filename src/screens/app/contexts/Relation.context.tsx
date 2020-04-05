import React, { FC, createContext, useMemo, useEffect, useState } from 'react'
import { getItem } from 'res/storage'

interface RelationContextProps {
  relation: Relation
}

const RelationContext = createContext<RelationContextProps>({
  relation: {
    id: '',
    code: '',
  },
})

const RelationContextProvider: FC = ({ children }) => {
  const [relation, setRelation] = useState({ id: '', code: '' })

  useEffect(() => {
    const checkIfRelation = async () => {
      const relation = await getItem('relation')

      if (relation) {
        setRelation(relation)
      }
    }

    checkIfRelation()
  }, [])

  const relationContextApi = useMemo(
    () => ({
      relation,
    }),
    [relation]
  )

  return (
    <RelationContext.Provider value={relationContextApi}>
      {children}
    </RelationContext.Provider>
  )
}

export { RelationContext, RelationContextProvider }
