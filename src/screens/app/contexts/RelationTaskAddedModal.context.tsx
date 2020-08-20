import React, { FC, createContext, useMemo, useState } from 'react'

import { wait } from 'res/utils'

interface TaskAddedContextProps {
  openRelationTaskAddedModal: () => void
  closeRelationTaskAddedModal: () => void
  modalIsOpen: boolean
}

// @ts-ignore
const RelationTaskAddedModalContext = createContext<TaskAddedContextProps>({})

const RelationTaskAddedModalContextProvider: FC = ({ children }) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

  const openRelationTaskAddedModal = () => {
    setModalIsOpen(true)
  }

  const closeRelationTaskAddedModal = async () => {
    setModalIsOpen(false)
    await wait(1000)
  }

  const relationRelationTaskAddedModalContextApi = useMemo(
    () => ({
      modalIsOpen,
      openRelationTaskAddedModal,
      closeRelationTaskAddedModal,
    }),
    [modalIsOpen, openRelationTaskAddedModal, closeRelationTaskAddedModal]
  )

  return (
    <RelationTaskAddedModalContext.Provider
      value={relationRelationTaskAddedModalContextApi}
    >
      {children}
    </RelationTaskAddedModalContext.Provider>
  )
}

export { RelationTaskAddedModalContext, RelationTaskAddedModalContextProvider }
