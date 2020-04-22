import React, { FC, useContext } from 'react'
import { StyleSheet, Alert } from 'react-native'
import * as Haptics from 'expo-haptics'

import { CardButton } from 'library/components/CardButton'

import { colors, lightenDarkenColor } from 'res/colors'
import { useT } from 'res/i18n'

import { Point } from 'library/components/Point'

import { TaskContext } from 'screens/app/contexts/Task.context'
import { UsersContext } from 'screens/app/contexts/Users.context'
import { CategoryContext } from 'screens/app/contexts/Category.context'
import { UserTaskContext } from 'screens/app/contexts/UserTask.context'
import { UserScoreContext } from 'screens/app/contexts/UserScore.context'

interface UserTaskProps {
  userTask: UserTask
}

export const UserTask: FC<UserTaskProps> = ({ userTask }) => {
  const { t } = useT()
  const { me } = useContext(UsersContext)
  const { getTaskById } = useContext(TaskContext)
  const { getUserById } = useContext(UsersContext)
  const { getCategoryById } = useContext(CategoryContext)
  const { deleteUserTask } = useContext(UserTaskContext)
  const { fetchUserScore } = useContext(UserScoreContext)

  const task = getTaskById(userTask.taskId)
  const category = getCategoryById(task.categoryId)
  const user = getUserById(userTask.userId)

  if (!user || !category || !task) {
    return null
  }

  const isDeletable =
    userTask.taskId !== 'create_both' &&
    userTask.taskId !== 'join_both' &&
    userTask.userId === me.id

  const handleOnLongPress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

    Alert.alert(
      t('alert:deleteUserTask:title'),
      t('alert:deleteUserTask:description', {
        count: userTask.points,
        points: userTask.points,
        firstName: me.firstName,
      }),
      [
        {
          text: t('alert:deleteUserTask:noButton'),
          style: 'cancel',
        },
        {
          text: t('alert:deleteUserTask:yesButton'),
          style: 'destructive',
          onPress: async () => {
            await deleteUserTask(userTask.id)
            await fetchUserScore()
          },
        },
      ]
    )
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
      rightContent={<Point points={userTask.points} />}
      disabled={!isDeletable}
    />
  )
}

const styles = StyleSheet.create({
  cardText: {
    color: colors.white,
  },
})
