import React, { FC, useEffect } from 'react'
import { Text, StyleSheet, View, Vibration } from 'react-native'
import { Color, colors } from 'res/colors'

interface InfoProps {
  primary: string
  secondary: string
  hide?: boolean
  color: Color
}

export const Info: FC<InfoProps> = ({ primary, secondary, hide, color }) => {
  const containerStyle = {
    ...styles.container,
    ...(hide ? { opacity: 0 } : { opacity: 1 }),
  }

  const primaryStyle = {
    ...styles.text,
    ...styles.bold,
    color: colors[color],
  }

  const secondaryStyle = {
    ...styles.text,
    color: colors[color],
  }

  useEffect(() => {
    if (!hide) {
      // TODO Improve the vibration
      Vibration.vibrate(1)
    }
  }, [hide])

  return (
    <View style={containerStyle}>
      <Text style={primaryStyle}>{primary}</Text>
      <Text style={secondaryStyle}>{secondary}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
  },
  bold: {
    fontWeight: 'bold',
  },
})
