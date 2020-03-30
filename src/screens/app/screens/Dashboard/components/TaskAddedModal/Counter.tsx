import React, { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Confetti from '../../../../../../../assets/confetti.svg'
import { fonts } from 'res/fonts'

interface CounterProps {
  points: number
}

export const Counter: FC<CounterProps> = ({ points }) => (
  <View style={styles.counter}>
    <View style={{ ...styles.circle, ...styles.circleShadow }}>
      <Text style={styles.pointNumber}>{points}</Text>
      <Text style={styles.pointText}>points</Text>
    </View>
    <Confetti fill="white" style={{ position: 'absolute' }} />
  </View>
)

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
    backgroundColor: '#0A1D2B',
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
    color: 'white',
    position: 'relative',
    top: -5,
  },
  pointText: {
    fontSize: 24,
    color: 'white',
    fontWeight: '500',
    position: 'relative',
    top: -25,
  },
})
