import React, { FC } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import { fonts } from 'res/fonts'
import { colors } from 'res/colors'
import { useT } from 'res/i18n'
import { Confetti } from 'screens/app/components/Confetti'

interface CounterProps {
  points: number
}

export const Counter: FC<CounterProps> = ({ points }) => {
  const { t } = useT()

  return (
    <Confetti containerStyle={styles.container}>
      <View style={styles.circle}>
        <Text style={styles.pointNumber}>{points}</Text>
        <Text style={styles.pointText}>{t('points', { count: points })}</Text>
      </View>
    </Confetti>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
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
  circle: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
    backgroundColor: colors.dark200,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
})
