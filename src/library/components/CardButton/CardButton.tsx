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

import { lightenDarkenColor, colors } from 'res/colors'

export interface CardButtonProps {
  emoji: string
  title: string
  badge?: ReactNode
  subtitle?: ReactNode
  containerStyle?: ViewStyle
  activeBackgroundColor?: string
  textStyle?: TextStyle
  activeTextColor?: string
  rightContent?: ReactNode
  active?: boolean
  onAction?: VoidFunction
  disabled?: boolean
  withHapticFeedback?: boolean
  onLongPress?: VoidFunction
}

export const CardButton: FC<CardButtonProps> = ({
  emoji,
  title,
  badge,
  subtitle,
  onAction,
  rightContent,
  activeBackgroundColor = lightenDarkenColor(colors.skin200, -20),
  activeTextColor = colors.dark100,
  disabled,
  withHapticFeedback,
  onLongPress,
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
      onLongPress={onLongPress}
    >
      <View style={styles.leftInner}>
        <Text style={styles.emoji}>{emoji}</Text>
        <View style={styles.texts}>
          {!!badge && <View style={styles.badgeContainer}>{badge}</View>}

          <Text style={titleStyle}>{title}</Text>

          {typeof subtitle === 'string' ? (
            <Text style={subTitleStyle}>{subtitle}</Text>
          ) : (
            subtitle
          )}
        </View>
      </View>

      {rightContent}
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
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 8,
    minHeight: 64,
  },
  leftInner: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 16,
  },
  emoji: {
    fontSize: 26,
  },
  badgeContainer: {
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  texts: {
    flex: 1,
    marginLeft: 16,
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
})
