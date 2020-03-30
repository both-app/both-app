import React, { FC, createContext, useState, useMemo, useEffect } from 'react'

import { RELATION_TASKS } from 'res/fixtures'

interface RelationTaskContextProps {
  relationTasks: RelationTask[]
}

const RelationTaskContext = createContext<RelationTaskContextProps>({
  relationTasks: [],
})

const RelationTaskContextProvider: FC = ({ children }) => {
  const [relationTasks, setTasks] = useState<RelationTask[]>([])

  useEffect(() => {
    const fetchRelationTasks = () => {
      setTasks(RELATION_TASKS)
    }

    fetchRelationTasks()
  }, [])

  const relationTaskContextApi = useMemo(
    () => ({
      relationTasks,
    }),
    [relationTasks]
  )

  return (
    <RelationTaskContext.Provider value={relationTaskContextApi}>
      {children}
    </RelationTaskContext.Provider>
  )
}

export { RelationTaskContext, RelationTaskContextProvider }
