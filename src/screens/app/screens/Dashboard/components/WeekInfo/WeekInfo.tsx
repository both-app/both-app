import React from 'react'
import { Text, StyleSheet } from 'react-native'

import { colors } from 'res/colors'
import { useT } from 'res/i18n'

const getNumberOfWeek = (now: Date) => {
  const firstDayOfYear = new Date(now.getFullYear(), 0, 1)
  // @ts-ignore
  const pastDaysOfYear = (now - firstDayOfYear) / 86400000
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
}

export const WeekInfo = () => {
  const { t, locale } = useT()
  const now = new Date()

  const todayDate = now.toLocaleDateString(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  return (
    <Text style={styles.week}>
      {t('week')} {getNumberOfWeek(now)} • {todayDate}
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
