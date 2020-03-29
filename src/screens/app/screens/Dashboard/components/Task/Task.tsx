import React from 'react'
import { Text, StyleSheet, View } from 'react-native'

import { CardButton } from 'screens/app/components/CardButton'

import { LightenDarkenColor } from 'res/colors'
import { fonts } from 'res/fonts'

export const Task = ({ color, icon, title, author, points }) => {
  const containerStyle = {
    backgroundColor: color,
  }

  const rightInnerStyle = {
    ...styles.rightInner,
    backgroundColor: LightenDarkenColor(color, -15),
  }

  return (
    <CardButton
      containerStyle={containerStyle}
      icon={icon}
      title={title}
      subtitle={`Par ${author}`}
      rightContent={
        <View style={rightInnerStyle}>
          <Text style={styles.pointsNumber}>{points}</Text>
          <Text style={styles.pointsText}>points</Text>
        </View>
      }
    />
  )
}

const styles = StyleSheet.create({
  rightInner: {
    width: 40,
    height: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointsNumber: {
    fontFamily: fonts['DMSerifDisplay-Regular'],
    fontSize: 26,
    color: 'white',
  },
  pointsText: {
    color: 'white',
    fontSize: 8,
    position: 'relative',
    top: -6,
    fontWeight: '500',
  },
  text: {
    color: 'white',
    fontSize: 14,
  },
  medium: {
    fontWeight: '500',
  },
})
