import React, { FC } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'

import { colors } from '../../../../res/colors'

export const TabBar: FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => (
  <View style={styles.tabBar}>
    {state.routes.map((route, index) => {
      const { options } = descriptors[route.key]
      const label =
        options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
          ? options.title
          : route.name

      const isFocused = state.index === index

      const onPress = () => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        })

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name)
        }
      }

      const onLongPress = () => {
        navigation.emit({
          type: 'tabLongPress',
          target: route.key,
        })
      }

      return (
        <TouchableOpacity
          key={index}
          accessibilityRole="button"
          accessibilityStates={isFocused ? ['selected'] : []}
          accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={options.tabBarTestID}
          onPress={onPress}
          onLongPress={onLongPress}
          style={styles.tabBarItem}
        >
          {options.tabBarIcon &&
            options.tabBarIcon({
              focused: isFocused,
              color: isFocused ? colors.pink : colors.greyDark,
              size: 22,
            })}
          <Text
            style={{
              color: isFocused ? colors.pink : colors.greyDark,
              marginTop: 5,
            }}
          >
            {label}
          </Text>
        </TouchableOpacity>
      )
    })}
  </View>
)

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.light,
    paddingTop: 13,
    paddingBottom: 25,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  tabBarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
