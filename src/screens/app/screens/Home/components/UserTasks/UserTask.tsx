import React, { FC, useContext } from 'react'
import { StyleSheet, Animated, Text } from 'react-native'
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
import { TouchableOpacity } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { IconName, Icon } from 'library/components/Icon'

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

  const onDeletePress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    await deleteUserTask(userTask.id)
    await fetchUserScore()
  }

  const renderRightActions = (progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [140, 0],
    })
    return (
      <Animated.View style={{ transform: [{ translateX: trans }] }}>
        <TouchableOpacity style={styles.deleteCard} onPress={onDeletePress}>
          <Icon
            iconName={'trash' as IconName}
            width={24}
            height={24}
            style={styles.trashIcon}
          />
          <Text style={styles.deleteText}>{t('app:screen:home:delete')}</Text>
        </TouchableOpacity>
      </Animated.View>
    )
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
  deleteCard: {
    minHeight: 64,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 24,
    marginTop: 8,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.skin200,
  },
  trashIcon: {
    color: colors.crtical,
  },
  deleteText: {
    color: colors.crtical,
    fontWeight: '500',
    fontSize: 14,
    marginLeft: 8,
  },
})
