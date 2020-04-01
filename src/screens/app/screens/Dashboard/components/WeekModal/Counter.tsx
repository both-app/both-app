import React, { FC } from 'react'
import { StyleSheet, Text } from 'react-native'

import { colors } from 'res/colors'
import { fonts } from 'res/fonts'

interface CounterProps {
  type: 'winner' | 'loser'
}

export const Counter: FC<CounterProps> = ({ type, children }) => {
  const counterStyle =
    type === 'winner' ? styles.winnerCounter : styles.loserCounter

  return <Text style={counterStyle}>{children}</Text>
}

const styles = StyleSheet.create({
  winnerCounter: {
    fontFamily: fonts['DMSerifDisplay-Regular'],
    color: colors.white,
    fontSize: 48,
    marginTop: 10,
  },
  loserCounter: {
    fontFamily: fonts['DMSerifDisplay-Regular'],
    color: colors.grey200,
    fontSize: 35,
    marginTop: 10,
    marginBottom: 4,
  },
})
