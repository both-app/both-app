import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { LinearGradient } from 'expo-linear-gradient'

import { TabBarItem } from './TabBarItem'

export const TabBar: FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => (
  <View style={styles.nav}>
    <LinearGradient
      style={styles.navContainer}
      colors={['rgba(249,240,235,0)', 'rgba(249,240,235,100)']}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
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
          <TabBarItem
            key={index}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
          >
            {options.tabBarIcon &&
              options.tabBarIcon({
                focused: isFocused,
                size: isFocused ? 32 : 20,
                color: 'white',
              })}
          </TabBarItem>
        )
      })}
    </LinearGradient>
  </View>
)

const styles = StyleSheet.create({
  nav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
