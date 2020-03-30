import React, { FC } from 'react'
import { Text, StyleSheet, View, ViewStyle } from 'react-native'

interface InfoProps {
  primary: string
  secondary: string
  containerStyle?: ViewStyle
}

export const Info: FC<InfoProps> = ({ primary, secondary, containerStyle }) => {
  const primaryStyle = {
    ...styles.text,
    ...styles.bold,
  }

  return (
    <View style={{ ...styles.container, ...containerStyle }}>
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
    color: 'white',
    fontSize: 14,
  },
  bold: {
    fontWeight: 'bold',
  },
})
