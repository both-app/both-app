import React, { FC } from 'react'
import { Text, StyleSheet, View } from 'react-native'

interface InfoProps {
  primary: string
  secondary: string
}

export const Info: FC<InfoProps> = ({ primary, secondary }) => {
  const primaryStyle = {
    ...styles.text,
    ...styles.bold,
  }

  return (
    <View style={styles.container}>
      <Text style={primaryStyle}>{primary}</Text>
      <Text style={styles.text}>{secondary}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
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
