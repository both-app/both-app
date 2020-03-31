import React from 'react'
import { StyleSheet } from 'react-native'

import { CardButton } from 'library/components/CardButton'

import { colors } from 'res/colors'

export const Task = ({ color, icon, title, author, points }) => {
  const containerStyle = {
    backgroundColor: color,
  }

  return (
    <CardButton
      emoji={icon}
      title={title}
      subtitle={`Par ${author}`}
      points={points}
      containerStyle={containerStyle}
      textStyle={styles.cardText}
      disabled
    />
  )
}

const styles = StyleSheet.create({
  cardText: {
    color: colors.white,
  },
})
