import React, { FC, useEffect, useMemo } from 'react'
import { Text, StyleSheet, View, Vibration } from 'react-native'

import { colors } from 'res/colors'

interface ErrorProps {
  primary: string
  secondary: string
  hideError: boolean
}

export const Error: FC<ErrorProps> = ({ primary, secondary, hideError }) => {
  const containerStyle = useMemo(
    () => ({
      ...styles.container,
      ...(hideError ? { opacity: 0 } : { opacity: 1 }),
    }),
    [hideError]
  )

  const primaryStyle = useMemo(() => ({ ...styles.text, ...styles.bold }), [])

  useEffect(() => {
    if (!hideError) {
      // TODO Improve the vibration
      Vibration.vibrate(1)
    }
  }, [hideError])

  return (
    <View style={containerStyle}>
      <Text style={primaryStyle}>{primary}</Text>
      <Text style={styles.text}>{secondary}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    color: colors.pink,
  },
  bold: {
    fontWeight: 'bold',
  },
})
