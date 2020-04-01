import React, { FC } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import { fonts } from 'res/fonts'
import { colors } from 'res/colors'
import { Avatar } from './Avatar'

interface CounterProps {
  leftUserName: string
  rightUserName: string
  leftPoints: number
  rightPoints: number
}

export const Counter: FC<CounterProps> = ({
  leftUserName,
  rightUserName,
  leftPoints,
  rightPoints,
}) => (
  <View style={styles.countainer}>
    <Avatar firstname={leftUserName[0]} />

    <Text style={styles.counter}>
      {leftPoints} : {rightPoints}
    </Text>
    <Avatar isLoading firstname={rightUserName[1]} />
  </View>
)

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
    fontSize: 40,
    color: colors.white,
  },
})
