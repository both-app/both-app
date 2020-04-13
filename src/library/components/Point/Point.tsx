import React, { FC } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import { fonts } from 'res/fonts'
import { colors } from 'res/colors'
import { useT } from 'res/i18n'

export interface PointProps {
  points: number | string
}

export const Point: FC<PointProps> = ({ points }) => {
  const { t } = useT()

  const pointsNumber = Number(points)

  const containerStyle = {
    ...styles.container,
    width: points.toString().length > 1 ? 52 : 40,
    height: 40,
  }

  return (
    <View style={containerStyle}>
      <Text style={styles.pointsNumber}>{points}</Text>
      <Text style={styles.pointsText}>
        {t('points', { count: pointsNumber || 2 })}
      </Text>
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
