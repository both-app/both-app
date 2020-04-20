import React, { FC } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import { fonts } from 'res/fonts'
import { colors } from 'res/colors'

interface LabelProps {
  primary: string
  secondary?: string
}

export const Label: FC<LabelProps> = ({ primary, secondary }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{primary}</Text>
    {!!secondary && <Text style={styles.text}>{secondary}</Text>}
  </View>
)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    fontFamily: fonts['DMSerifDisplay-Regular'],
    fontSize: 26,
    color: colors.dark100,
  },
})
