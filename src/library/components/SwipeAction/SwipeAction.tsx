import React, { FC } from 'react'
import { Animated, Text, StyleSheet, GestureResponderEvent } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { colors, Color } from 'res/colors'

import { Icon, IconName } from 'library/components/Icon'

interface SwipeActionProps {
  progress: Animated.AnimatedInterpolation
  iconName: IconName
  color: Color
  onAction: Function
}

export const SwipeAction: FC<SwipeActionProps> = ({
  progress,
  onAction,
  iconName,
  color,
  children,
}) => {
  const trans = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [140, -16],
  })

  const handleOnPress = (event: GestureResponderEvent) => onAction()

  return (
    <Animated.View style={{ transform: [{ translateX: trans }] }}>
      <TouchableOpacity style={styles.button} onPress={handleOnPress}>
        <Icon
          iconName={iconName}
          width={24}
          height={24}
          style={{
            color: colors[color],
          }}
        />
        <Text style={{ ...styles.text, color: colors[color] }}>{children}</Text>
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  button: {
    minHeight: 64,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 8,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.skin200,
  },
  text: {
    fontWeight: '500',
    fontSize: 14,
    marginLeft: 8,
  },
})
