import React, { FC, ReactNode, useState } from 'react'
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  TextStyle,
  ViewStyle,
} from 'react-native'
import * as Haptics from 'expo-haptics'

import { fonts } from 'res/fonts'
import { lightenDarkenColor, colors } from 'res/colors'

export interface CardButtonProps {
  emoji: string
  title: string
  subtitle?: string
  containerStyle?: ViewStyle
  activeBackgroundColor?: string
  textStyle?: TextStyle
  activeTextColor?: string
  rightContent?: ReactNode
  active?: boolean
  onAction?: VoidFunction
  points?: number
  disabled?: boolean
  withHapticFeedback?: boolean
}

export const CardButton: FC<CardButtonProps> = ({
  emoji,
  title,
  subtitle,
  onAction,
  points,
  activeBackgroundColor = lightenDarkenColor(colors.skin200, -20),
  activeTextColor = colors.dark100,
  disabled,
  withHapticFeedback,
  ...props
}) => {
  const [isActive, setIsActive] = useState(false)

  const containerStyle = {
    ...styles.container,
    ...props.containerStyle,
    ...(isActive || props.active
      ? { backgroundColor: activeBackgroundColor }
      : {}),
  }

  const titleStyle = {
    ...styles.text,
    ...props.textStyle,
    ...styles.medium,
    ...(isActive || props.active ? { color: activeTextColor } : {}),
  }

  const subTitleStyle = {
    ...styles.text,
    ...props.textStyle,
    ...styles.subtitle,
    ...(isActive || props.active ? { color: activeTextColor } : {}),
  }

  const rightInnerStyle = {
    ...styles.rightInner,
    backgroundColor: lightenDarkenColor(containerStyle.backgroundColor, -15),
  }

  const handleOnPressInOrOut = () => setIsActive(!isActive)

  const handleOnPress = async () => {
    if (withHapticFeedback) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }

    onAction && onAction()
  }

  return (
    <TouchableOpacity
      style={containerStyle}
      activeOpacity={1}
      onPressOut={handleOnPressInOrOut}
      onPressIn={handleOnPressInOrOut}
      onPress={handleOnPress}
      disabled={disabled}
    >
      <View style={styles.leftInner}>
        <Text style={styles.emoji}>{emoji}</Text>
        <View style={styles.texts}>
          <Text style={titleStyle}>{title}</Text>
          {subtitle && <Text style={subTitleStyle}>{subtitle}</Text>}
        </View>
      </View>

      {points > 0 && (
        <View style={rightInnerStyle}>
          <Text style={styles.pointsNumber}>{points}</Text>
          <Text style={styles.pointsText}>points</Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.skin200,
    paddingTop: 17,
    paddingBottom: 17,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 8,
    marginTop: 8,
    maxHeight: 64,
  },
  leftInner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 26,
  },
  texts: {
    marginLeft: 15,
  },
  subtitle: {
    opacity: 0.75,
  },
  text: {
    color: colors.dark100,
    fontSize: 14,
  },
  medium: {
    fontWeight: '500',
  },
  rightInner: {
    width: 40,
    height: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointsNumber: {
    fontFamily: fonts['DMSerifDisplay-Regular'],
    fontSize: 26,
    color: colors.white,
  },
  pointsText: {
    color: colors.white,
    fontSize: 8,
    position: 'relative',
    top: -6,
    fontWeight: '500',
  },
})
