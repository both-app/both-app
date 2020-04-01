import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native'

import { Icon, IconProps } from '../Icon'
import { Color, colors } from 'res/colors'

interface MinimalButtonProps extends IconProps {
  onAction?: () => void
  iconColor?: Color
  buttonStyle?: any
}

export const MinimalButton: FC<MinimalButtonProps> = ({
  onAction,
  buttonStyle,
  ...props
}) => {
  const handleOnPress = () => {
    onAction && onAction()
  }

  return (
    <TouchableOpacity onPress={handleOnPress} style={buttonStyle}>
      <Icon style={{ color: colors[props.iconColor] }} {...props} />
    </TouchableOpacity>
  )
}