import React, { FC, ReactNode, useState } from 'react'
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  TextStyle,
  ViewStyle,
} from 'react-native'

export interface CardButtonProps {
  icon: string
  title: string
  subtitle: string
  containerStyle?: ViewStyle
  activeContainerStyle?: ViewStyle
  textStyle?: TextStyle
  activeTextStyle?: TextStyle
  rightContent?: ReactNode
  active?: boolean
}

export const CardButton: FC<CardButtonProps> = ({
  icon,
  title,
  subtitle,
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

  const onPressOut = () => setIsActive(false)

  const onPressIn = () => setIsActive(true)

  return (
    <TouchableOpacity
      style={containerStyle}
      activeOpacity={1}
      onPressOut={onPressOut}
      onPressIn={onPressIn}
    >
      <View style={styles.leftInner}>
        <Text style={styles.icon}>{icon}</Text>
        <View style={styles.texts}>
          <Text style={titleStyle}>{title}</Text>
          <Text style={subTitleStyle}>{subtitle}</Text>
        </View>
      </View>

      {props.rightContent}
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
})
