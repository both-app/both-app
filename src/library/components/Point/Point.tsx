import React, { FC } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import { fonts } from 'res/fonts'
import { colors } from 'res/colors'
import { useT } from 'res/i18n'

export interface PointProps {
  points: number
  shape?: 'circle' | 'rectangle'
}

export const Point: FC<PointProps> = ({ points = 0, shape = 'circle' }) => {
  const { t } = useT()

  const containerStyle = {
    ...styles.container,
    width: shape === 'circle' ? 40 : 52,
    height: 40,
  }

  return (
    <View style={containerStyle}>
      <Text style={styles.pointsNumber}>{points}</Text>
      <Text style={styles.pointsText}>{t('points', { count: points })}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  pointsNumber: {
    fontFamily: fonts['DMSerifDisplay-Regular'],
    fontSize: 26,
    color: colors.white,
  },
  pointsText: {
    color: colors.white,
    fontSize: 8,
    position: 'relative',
    top: -6,
    fontWeight: '500',
  },
})
