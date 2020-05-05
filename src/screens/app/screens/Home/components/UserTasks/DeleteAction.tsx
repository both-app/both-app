import React, { FC, useContext } from 'react'
import { Animated, Text, StyleSheet } from 'react-native'

import { TouchableOpacity } from 'react-native-gesture-handler'
import * as Haptics from 'expo-haptics'

import { t } from 'i18n-js'
import { colors } from 'res/colors'

import { UserTaskContext } from 'screens/app/contexts/UserTask.context'
import { UserScoreContext } from 'screens/app/contexts/UserScore.context'

import { Icon } from 'library/components/Icon'

interface DeleActionProps {
  progress: any
  userTask: UserTask
}

export const DeleteAction: FC<DeleActionProps> = ({ progress, userTask }) => {
  const { deleteUserTask } = useContext(UserTaskContext)
  const { fetchUserScore } = useContext(UserScoreContext)

  const onPress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    await deleteUserTask(userTask.id)
    await fetchUserScore()
  }
  const trans = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [140, 0],
  })
  return (
    <Animated.View style={{ transform: [{ translateX: trans }] }}>
      <TouchableOpacity style={styles.deleteCard} onPress={onPress}>
        <Icon
          iconName={'trash'}
          width={24}
          height={24}
          style={styles.trashIcon}
        />
        <Text style={styles.deleteText}>{t('app:screen:home:delete')}</Text>
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
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
    color: colors.critical,
  },
  deleteText: {
    color: colors.critical,
    fontWeight: '500',
    fontSize: 14,
    marginLeft: 8,
  },
})
