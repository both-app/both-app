import React from 'react'
import { Text, StyleSheet } from 'react-native'

import { colors } from 'res/colors'
import { useT } from 'res/i18n'
import { getWeekNumber } from 'res/date'

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
      {t('week')} {getWeekNumber(now)} • {todayDate}
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
