import React, { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { fonts } from 'res/fonts'
import { colors } from 'res/colors'
import { useT } from 'res/i18n'

import Confetti from '../../../../../../../assets/confetti.svg'

interface CounterProps {
  points: number
}

export const Counter: FC<CounterProps> = ({ points }) => {
  const { t } = useT()

  return (
    <View style={styles.counter}>
      <View style={{ ...styles.circle, ...styles.circleShadow }}>
        <Text style={styles.pointNumber}>{points}</Text>
        <Text style={styles.pointText}>{t('points', { count: points })}</Text>
      </View>
      <Confetti fill="white" style={{ position: 'absolute' }} />
    </View>
  )
}

const styles = StyleSheet.create({
  counter: {
    width: 229,
    height: 217,
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
    backgroundColor: colors.dark200,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  circleShadow: {
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  pointNumber: {
    fontFamily: fonts['DMSerifDisplay-Regular'],
    fontSize: 78,
    color: colors.white,
    position: 'relative',
    top: -5,
  },
  pointText: {
    fontSize: 24,
    color: colors.white,
    fontWeight: '500',
    position: 'relative',
    top: -25,
  },
})
