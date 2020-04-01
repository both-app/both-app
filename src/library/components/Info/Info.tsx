import React, { FC, useEffect } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import * as Haptics from 'expo-haptics'

import { Color, colors } from 'res/colors'

interface InfoProps {
  primary: string
  secondary: string
  hide?: boolean
  withVibration?: boolean
  color: Color
}

export const Info: FC<InfoProps> = ({
  primary,
  secondary,
  hide,
  color,
  withVibration,
}) => {
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
    const hapticsFeedback = async () => {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
    }

    if (!hide && withVibration) {
      hapticsFeedback()
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
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
})
