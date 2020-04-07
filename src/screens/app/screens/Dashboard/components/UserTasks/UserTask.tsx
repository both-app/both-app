import React, { FC, useContext } from 'react'
import { StyleSheet, Alert } from 'react-native'

import { CardButton } from 'library/components/CardButton'

import { colors } from 'res/colors'

import { TaskContext } from 'screens/app/contexts/Task.context'
import { UsersContext } from 'screens/app/contexts/Users.context'
import { CategoryContext } from 'screens/app/contexts/Category.context'
import { UserTaskContext } from 'screens/app/contexts/UserTask.context'

interface UserTaskProps {
  userTask: UserTask
}

export const UserTask: FC<UserTaskProps> = ({ userTask }) => {
  const { getTaskById } = useContext(TaskContext)
  const { getUserById } = useContext(UsersContext)
  const { getCategoryById } = useContext(CategoryContext)
  const { deleteUserTask } = useContext(UserTaskContext)

  const task = getTaskById(userTask?.taskId)
  const category = getCategoryById(task?.categoryId)
  const user = getUserById(userTask.userId)

  if (!userTask || !task || !category || !user) {
    return null
  }

  const handleOnLongPress = () => {
    Alert.alert('Vous voulez supprimer la tâche?', '', [
      {
        text: 'Non',
        style: 'cancel',
      },
      {
        text: 'Oui',
        style: 'destructive',
        onPress: () => deleteUserTask(userTask.id),
      },
    ])
  }

  return (
    <CardButton
      emoji={task.emoji}
      title={task.name}
      subtitle={`Par ${user.firstName}`}
      onLongPress={handleOnLongPress}
      points={task.points}
      containerStyle={{
        backgroundColor: category.color,
      }}
      textStyle={styles.cardText}
    />
  )
}

const styles = StyleSheet.create({
  cardText: {
    color: colors.white,
  },
})
