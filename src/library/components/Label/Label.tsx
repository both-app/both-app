import React, { FC } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import { fonts } from 'res/fonts'
import { colors, Color } from 'res/colors'

interface LabelProps {
  primary: string
  secondary?: string
  color?: Color
}

export const Label: FC<LabelProps> = ({
  primary,
  secondary,
  color = 'dark100',
}) => {
  const textStyle = {
    ...styles.text,
    color: colors[color],
  }

  return (
    <View style={styles.container}>
      <Text style={textStyle}>{primary}</Text>
      {!!secondary && <Text style={textStyle}>{secondary}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    fontFamily: fonts['DMSerifDisplay-Regular'],
    fontSize: 26,
  },
})
