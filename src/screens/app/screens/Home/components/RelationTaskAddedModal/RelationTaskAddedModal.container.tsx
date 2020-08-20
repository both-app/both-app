import React, { useContext, useEffect } from 'react'
import * as Haptics from 'expo-haptics'

import { UsersContext } from 'screens/app/contexts/Users.context'
import { RelationTaskAddedModalContext } from 'screens/app/contexts/RelationTaskAddedModal.context'

import { RelationTaskAddedModal } from './RelationTaskAddedModal'

export const RelationTaskAddedModalContainer = () => {
  const { partner } = useContext(UsersContext)
  const { closeRelationTaskAddedModal, modalIsOpen } = useContext(
    RelationTaskAddedModalContext
  )

  useEffect(() => {
    if (modalIsOpen) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    }
  }, [modalIsOpen])

  return (
    <RelationTaskAddedModal
      visible={modalIsOpen}
      userFirstName={partner.firstName}
      onAction={closeRelationTaskAddedModal}
      onClose={closeRelationTaskAddedModal}
    />
  )
}
