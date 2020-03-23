import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { DashboardScreen } from './DashboardScreen'
import { getStackOptions } from '../../../res/stackNavigation'
import { IconButton } from '../../../library/components/IconButton'

const Stack = createStackNavigator()

export const DashboardNavigator = () => (
  <Stack.Navigator initialRouteName="Dashboard">
    <Stack.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={getStackOptions({
        headerRight: () => (
          <IconButton
            iconName="add_circle"
            width={25}
            height={25}
            fill="white"
          />
        ),
      })}
    />
  </Stack.Navigator>
)
