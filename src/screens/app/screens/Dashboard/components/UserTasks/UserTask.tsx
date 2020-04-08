import React, { FC, useContext } from 'react'
import { StyleSheet, Alert } from 'react-native'

import { CardButton } from 'library/components/CardButton'

import { colors, lightenDarkenColor } from 'res/colors'

import { TaskContext } from 'screens/app/contexts/Task.context'
import { UsersContext } from 'screens/app/contexts/Users.context'
import { CategoryContext } from 'screens/app/contexts/Category.context'
import { UserTaskContext } from 'screens/app/contexts/UserTask.context'
import { useT } from 'res/i18n'

interface UserTaskProps {
  userTask: UserTask
}

export const UserTask: FC<UserTaskProps> = ({ userTask }) => {
  const { t } = useT()
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
    Alert.alert(t('alert:deleteUserTask:title'), '', [
      {
        text: t('alert:deleteUserTask:noButton'),
        style: 'cancel',
      },
      {
        text: t('alert:deleteUserTask:yesButton'),
        style: 'destructive',
        onPress: () => deleteUserTask(userTask.id),
      },
    ])
  }

  return (
    <CardButton
      emoji={task.emoji}
      title={task.name}
      subtitle={t('app:screen:dashboard:userTask:subtitle', {
        firstName: user.firstName,
      })}
      onLongPress={handleOnLongPress}
      points={task.points}
      activeBackgroundColor={lightenDarkenColor(category.color, 10)}
      activeTextColor={colors.white}
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
