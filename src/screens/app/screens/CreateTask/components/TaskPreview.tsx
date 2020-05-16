import React, { FC, memo, useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { colors } from 'res/colors'
import { useT } from 'res/i18n'

import { CardButton } from 'library/components/CardButton'
import { Point } from 'library/components/Point'

import { TaskContext } from 'screens/app/contexts/Task.context'

interface TaskPreviewProps {
  emoji: string
  name: string
  difficulties: TaskDifficulty[]
}

export const TaskPreview: FC<TaskPreviewProps> = memo(
  ({ emoji, name, difficulties }) => {
    const { t } = useT()
    const { getPointsFromDifficulties } = useContext(TaskContext)

    const isTaskWithDifficulties = difficulties.length > 1
    const points = getPointsFromDifficulties(difficulties) || '?'

    return (
      <View style={styles.bottom}>
        <View style={{ paddingHorizontal: 24 }}>
          <Text style={styles.newTask}>
            {t('app:screen:createTask:taskPreview:title')}
          </Text>
          <CardButton
            emoji={emoji}
            title={name}
            subtitle={t('levelOfDifficulity', { count: difficulties.length })}
            disabled
            rightContent={
              <Point
                points={points}
                shape={isTaskWithDifficulties ? 'rectangle' : 'circle'}
              />
            }
          />
        </View>
      </View>
    )
  }
)

const styles = StyleSheet.create({
  bottom: {
    display: 'flex',
    borderTopWidth: 1,
    borderTopColor: colors.skin200,
    paddingTop: 8,
  },
  newTask: {
    color: colors.dark200,
    fontWeight: '700',
    marginBottom: 8,
  },
})
