import React, { FC, useContext } from 'react'
import { StyleSheet, Alert } from 'react-native'

import { CardButton } from 'library/components/CardButton'

import { colors, lightenDarkenColor } from 'res/colors'
import { useT } from 'res/i18n'

import { Point } from 'library/components/Point'

import { TaskContext } from 'screens/app/contexts/Task.context'
import { UsersContext } from 'screens/app/contexts/Users.context'
import { CategoryContext } from 'screens/app/contexts/Category.context'
import { UserTaskContext } from 'screens/app/contexts/UserTask.context'

interface UserTaskProps {
  userTask: UserTask
}

export const UserTask: FC<UserTaskProps> = ({ userTask }) => {
  const { t } = useT()
  const { getTaskById, getPoints } = useContext(TaskContext)
  const { getUserById } = useContext(UsersContext)
  const { getCategoryById } = useContext(CategoryContext)
  const { deleteUserTask } = useContext(UserTaskContext)

  const task = getTaskById(userTask.taskId)
  const category = getCategoryById(task.categoryId)
  const user = getUserById(userTask.userId)

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
      activeBackgroundColor={lightenDarkenColor(category.color, 10)}
      activeTextColor={colors.white}
      containerStyle={{
        backgroundColor: category.color,
      }}
      textStyle={styles.cardText}
      rightContent={<Point points={getPoints(task.id)} />}
    />
  )
}

const styles = StyleSheet.create({
  cardText: {
    color: colors.white,
  },
})
