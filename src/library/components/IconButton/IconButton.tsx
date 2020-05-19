import React, { FC } from 'react'
import { TouchableOpacity, StyleSheet, Platform } from 'react-native'
import * as Haptics from 'expo-haptics'

import { Color, colors } from 'res/colors'

import { Icon, IconProps } from '../Icon'

interface IconButtonProps extends IconProps {
  onAction: () => void
  buttonStyle?: any
  buttonColor?: Color
  size: number
  radius?: number
  iconSize?: number
  iconStyle?: any
  iconColor?: Color
}

export const IconButton: FC<IconButtonProps> = ({ onAction, ...props }) => {
  const handleOnPress = async () => {
    if (Platform.OS === 'ios') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }

    return onAction()
  }

  const buttonStyle = {
    width: props.size,
    height: props.size,
    borderRadius: props.radius || 19.2,
    ...(props.buttonColor
      ? { backgroundColor: colors[props.buttonColor] }
      : {}),
    ...styles.button,
    ...props.buttonStyle,
  }

  const iconStyle = {
    ...(props.iconColor ? { color: colors[props.iconColor] } : {}),
    ...props.iconStyle,
  }

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={handleOnPress}
      activeOpacity={0.9}
    >
      <Icon
        style={iconStyle}
        width={props.iconSize || 30}
        height={props.iconSize || 30}
        {...props}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
