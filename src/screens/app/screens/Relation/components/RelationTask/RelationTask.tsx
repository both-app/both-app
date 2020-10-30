import React, { FC, ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import Swipeable, {
  SwipeableProperties,
} from 'react-native-gesture-handler/Swipeable'

import { colors } from 'res/colors'

import { CardButton } from 'library/components/CardButton'
import { SwipeAction } from 'library/components/SwipeAction'

import { Title } from './Title'
import { Subtitle } from './Subtitle'

interface RelationTaskProps {
  title: string
  subtitle: string
  emoji: string
  isDone: boolean
  onAction?: () => void
  rightContent?: ReactNode
}

export const RelationTask: FC<RelationTaskProps> = ({
  isDone,
  title,
  subtitle,
  emoji,
  onAction,
  rightContent,
}) => {
  const renderRightActions: SwipeableProperties['renderRightActions'] = (
    progress
  ) => (
    <SwipeAction
      progress={progress}
      color="dark200"
      iconName="archive"
      onAction={console.log}
    >
      Archiver
    </SwipeAction>
  )

  return (
    <View style={styles.container}>
      <Swipeable renderRightActions={renderRightActions}>
        <CardButton
          emoji={emoji}
          containerStyle={{
            ...(isDone ? styles.isDone : {}),
          }}
          title={<Title isDone={isDone}>{title}</Title>}
          subtitle={<Subtitle isDone={isDone}>{subtitle}</Subtitle>}
          onAction={onAction}
          rightContent={rightContent}
        />
      </Swipeable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  isDone: {
    backgroundColor: colors.highlight200,
    borderWidth: 2,
    borderColor: colors.highlight100,
  },
})
