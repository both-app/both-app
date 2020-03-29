import React, { FC } from 'react'
import { TouchableOpacity, Vibration } from 'react-native'

import { Icon, IconProps } from '../Icon'

interface IconButtonProps extends IconProps {
  onAction?: () => void
  buttonStyle: any
  style: any
}

export const IconButton: FC<IconButtonProps> = ({
  onAction,
  buttonStyle,
  ...props
}) => {
  const handleOnPress = () => {
    Vibration.vibrate(0.05)
    onAction && onAction()
  }

  return (
    <TouchableOpacity onPress={handleOnPress} style={buttonStyle}>
      <Icon {...props} />
    </TouchableOpacity>
  )
}
