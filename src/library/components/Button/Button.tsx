import React, { FC } from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'

import { IconProps, Icon } from '../Icon'
import { colors } from 'res/colors'

const variations = {
  primary: {
    button: {
      backgroundColor: colors.blueDark,
    },
    text: {
      color: 'white',
    },
  },
  secondary: {
    button: {
      backgroundColor: colors.beigeDark,
    },
    text: {
      color: colors.blueDark,
    },
  },
}

type Variation = 'primary' | 'secondary'

interface ButtonProps {
  onAction?: VoidFunction
  variation?: Variation
  leftIcon?: IconProps['iconName']
  marginTop?: number
}

export const Button: FC<ButtonProps> = ({
  children,
  onAction,
  leftIcon,
  variation = 'primary',
  ...props
}) => {
  const buttonStyle = {
    ...styles.button,
    ...variations[variation].button,
    ...(leftIcon ? { paddingLeft: 16 } : { paddingLeft: 24 }),
    ...props,
  }

  const textStyle = {
    ...styles.text,
    ...variations[variation].text,
  }

  return (
    <TouchableOpacity style={buttonStyle} onPress={onAction}>
      {leftIcon && <Icon iconName={leftIcon} style={styles.leftIcon} />}
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 14,
    paddingBottom: 14,
    paddingRight: 24,
    borderRadius: 35,
  },
  leftIcon: {
    color: 'white',
    marginRight: 8,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})
