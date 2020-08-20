import React, { FC, createContext, useMemo, useContext } from 'react'
import * as Analytics from 'expo-firebase-analytics'

import { RelationTaskAddedModalContext } from 'screens/app/contexts/RelationTaskAddedModal.context'

interface AddRelationTaskContextProps {
  addRelationTask: (task: Task) => Promise<void>
}

// @ts-ignore
const AddRelationTaskContext = createContext<AddRelationTaskContextProps>({})

const AddRelationTaskContextProvider: FC = ({ children }) => {
  const { openRelationTaskAddedModal } = useContext(
    RelationTaskAddedModalContext
  )

  const addRelationTask: AddRelationTaskContextProps['addRelationTask'] = async (
    task: Task
  ) => {
    openRelationTaskAddedModal()

    Analytics.logEvent('AddRelationTask', {
      taskId: task.id,
    })
  }

  const addRelationTaskContextApi = useMemo(() => ({ addRelationTask }), [
    addRelationTask,
  ])

  return (
    <AddRelationTaskContext.Provider value={addRelationTaskContextApi}>
      {children}
    </AddRelationTaskContext.Provider>
  )
}

export { AddRelationTaskContext, AddRelationTaskContextProvider }