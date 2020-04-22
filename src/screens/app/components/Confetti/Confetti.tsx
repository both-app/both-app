import React, { FC } from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'

import ConfettiSVG from '../../../../../assets/confetti.svg'

interface ConfettiProps {
  containerStyle?: ViewStyle
}

export const Confetti: FC<ConfettiProps> = ({ children, ...props }) => {
  const containerStyle = {
    ...styles.container,
    ...(props.containerStyle ? props.containerStyle : {}),
  }

  const childrenContainerStyle = {
    ...styles.childrenContainer,
    ...styles.shadow,
  }

  return (
    <View style={containerStyle}>
      <View style={childrenContainerStyle}>{children}</View>
      <ConfettiSVG fill="white" style={styles.svg} />
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
  childrenContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  svg: {
    position: 'absolute',
  },
  shadow: {
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
