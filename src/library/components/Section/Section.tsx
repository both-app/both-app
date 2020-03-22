import React, { FC } from 'react'
import { Text, StyleSheet } from 'react-native'
import { colors } from '../../../res/colors'

interface SectionProps {
  name: string
  style?: any
}

export const Section: FC<SectionProps> = ({ name, style = {} }) => (
  <Text style={{ ...styles.section, ...style }}>{name}</Text>
)

const styles = StyleSheet.create({
  section: {
    color: colors.greyDark,
    fontSize: 25,
    fontWeight: 'bold',
  },
})
