import React, { FC } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'

import { colors } from 'res/colors'

interface TabBarItemProps extends TouchableOpacityProps {
  isFocused?: boolean
}

export const TabBarItem: FC<TabBarItemProps> = ({
  isFocused = false,
  children,
  ...props
}) => {
  const buttonStyle = {
    ...styles.buttonContainer,
    ...styles.shadowButton,
  }

  return (
    <TouchableOpacity style={buttonStyle} {...props}>
      <View
        style={{
          ...styles.buttonBase,
          ...(isFocused ? styles.buttonSelected : styles.buttonNotSelected),
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  shadowButton: {
    shadowColor: colors.dark100,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 10,
  },
  buttonContainer: {
    width: 64,
    height: 64,
    marginBottom: 32,
    marginRight: 16,
    marginLeft: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonBase: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.dark100,
    paddingTop: 11,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  buttonNotSelected: {
    width: 40,
    height: 40,
    borderRadius: 12,
  },
  buttonSelected: {
    width: 64,
    height: 64,
    borderRadius: 19.2,
  },
})
