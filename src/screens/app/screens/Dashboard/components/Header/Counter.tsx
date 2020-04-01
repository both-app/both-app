import React, { FC } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import { Avatar } from 'library/components/Avatar'

import { fonts } from 'res/fonts'
import { colors } from 'res/colors'
import { useCounter } from './useCounter'

interface CounterProps {
  leftUserName: string
  rightUserName: string
  leftPoints: number
  rightPoints: number
}

export const Counter: FC<CounterProps> = ({
  leftUserName,
  rightUserName,
  ...props
}) => {
  const leftPoints = useCounter({ value: props.leftPoints, timeout: 150 })
  const rightPoints = useCounter({ value: props.rightPoints, timeout: 150 })

  return (
    <View style={styles.countainer}>
      <Avatar firstname={leftUserName[0]} size="small" />

      <Text>
        <Text style={{ ...styles.counter, ...styles.left }}>{leftPoints}</Text>
        <Text style={styles.counter}> : </Text>
        <Text style={{ ...styles.counter, ...styles.right }}>
          {rightPoints}
        </Text>
      </Text>

      <Avatar isLoading firstname="⏳" size="small" />
    </View>
  )
}

const styles = StyleSheet.create({
  countainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  counter: {
    fontFamily: fonts['DMSerifDisplay-Regular'],
    fontSize: 48,
    color: colors.white,
  },
  left: {
    alignItems: 'flex-end',
  },
  right: {
    alignItems: 'flex-start',
  },
})
