import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native'

import { Icon, IconProps } from '../Icon'

interface IconButtonProps extends IconProps {
  onAction?: () => void
}

export const IconButton: FC<IconButtonProps> = ({ onAction, ...props }) => {
  return (
    <TouchableOpacity onPress={onAction}>
      <Icon {...props} />
    </TouchableOpacity>
  )
}
