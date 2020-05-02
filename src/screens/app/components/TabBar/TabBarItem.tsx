import React, { FC } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  Platform,
} from 'react-native'
import * as Haptics from 'expo-haptics'

import { colors } from 'res/colors'

interface TabBarItemProps extends TouchableOpacityProps {
  isFocused?: boolean
  isPrimary?: boolean
}

export const TabBarItem: FC<TabBarItemProps> = ({
  isFocused = false,
  isPrimary = false,
  children,
  onPress,
  ...props
}) => {
  const buttonStyle = {
    ...styles.buttonContainer,
    ...(isPrimary
      ? { ...styles.primaryButton, ...styles.primaryButtonShadow }
      : {}),
  }

  const handleOnPress = async (e: any) => {
    if (Platform.OS === 'ios' && isPrimary) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }

    onPress && onPress(e)
  }

  return (
    <TouchableOpacity
      {...props}
      style={buttonStyle}
      activeOpacity={1}
      onPress={handleOnPress}
    >
      <View
        style={{
          ...styles.buttonBase,
          ...styles.buttonNotSelected,
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 40,
    height: 40,
    marginBottom: 32,
    marginRight: 8,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: colors.dark100,
    borderRadius: 12,
  },
  primaryButtonShadow: {
    shadowColor: colors.dark100,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
  },
  buttonBase: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
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
})
