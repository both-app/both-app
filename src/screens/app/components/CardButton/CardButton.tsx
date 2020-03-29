import React, { FC, ReactNode, useState } from 'react'
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  TextStyle,
  ViewStyle,
} from 'react-native'
import { fonts } from 'res/fonts'
import { LightenDarkenColor } from 'res/colors'

export interface CardButtonProps {
  icon: string
  title: string
  subtitle?: string
  containerStyle?: ViewStyle
  activeContainerStyle?: ViewStyle
  textStyle?: TextStyle
  activeTextStyle?: TextStyle
  rightContent?: ReactNode
  active?: boolean
  onAction: VoidFunction
  points?: number
}

export const CardButton: FC<CardButtonProps> = ({
  icon,
  title,
  subtitle,
  onAction,
  points,
  ...props
}) => {
  const [isActive, setIsActive] = useState(false)

  const containerStyle = {
    ...styles.container,
    ...props.containerStyle,
    ...(isActive || props.active ? props.activeContainerStyle : {}),
  }

  const titleStyle = {
    ...styles.text,
    ...props.textStyle,
    ...styles.medium,
    ...(isActive || props.active ? props.activeTextStyle : {}),
  }

  const subTitleStyle = {
    ...styles.text,
    ...props.textStyle,
    ...styles.subtitle,
    ...(isActive || props.active ? props.activeTextStyle : {}),
  }

  const rightInnerStyle = {
    ...styles.rightInner,
    backgroundColor: LightenDarkenColor(
      props.containerStyle.backgroundColor,
      -15
    ),
  }

  const onPressOut = () => setIsActive(false)

  const onPressIn = () => setIsActive(true)

  return (
    <TouchableOpacity
      style={containerStyle}
      activeOpacity={1}
      onPressOut={onPressOut}
      onPressIn={onPressIn}
      onPress={onAction}
    >
      <View style={styles.leftInner}>
        <Text style={styles.icon}>{icon}</Text>
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
  icon: {
    fontSize: 26,
  },
  texts: {
    marginLeft: 15,
  },
  subtitle: {
    opacity: 0.75,
  },
  text: {
    color: 'white',
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
    color: 'white',
  },
  pointsText: {
    color: 'white',
    fontSize: 8,
    position: 'relative',
    top: -6,
    fontWeight: '500',
  },
})
