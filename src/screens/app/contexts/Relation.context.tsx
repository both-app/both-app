import React, { FC, createContext, useMemo, useEffect, useState } from 'react'
import * as Sentry from 'sentry-expo'

import { getItem } from 'res/storage'

interface RelationContextProps {
  shareKeyModalOpen: boolean
  relation: Relation
  setShareKeyModal: (value: boolean) => void
  daysOfRelation: number
}

// @ts-ignore
const RelationContext = createContext<RelationContextProps>({})

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

  const daysOfRelation = useMemo(() => {
    const now = new Date()
    const dateOfCreation = new Date(relation.createdAt)
    const differenceInTime = now.getTime() - dateOfCreation.getTime()
    const differenceInDay = Math.round(differenceInTime / (1000 * 3600 * 24))

    return differenceInDay + 1
  }, [])

  const relationContextApi = useMemo(
    () => ({
      shareKeyModalOpen,
      setShareKeyModal,
      relation,
      daysOfRelation,
    }),
    [relation, shareKeyModalOpen, setShareKeyModal, daysOfRelation]
  )

  return (
    <RelationContext.Provider value={relationContextApi}>
      {children}
    </RelationContext.Provider>
  )
}

export { RelationContext, RelationContextProvider }
