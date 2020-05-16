import React, { FC, memo } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { colors } from 'res/colors'
import { useT } from 'res/i18n'

import { CardButton } from 'library/components/CardButton'
import { Point } from 'library/components/Point'

interface TaskPreviewProps {
  emoji: string
  taskName: string
  points?: number
}

export const TaskPreview: FC<TaskPreviewProps> = memo(
  ({ emoji, taskName, points = 0 }) => {
    const { t } = useT()

    return (
      <View style={styles.bottom}>
        <View style={{ paddingHorizontal: 24 }}>
          <Text style={styles.newTask}>
            {t('app:screen:createTask:taskPreview:title')}
          </Text>
          <CardButton
            emoji={emoji}
            title={taskName}
            subtitle={t('app:screen:createTask:taskPreview:button:subtitle')}
            disabled
            rightContent={<Point points={points} />}
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
