import React, { FC, createContext, useMemo, useEffect, useState } from 'react'
import * as Sentry from 'sentry-expo'

import { getItem } from 'res/storage'

interface RelationContextProps {
  shareKeyModalOpen: boolean
  relation: Relation
  setShareKeyModal: (value: boolean) => void
}

const RelationContext = createContext<RelationContextProps>({
  shareKeyModalOpen: false,
  relation: {
    id: '',
    code: '',
    createdAt: '',
  },
  setShareKeyModal: () => {},
})

const RelationContextProvider: FC = ({ children }) => {
  const [shareKeyModalOpen, setShareKeyModal] = useState<boolean>(false)
  const [relation, setRelation] = useState<Relation>({
    id: '',
    code: '',
    createdAt: '',
  })

  useEffect(() => {
    const reHydrateData = async () => {
      const [relation, shareKeyModalInited] = await Promise.all([
        getItem('relation'),
        getItem('shareKeyModalInited'),
      ])

      if (relation) {
        Sentry.setContext('relation', relation)
        setRelation(relation)
      }

      if (!shareKeyModalInited) {
        setShareKeyModal(true)
      }
    }

    reHydrateData()
  }, [])

  const relationContextApi = useMemo(
    () => ({
      shareKeyModalOpen,
      setShareKeyModal,
      relation,
    }),
    [relation, shareKeyModalOpen, setShareKeyModal]
  )

  return (
    <RelationContext.Provider value={relationContextApi}>
      {children}
    </RelationContext.Provider>
  )
}

export { RelationContext, RelationContextProvider }
