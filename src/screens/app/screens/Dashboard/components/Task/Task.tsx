import React from 'react'
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native'

import { LightenDarkenColor } from 'res/colors'
import { fonts } from 'res/fonts'

export const Task = ({ color, icon, title, author, points }) => {
  const containerStyle = {
    ...styles.container,
    backgroundColor: color,
  }

  const rightInnerStyle = {
    ...styles.rightInner,
    backgroundColor: LightenDarkenColor(color, -15),
  }

  return (
    <TouchableOpacity style={containerStyle}>
      <View style={styles.leftInner}>
        <Text style={styles.iconTask}>{icon}</Text>
        <View style={styles.textsTask}>
          <Text style={{ ...styles.text, ...styles.medium }}>{title}</Text>
          <Text style={{ ...styles.text, ...styles.authorTask }}>
            Par {author}
          </Text>
        </View>
      </View>

      <View style={rightInnerStyle}>
        <Text style={styles.pointsNumber}>{points}</Text>
        <Text style={styles.pointsText}>points</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 17,
    paddingBottom: 17,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 8,
    marginTop: 8,
    maxHeight: 64,
  },
  leftInner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconTask: {
    fontSize: 26,
  },
  textsTask: {
    marginLeft: 15,
  },
  authorTask: {
    opacity: 0.75,
  },
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
