import React, { FC, useContext } from 'react'
import { StyleSheet, View, Text } from 'react-native'

import { CardButton } from 'library/components/CardButton'

import { colors } from 'res/colors'

import { Point } from 'library/components/Point'

import { TaskContext } from 'screens/app/contexts/Task.context'
import { UsersContext } from 'screens/app/contexts/Users.context'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { DeleteAction } from './DeleteAction'

interface UserTaskProps {
  userTask: UserTask
}

export const UserTask: FC<UserTaskProps> = ({ userTask }) => {
  const { me } = useContext(UsersContext)
  const { getTaskById } = useContext(TaskContext)
  const { getUserById } = useContext(UsersContext)

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

  const renderRightActions = (progress) => {
    return <DeleteAction progress={progress} userTask={userTask} />
  }

  return (
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
                  : colors.warning,
              }}
            />
            <Text style={styles.author}>{user.firstName}</Text>
          </View>
        }
        containerStyle={{
          marginTop: 8,
          marginHorizontal: 24,
        }}
        rightContent={<Point points={userTask.points} />}
        disabled
      />
    </Swipeable>
  )
}

const styles = StyleSheet.create({
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
