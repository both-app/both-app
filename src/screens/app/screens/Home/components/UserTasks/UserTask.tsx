import React, { FC, useContext } from 'react'
import { StyleSheet } from 'react-native'

import { CardButton } from 'library/components/CardButton'

import { colors, lightenDarkenColor } from 'res/colors'
import { useT } from 'res/i18n'

import { Point } from 'library/components/Point'

import { TaskContext } from 'screens/app/contexts/Task.context'
import { UsersContext } from 'screens/app/contexts/Users.context'
import { CategoryContext } from 'screens/app/contexts/Category.context'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { DeleteAction } from './DeleteAction'

interface UserTaskProps {
  userTask: UserTask
}

export const UserTask: FC<UserTaskProps> = ({ userTask }) => {
  const { t } = useT()
  const { me } = useContext(UsersContext)
  const { getTaskById } = useContext(TaskContext)
  const { getUserById } = useContext(UsersContext)
  const { getCategoryById } = useContext(CategoryContext)

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

  const renderRightActions = (progress) => {
    return <DeleteAction progress={progress} userTask={userTask} />
  }

  return (
    <Swipeable renderRightActions={isDeletable && renderRightActions}>
      <CardButton
        emoji={task.emoji}
        title={task.name}
        subtitle={t('app:screen:home:userTask:subtitle', {
          firstName: user.firstName,
        })}
        activeBackgroundColor={lightenDarkenColor(category.color, 10)}
        activeTextColor={colors.white}
        containerStyle={{
          backgroundColor: category.color,
          marginTop: 8,
          marginHorizontal: 24,
        }}
        textStyle={styles.cardText}
        rightContent={<Point points={userTask.points} />}
        disabled={!isDeletable}
      />
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  cardText: {
    color: colors.white,
  },
})
