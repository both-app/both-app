import React, { useContext, useMemo } from 'react'
import { useNavigation } from '@react-navigation/native'

import { RelationContext } from 'screens/app/contexts/Relation.context'
import { UsersContext } from 'screens/app/contexts/Users.context'
import { UserTaskContext } from 'screens/app/contexts/UserTask.context'
import { TaskContext } from 'screens/app/contexts/Task.context'

import { Body } from './Body'

export const RelationInfo = () => {
  const navigation = useNavigation()
  const { me, partner } = useContext(UsersContext)
  const { setShareKeyModal } = useContext(RelationContext)
  const { getUserTasksByUserId, allIds } = useContext(UserTaskContext)
  const { getTaskById } = useContext(TaskContext)

  const goToTheProfilPage = () => navigation.navigate('Profil')

  const openShareKeyModal = () => {
    if (partner.id) {
      return
    }

    return setShareKeyModal(true)
  }

  const getPoints = (userId: string) =>
    getUserTasksByUserId(userId).reduce((acc, { taskId }) => {
      const task = getTaskById(taskId)
      return acc + task.points
    }, 0)

  const leftPoints = useMemo(() => getPoints(me.id), [allIds])
  const rightPoints = useMemo(() => getPoints(partner.id), [allIds])

  return (
    <Body
      leftFirstName="Mathieu"
      rightFirstName="Charlotte"
      leftPoints={leftPoints}
      rightPoints={rightPoints}
      onLeftAction={goToTheProfilPage}
      onRightAction={openShareKeyModal}
    />
  )
}
