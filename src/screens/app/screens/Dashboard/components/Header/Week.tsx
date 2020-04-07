import React from 'react'
import { Text, StyleSheet } from 'react-native'

import { colors } from 'res/colors'

const getNumberOfWeek = (now) => {
  const firstDayOfYear = new Date(now.getFullYear(), 0, 1)
  // @ts-ignore
  const pastDaysOfYear = (now - firstDayOfYear) / 86400000
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
}

export const Week = () => {
  const now = new Date()

  const todayDate = now.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  return (
    <Text style={styles.week}>
      Semaine {getNumberOfWeek(now)} • {todayDate}
    </Text>
  )
}

const styles = StyleSheet.create({
  week: {
    color: colors.white,
    justifyContent: 'center',
    textTransform: 'capitalize',
    fontSize: 14,
    marginBottom: 16,
  },
})
