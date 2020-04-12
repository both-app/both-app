import React from 'react'
import { Text, StyleSheet } from 'react-native'
import getWeek from 'date-fns/getWeek'

import { colors } from 'res/colors'
import { useT } from 'res/i18n'

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
      {t('week')} {getWeek(now)} • {todayDate}
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
