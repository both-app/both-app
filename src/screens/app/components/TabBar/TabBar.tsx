import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'

import { TabBarItem } from './TabBarItem'

import { colors } from 'res/colors'

const DEFAULT_STATE_INDEX = 2

export const TabBar: FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => (
  <View style={styles.nav}>
    {state.routes.map((route, index) => {
      const { options } = descriptors[route.key]
      const isFocused = state.index === index
      const isPrimary = index === DEFAULT_STATE_INDEX

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

      return (
        <TabBarItem
          key={index}
          onPress={onPress}
          isFocused={isFocused}
          isPrimary={isPrimary}
        >
          {options.tabBarIcon &&
            options.tabBarIcon({
              focused: isFocused,
              size: isPrimary ? 18 : 24,
              color: isFocused ? colors.dark200 : colors.grey100,
            })}
        </TabBarItem>
      )
    })}
  </View>
)

const styles = StyleSheet.create({
  nav: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    paddingTop: 12,
    borderTopColor: colors.skin200,
    backgroundColor: colors.skin100,
  },
})
