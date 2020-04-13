import React, { useContext, useMemo } from 'react'

import { UsersContext } from 'screens/app/contexts/Users.context'
import { UserTaskContext } from 'screens/app/contexts/UserTask.context'
import { TaskContext } from 'screens/app/contexts/Task.context'

import { Body } from './Body'

export const RelationInfo = () => {
  const { me, partner } = useContext(UsersContext)
  const { getUserTasksByUserId, allIds } = useContext(UserTaskContext)
  const { getTaskById } = useContext(TaskContext)

  const getPoints = (userId: string) =>
    getUserTasksByUserId(userId).reduce((acc, { taskId }) => {
      const task = getTaskById(taskId)
      return acc + task.points
    }, 0)

  const leftPoints = useMemo(() => getPoints(me.id), [allIds])
  const rightPoints = useMemo(() => getPoints(partner.id), [allIds])

  return (
    <Body
      leftFirstName={me.firstName}
      rightFirstName={partner.firstName || '⌛️'}
      leftPoints={leftPoints}
      rightPoints={rightPoints}
    />
  )
}
