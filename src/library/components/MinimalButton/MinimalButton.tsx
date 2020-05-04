import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native'
import * as Haptics from 'expo-haptics'

import { Color, colors } from 'res/colors'

import { Icon, IconProps } from '../Icon'

interface MinimalButtonProps extends IconProps {
  onAction: () => void
  iconColor?: Color
  buttonStyle?: any
}

export const MinimalButton: FC<MinimalButtonProps> = ({
  onAction,
  buttonStyle,
  ...props
}) => (
  <TouchableOpacity
    onPress={onAction}
    style={buttonStyle}
    testID="minimalButton"
  >
    <Icon style={{ color: colors[props.iconColor] }} {...props} />
  </TouchableOpacity>
)
