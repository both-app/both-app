import React, { FC } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
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
    ...styles.navButton,
    ...styles.shadowButton,
    ...(isFocused ? styles.navButtonSelected : {}),
  }

  return (
    <TouchableOpacity style={buttonStyle} {...props}>
      {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  shadowButton: {
    shadowColor: colors.blueDark,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 10,
  },
  navButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blueDark,
    paddingTop: 11,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    borderRadius: 12,
    marginBottom: 32,
    marginRight: 16,
    marginLeft: 16,
  },
  navButtonSelected: {
    width: 64,
    height: 64,
    borderRadius: 19.2,
  },
  iconStyle: {
    color: 'white',
  },
})
