import React, { FC } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import { fonts } from 'res/fonts'
import { colors } from 'res/colors'

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
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>{leftUserName[0] || ''}</Text>
    </View>
    <Text style={styles.counter}>
      {leftPoints} : {rightPoints}
    </Text>
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>{rightUserName[0] || ''}</Text>
    </View>
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
    color: 'white',
  },
  avatar: {
    width: 48,
    height: 48,
    backgroundColor: colors.skin100,
    borderWidth: 1,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: fonts['DMSerifDisplay-Regular'],
    fontSize: 26,
  },
})
