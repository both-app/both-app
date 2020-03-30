import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native'

import { Icon, IconProps } from '../Icon'

interface IconButtonProps extends IconProps {
  onAction?: () => void
  iconStyle?: any
  buttonStyle?: any
}

export const IconButton: FC<IconButtonProps> = ({
  onAction,
  iconStyle,
  buttonStyle,
  ...props
}) => {
  const handleOnPress = () => {
    onAction && onAction()
  }

  return (
    <TouchableOpacity onPress={handleOnPress} style={buttonStyle}>
      <Icon style={iconStyle} {...props} />
    </TouchableOpacity>
  )
}
