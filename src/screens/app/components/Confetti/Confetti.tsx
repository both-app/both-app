import React, { FC } from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'

import { colors } from 'res/colors'

import ConfettiSVG from '../../../../../assets/confetti.svg'

interface ConfettiProps {
  containerStyle?: ViewStyle
}

export const Confetti: FC<ConfettiProps> = ({ children, ...props }) => {
  const containerStyle = {
    ...styles.container,
    ...(props.containerStyle ? props.containerStyle : {}),
  }

  const circleStyle = {
    ...styles.circle,
    ...styles.circleShadow,
  }

  return (
    <View style={containerStyle}>
      <View style={circleStyle}>{children}</View>
      <ConfettiSVG fill="white" style={{ position: 'absolute' }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 229,
    height: 217,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
    backgroundColor: colors.dark200,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  circleShadow: {
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
})
