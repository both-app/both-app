import React, { FC, useMemo } from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { colors } from '../../../res/colors'

interface ButtonProps {
  variation: 'primary' | 'light' | 'dark'
  onAction?: VoidFunction
}

export const Button: FC<ButtonProps> = ({ children, variation, onAction }) => {
  const buttonStyle = useMemo(() => {
    const variationStyle = {
      primary: styles.pinkButton,
      light: styles.lightButton,
      dark: styles.darkButton,
    }[variation]

    return { ...styles.button, ...variationStyle }
  }, [])

  const textStyle = useMemo(
    () =>
      ({
        primary: styles.whiteText,
        light: styles.darkText,
        dark: styles.whiteText,
      }[variation]),
    []
  )

  return (
    <TouchableOpacity style={buttonStyle} onPress={onAction}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: '#EF3061',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 30,
    marginBottom: 10,
  },
  whiteText: {
    color: 'white',
  },
  darkText: {
    color: colors.greyDark,
  },
  pinkButton: {
    backgroundColor: colors.pink,
  },
  lightButton: {
    backgroundColor: colors.greyLight,
  },
  darkButton: {
    backgroundColor: colors.greyDark,
  },
})
