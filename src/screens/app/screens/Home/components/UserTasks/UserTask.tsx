import React, { FC, useContext } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import * as Haptics from 'expo-haptics'
import Swipeable, {
  SwipeableProperties,
} from 'react-native-gesture-handler/Swipeable'

import { colors } from 'res/colors'
import { useT } from 'res/i18n'

import { Point } from 'library/components/Point'
import { CardButton } from 'library/components/CardButton'
import { SwipeAction } from 'library/components/SwipeAction'

import { TaskContext } from 'screens/app/contexts/Task.context'
import { UsersContext } from 'screens/app/contexts/Users.context'
import { CategoryContext } from 'screens/app/contexts/Category.context'
import { UserTaskContext } from 'screens/app/contexts/UserTask.context'
import { UserScoreContext } from 'screens/app/contexts/UserScore.context'

interface UserTaskProps {
  userTask: UserTask
}

export const UserTask: FC<UserTaskProps> = ({ userTask }) => {
  const { me } = useContext(UsersContext)
  const { t } = useT()
  const { getTaskById } = useContext(TaskContext)
  const { getUserById } = useContext(UsersContext)
  const { deleteUserTask } = useContext(UserTaskContext)
  const { fetchUserScore } = useContext(UserScoreContext)

  const task = getTaskById(userTask.taskId)
  const user = getUserById(userTask.userId)

  if (!user || !task) {
    return null
  }

  const isMyTask = user.id === me.id
  const isDeletable =
    userTask.taskId !== 'create_both' &&
    userTask.taskId !== 'join_both' &&
    userTask.userId === me.id

  const onDelete = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

    await deleteUserTask(userTask.id)
    await fetchUserScore()
  }

  const renderRightActions: SwipeableProperties['renderRightActions'] = (
    progress
  ) => (
    <SwipeAction
      progress={progress}
      color="critical"
      iconName="trash"
      onAction={onDelete}
    >
      {t('app:screen:home:delete')}
    </SwipeAction>
  )

  return (
    <View style={styles.container}>
      <Swipeable renderRightActions={isDeletable && renderRightActions}>
        <CardButton
          emoji={task.emoji}
          title={task.name}
          subtitle={
            <View style={styles.subtitleContainer}>
              <View
                style={{
                  ...styles.badge,
                  backgroundColor: isMyTask
                    ? colors.highlight100
                    : colors.red100,
                }}
              />
              <Text style={styles.author}>{user.firstName}</Text>
            </View>
          }
          containerStyle={{
            marginHorizontal: 24,
          }}
          rightContent={<Point points={userTask.points} />}
          disabled={!isDeletable}
        />
      </Swipeable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    width: 10,
    height: 10,
    borderRadius: 4,
    marginRight: 4,
    display: 'flex',
  },
  author: {
    color: colors.dark200,
    opacity: 0.75,
    textTransform: 'capitalize',
  },
})
